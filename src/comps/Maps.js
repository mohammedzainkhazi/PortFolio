import React from 'react'
import BingMapsReact from "bingmaps-react";

function Maps(props) {
    const pushPin = {
        center: {
          latitude: props.lat,
          longitude: props.lon,
        },
        options: {
          title: props.name,
        },
      }
  return (
        <BingMapsReact
            bingMapsKey="AnfBZk0F4IbeIVESG2jTgxaNIoWTH3yuvvCMgX7iTW4ZqTyFSD_sT6kE_5xTbn3D"
            height="580px"
            pushPins={[pushPin]}
            mapOptions={{
              navigationBarMode: "square",
            }}
            viewOptions={{
              center: { latitude: props.lat, longitude: props.lon },
              mapTypeId: "grayscale",
            }}
          />
  )
}

export default Maps