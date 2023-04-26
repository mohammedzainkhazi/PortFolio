import React, { useEffect, useState } from 'react'
import { database } from './Firebase';
import { child, get, ref } from 'firebase/database';
import { Backdrop, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Fade, IconButton, Modal, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import Maps from './Maps';

function Anomalies() {

  const [detections, setDetections] = useState(null);
  let [locationKeys, setLocationKeys] = useState([]);
  let [locationValues, setlocationValues] = useState([]);
  const [showMaps, setshowMaps] = useState(false);
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [crim, setCrim] = useState('');
  const [open, setopen] = useState(-1);


  useEffect(() => {
    const fetchData = async () => {
      await get(child(ref(database), 'detections/')).then((data) =>
        setDetections(Object.keys(data.val()).map(key => {
          locationKeys.push(key)
          locationValues.push(data.val()[key])
          // return {key: key, value: data.val()[key]}
          setDetections(data.val())
        })));
    }
    fetchData()
  }, [])

  const handleMaps = (latlong,name) => {
    let lat = latlong.split(',')[0].replace('N','')
    let long = latlong.split(',')[1].replace('E','')
    setLat(lat);
    setLon(long);
    setCrim(name);
    setshowMaps(true)
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
    <div className={`${locationKeys.length >= 9 ? 'h-full lg:h-screen' : 'h-full lg:h-full'} flex flex-col lg:flex-row flex-wrap justify-evenly items-center gap-4 my-3 px-2 w-full`}>
      {locationKeys.length > 0 && locationKeys.map((loc, i) => (
        <Card className='!bg-gray-500 !text-white !w-full lg:!w-[30%] px-2' key={i}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {loc}
              </Typography>
              <Typography variant="body2" color="white">
                Total of {Object.values(locationValues[i]).length} Anomalies
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="medium" variant='contained' onClick={() => setopen(i)}>
              VIEW
            </Button>
          </CardActions>
          <Modal
            aria-labelledby="spring-modal-title"
            aria-describedby="spring-modal-description"
            className='!overflow-y-scroll'
            open={open === i}
            onClose={() => setopen(-1)}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                TransitionComponent: Fade,
              },
            }}
          >
        <div style={style} className="bg-white shadow-2xl rounded-lg h-[80%] overflow-y-scroll p-10 w-[80%]">  
              <div className='flex flex-col justify-start items-start'>
                <IconButton onClick={() => setopen(-1)}>
                  <Close />
                </IconButton>
                <div className='flex flex-col lg:flex-row justify-center items-center flex-wrap w-full h-[100%]'>
                  {
                    Object.values(locationValues[i]).map((vals, i) => (
                      <div className='flex flex-col my-2 py-2  justify-center items-center border-2 border-black w-full h-auto lg:w-[50%] flex-wrap' key={i}>
                        <img src={vals.url} className='h-32 w-48' alt='anamoly' />
                        <p>Anomaly Type : {vals.anomoly}</p>
                        <p>Detected People : {vals.detected_people.slice(0,8)}</p>
                        <button className='text-white bg-blue-400 text-sm rounded-lg px-2' onClick={() => handleMaps(vals.lat_long,vals.detected_people)}>TRACK LOCATION</button>
                      </div>
                    ))
                  }
                </div>
              </div>
              <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                className='!overflow-y-scroll'
                open={showMaps}
                onClose={() => setshowMaps(false)}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                  backdrop: {
                    TransitionComponent: Fade,
                  },
                }}
              >
                <div style={style} className="bg-white shadow-2xl rounded-lg border-none outline-none p-5 w-[90%]">
                <IconButton onClick={()=>setshowMaps(false)}>
                  <Close />
                </IconButton>
                  <Maps lat={lat} lon={lon} name={crim} />
                </div>
              </Modal>
            </div>
          </Modal>
        </Card>
      ))
      }
    </div >
  )
}

export default Anomalies