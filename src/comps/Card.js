import RoomIcon from '@mui/icons-material/Room';
import React, { useState } from 'react'
import BingMapsReact from "bingmaps-react";
import { Backdrop, Fade, IconButton, Modal } from '@mui/material';
import { Close } from '@mui/icons-material';
import Maps from './Maps';


function Card(props) {
  const [open, setOpen] = useState(-1);
  const pushPin = {
    center: {
      latitude: 12.9767,
      longitude: 77.5713,
    },
    options: {
      title: "Criminal",
    },
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
    <div
      className={`flex flex-row justify-between items-center text-center text-gray-800  w-full h-[50px] shadow-lg rounded-lg ${props.index % 2 !== 0 ? 'bg-white' : 'bg-gray-300'} px-10 my-4 shadow-lg`}>
      <span
        className="cursor-pointer"
      >
        {props.index + 1}
      </span>
      <img className='w-10 h-10 rounded-full'
        src="https://www.shutterstock.com/image-photo/prime-suspect-orange-prison-jumpsuit-260nw-1169300515.jpg"
        alt='criminalImage'
      />
      <span
        className="cursor-pointer"
      >
        NAME
      </span>
      <span className="h-full pt-5 w-1/2 rounded-lg hidden lg:block">
        { }
      </span>
      <button className='text-sm flex flex-row justify-center items-center text-white px-2 py-1 rounded-full bg-blue-500' onClick={() => setOpen(props.index)}><span className='hidden lg:block' >View On MAP </span><RoomIcon /></button>



      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open === props.index}
        onClose={() => setOpen(-1)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <div style={style} className="bg-white shadow-2xl rounded-lg border-none outline-none h-auto p-5 w-[90%]">
          <div className='flex flex-row justify-start items-center'>
            <IconButton onClick={() => setOpen(-1)}>
              <Close />
            </IconButton>
          </div>
          <Maps/>
        </div>
      </Modal>

    </div>
  )
}

export default Card
