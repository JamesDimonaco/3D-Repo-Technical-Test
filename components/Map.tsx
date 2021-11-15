import React from 'react';
import {GoogleMap} from "@react-google-maps/api";
import {useLoadScript} from "@react-google-maps/api";



export default function Map({longitude, latitude}) {

  const mapContainerStyle = {
    width: '30vw',
    height: '30vh',
}
const center = {
    lat: parseFloat(latitude),
    lng: parseFloat(longitude)
}
    const{isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    });

    if (loadError) return <h1>Error</h1>;
    if (!isLoaded) return <h1>Loading</h1>;
    return(
      <>
    <div className='grid justify-items-center'>
        <GoogleMap 
        mapContainerStyle={mapContainerStyle} 
        zoom={7} 
        center={center} 
        />
        <div className=''>

        <p className='pt-4 text-white'>longitude / latitude </p>
        <p className='text-white' > {longitude} / {latitude}</p>
        </div>
        </div>
        </>
    )
}