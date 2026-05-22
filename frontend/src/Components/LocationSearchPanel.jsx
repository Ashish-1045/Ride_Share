import React from 'react'
import "remixicon/fonts/remixicon.css";

const LocationSearchPanel = () => {
     
  const Locations = [
    "house no.66 housing board, ayodhya bypass, bhopal, Madhya Pradesh",
    "house , bhopal, Madhya Pradesh",
    "sehore , Madhya Pradesh",  
    "house no.55,Dewas, Madhya Pradesh",
  ];
  return (
    <div className="w-full h-full bg-white rounded-t-3xl px-4 space-y-3">

     {  Locations.map(function(element){
        return(
          <div className="py-2  bg-gray-100 border-2 border-gray-300 active:border-2 active:border-black flex gap-4  text-gray-900  rounded-lg items-center justify-start px-4">
        <h5 className="flex items-center gap-2 text-gray-900 text-xl bg-gray-300 p-2.5 rounded-full h-9 w-10 justify-center ">
          <i className="ri-map-pin-fill "></i>
        </h5>
        <h3 className=" font-semibold ">
          {element}
        </h3>
      </div>
        )
       })}

    </div>
  );
}
export default LocationSearchPanel