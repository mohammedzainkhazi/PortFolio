import React from 'react'

function Resume(props) {
    // document.getElementById('toolbar').style = 'hidden';
  return (
    <div className='flex flex-row jusify-center items-center w-full'>
        <embed className='w-full m-5 rounded-lg' type="application/pdf" src={props.url} width="640" height="640" allow="autoplay"/>
        
    </div>
  )
}

export default Resume