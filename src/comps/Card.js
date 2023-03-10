import RoomIcon from '@mui/icons-material/Room';
import React from 'react'

function Card(props) {
  return (
    <div
      className={`flex flex-row justify-between items-center text-center text-gray-800  w-full h-[50px] shadow-lg rounded-lg ${props.index % 2 !== 0 ? 'bg-white' : 'bg-[#EFEFFD]'} px-10 my-4 shadow-lg`}    >
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
      <button className='text-sm flex flex-row justify-center items-center text-white px-2 py-1 rounded-full bg-blue-500' ><span className='hidden lg:block'>View On MAP </span><RoomIcon /></button>

    </div>
  )
}

export default Card
