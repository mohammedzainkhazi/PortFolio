import React, { useState } from "react";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Button, IconButton } from "@mui/material";
import { VideoCallOutlined } from "@mui/icons-material";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import axios from "axios";
import FileUpload1 from "./FileUpload1";
function Search(props) {

    const style = {
        position: 'absolute',
        top: window.innerWidth <= 1024 ? '70%' : '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        p: 4,
    }
    const [criminalImage, setCriminalImage] = useState(null);
    const [videos, setVideos] = useState([]);
    const [criminalName, setcriminalName] = useState("");
    const [imageStatus, setimageStatus] = useState("");
    const [videoStatus, setvideoStatus] = useState("");

    const handleVideosChange = (event) => {
        setVideos(event.target.files);
    };

    const handleVideosUpload = async () => {
        const formData = new FormData();
        for (let i = 0; i < videos.length; i++) {
            formData.append('videos', videos[i]);
        }

  const handleSearch = ()=> {
      console.log("done")
      var myParams = {
      data: "image",
      count:"video"
    };
      axios
        .post("http://localhost:5000/data",myParams,{ "Content-type":"application/json" },
        )
        .then(function (response) {
        //   console.log(response.data.tweets["url"]);
            console.log(response)
            setdata(response.data);
            console.log(response.data["hi"])
        })
        .catch(function (error)
        {
          console.log(error);
        });
    // e.preventDefault();
  }

    return (
        <div className="App">
            <img className='h-screen w-full' alt='bg' src="https://img.freepik.com/free-vector/realistic-offline-twitch-banner-background-template_1361-2608.jpg?w=740&t=st=1678482937~exp=1678483537~hmac=bda5006de1d69014526053188711621a6b4b3f42a79db07a1c213e64b9ed8b1d" />
            <div style={style} className="bg-white shadow-2xl w-[60%] rounded-lg h-auto p-10 ">
                <h3>Search A Criminal</h3>
                <div className="flex flex-col gap-4 mt-4 justify-center items-start w-full">
                    <div className="w-full flex-col lg:flex-row flex gap-3">
                        <Button variant="contained" component="label" endIcon={<VideoCallOutlined />}>
                            Choose Videos
                            {/* <input hidden accept="video/*" multiple type="file" /> */}
                        </Button>
                        <div className="flex gap-3">
                        </div>

                    </div>
                    <br />
                    <div className="w-full justify-between items-center flex gap-3">
                        {/* <Button variant="contained" component="label" endIcon={<PhotoCamera />}>
                            Choose Image
                            <input hidden accept="image/*" multiple type="file" />
                        </Button>
                        <img className="w-[200px] h-[100px]"
                            src="https://www.shutterstock.com/image-photo/prime-suspect-orange-prison-jumpsuit-260nw-1169300515.jpg"
                            alt='criminalImage'
                            />
                            :
                            <Skeleton height={200} className="h-[100px] w-[200px]"/>
                        }
                    </div>
                    <div className="flex flex-row justify-between items-center w-full">
                        <span>Name</span>
                        <input type="text" className="bg-gray-300 py-2 text-center focus:bg-white" placeholder="Criminal Name"
                        required    
                        onChange={e=>setcriminalName(e.target.value)}
                        />
                    </div>
                    {
                        imageStatus.length>0 && 
                        <span className="text-center w-full bg-blue-600 rounded-full text-white">{imageStatus}</span>
                    }
                   {
                    videoStatus.length>0 &&
                    <span className="text-center w-full bg-blue-600 rounded-full text-white">{videoStatus}</span>
                   }
                    <div className="flex justify-center items-center w-full">
                        <Button type="submit" variant="outlined" startIcon={<PersonSearchIcon />} onClick={handleSearch}>
                            Start Detection
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;
