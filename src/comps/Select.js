import React, { useEffect, useState } from 'react'
import { Backdrop, Button, Fab, Fade, Modal, Skeleton } from '@mui/material';
import { PhotoCamera, Search, PersonSearch, LocationCityOutlined, LocationOn } from '@mui/icons-material';
import { child, get, onValue, ref, set } from 'firebase/database';
import { database, uploadImage } from "./Firebase";
import '../index.css';
import { videos_data } from './Data';

function Select() {
  const [tempSelectedVideos, setTempSelectedVideos] = useState([]);
  const [finalSelection, setFinalSelection] = useState([]);
  const [open, setopen] = useState(false);
  const [criminalImage, setCriminalImage] = useState(null);
  const [criminalName, setcriminalName] = useState('');
  const [imageStatus, setimageStatus] = useState("");
  const [videoStatus, setvideoStatus] = useState("");
  const [videos, setVideos] = useState([]);

  const handleVideosUpload = async () => {
    var existing = [];
    var dbref = ref(database)
    get(child(dbref, 'selected_videos')).then((dataSnapshot) => {
      if (dataSnapshot.exists()) {
        existing = dataSnapshot.val();
      }
      var new_list = existing;
      for (let i = 0; i < finalSelection.length; i++) {
        let found = false
        for (let j = 0; j < existing.length; j++) {
          if (finalSelection[i]['key'] == existing[j]['key']) {
            found = true
            break;
          }
        }
        if (found == false) {
          new_list.push(finalSelection[i])
        }
      }
      set(ref(database, 'selected_videos'), new_list);
      setvideoStatus('Videos Sent to Backend');
    })
  };



  const handleImageUpload = async () => {
    if (criminalImage === null) {
      setvideoStatus('Please Choose an Image')
      return;
    }
    try {
      let res = await uploadImage(criminalImage, criminalName)
      console.log(res)
      setimageStatus(res)
    } catch (error) {
      console.error('Error uploading Image:', error);
    }
  }


  const handleUpload = () => {
    if (finalSelection.length <= 0) {
      setvideoStatus('Please Choose atleat 1 Video')
      return;
    }
    if (criminalImage === null) {
      setvideoStatus('Please Choose an Image')
      return;
    }
    // setimageStatus('');
    setvideoStatus('');
    // handleImageUpload();
    handleVideosUpload();
  }

  // Create a reference under which you want to list

  useEffect(() => {
    function fetchVideos() {
      const res = ref(database, 'dataset/videos/');
      onValue(res, (video) => {
        let temp = [];
        video.forEach(vid => {
          temp.push({ key: vid.key, val: vid.val() })
        })
        setVideos(temp)
      });
    }
    fetchVideos();
    // videos_data.forEach(element => {
    //   console.log(element.val.video_url.toString().split('/')[3].split('.')[0])
    // });
  }, [])


  function select(vid, id) {
    if (tempSelectedVideos.includes(id)) {
      setFinalSelection(finalSelection.filter((video) => video.key !== vid.key));
      setTempSelectedVideos(tempSelectedVideos.filter(number => number !== id));
    } else {
      setFinalSelection([...finalSelection, vid]);
      setTempSelectedVideos([...tempSelectedVideos, id]);
    }
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };



  return (
    <div className='w-full h-full '>
      <div className='flex sm:flex-col flex-wrap md:flex-row gap-4 lg:gap-5 justify-evenly px-5 items-center pt-20 pb-44'>
        {
          videos.map((video, i) => (
            <div className={` w-full md:w-[30%] h-full text-center cursor-pointer rounded-2xl ${tempSelectedVideos.includes(i) && 'border-4 border-blue-500'} p-3 `} key={i}>
              <video onClick={(e) => select(video, i)} autoPlay muted loop key={i}>
                <source src={video.val.video_url} type="video/mp4"></source>
              </video>
              <span className='text-white'>{video.key.toUpperCase()}</span>
            </div>
          ))
        }
      </div>
      {
        tempSelectedVideos.length > 0 &&
        <Fab
          onClick={() => setopen(!open)}
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
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={() => setopen(!open)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <div style={style} className="bg-white shadow-2xl rounded-lg h-[80%] lg:h-auto overflow-y-scroll p-10 w-[80%]">  
          <div className="flex flex-col lg:flex-row gap-4 mt-4 justify-around items-center w-full">
            <div className='border-r-2 lg:border-r-black border-b-black pr-5'>
              <div className="w-full flex flex-col justify-between items-center gap-3">
                <Button variant="contained" component="label" endIcon={<PhotoCamera />}>
                  Choose Image
                  <input hidden accept="image/*"
                    onChange={(event) => setCriminalImage(event.target.files[0])}
                    multiple type="file" />
                </Button>
                <div>
                  {
                    criminalImage ?
                      <img className="w-[200px] h-[200px]"
                        src={criminalImage ? URL.createObjectURL(criminalImage) : ""}
                        alt='criminalImage'
                      />
                      :
                      <Skeleton height={200} className="h-[100px] w-[200px]" />
                  }
                </div>
              </div>
              <div className="flex flex-col justify-between gap-3 items-center w-full">
                <input type="text" className="bg-gray-200 rounded-2xl w-full py-2 text-center focus:bg-white" placeholder="Criminal Name"
                  required
                  onChange={e => setcriminalName(e.target.value)}
                />
                <button className='bg-green-400 px-5 py-2 rounded-lg hover:opacity-[0.8] text-white' onClick={() => handleImageUpload()}>Upload Image</button>
              </div>
              {
                imageStatus.length > 0 &&
                <span className="text-center w-full bg-blue-600 rounded-full text-white">{imageStatus}</span>
              }
              <br/>
              {
                videoStatus.length > 0 &&
                <span className="text-center w-full bg-blue-600 rounded-full text-white">{videoStatus}</span>
              }
            </div>
            <div className='flex flex-col justify-between gap-4 items-center h-full'>
              CCTV Videos from Location(s) :
              <div className='flex flex-row flex-wrap'>
                {
                  finalSelection.map((vid, id) => (
                    <p key={id} className='bg-cyan-500 text-white px-4 rounded-full m-2'>{vid.key.toString().toUpperCase()} <LocationOn/> &nbsp;</p>
                  ))
                }
              </div>
              <div className="flex justify-center items-center w-full">
                <Button type="submit" variant="outlined" startIcon={<PersonSearch />} onClick={handleUpload}>
                  Start Detection
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Select