import React, { useEffect, useState } from 'react'
import { Fab } from '@mui/material';
import { Search } from '@mui/icons-material';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from './Firebase';

function Select() {
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [videos, setVideos] = useState([]);

  // Create a reference under which you want to list
  const listRef = ref(storage, 'videos');

  useEffect(() => {
    async function fetchVideos() {
      let res = ((await listAll(listRef)).items);
      let promises = res.map((itemRef) => {
        return getDownloadURL(ref(storage, itemRef.fullPath))
      });
      await Promise.all(promises).then((urls)=>{
        setVideos(urls)
      }).catch(e=>console.log(e)) 
      console.log(promises) 
    }
    fetchVideos();
  },[])


  function select(e, id) {
    e.preventDefault();
    if (selectedVideos.includes(id)) {
      setSelectedVideos(selectedVideos.filter(number => number !== id));
      // console.log(e.target.children[0].src)
    } else {
      setSelectedVideos([...selectedVideos, id]);
    }
  }
  return (
    <div className='w-full h-full '>
      <div className='flex sm:flex-col flex-wrap md:flex-row gap-4 lg:gap-5 justify-evenly px-5 items-center mt-5 h-full mb-20'>
        {
           videos.map((video, i) => (
            <video className={`lg:h-64 w-full md:w-[30%] cursor-pointer rounded-2xl ${selectedVideos.includes(i) && 'border-4 border-blue-500'}`} onClick={(e) => select(e, i)} autoPlay muted loop key={i}>
              <source src={video} type="video/mp4"></source>
            </video>
          ))
        }
      </div>
      {
        selectedVideos.length > 0 &&
        <Fab
          onClick={() => console.log(selectedVideos)}
          variant="circular"
          color="primary"
          aria-label="add"
          size="medium"
          style={{
            margin: 0,
            top: "auto",
            right: 20,
            bottom: 20,
            left: "auto",
            position: "fixed",
          }}
        >
          <Search className='text-white' />
        </Fab>
      }
    </div>
  )
}

export default Select