import React, { useRef } from 'react'
import { Link } from 'react-router-dom';
import CaptainDetails from '../Components/CaptainDetails';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useState } from 'react';
import FinishRide from '../Components/FinishRide';
const CaptainRiding = () => {

  const [FinishRidePanal, setFinishRidePanal] = useState(false)
  const  FinishRidePanalRef = useRef(null)


  useGSAP(() => {
    if (FinishRidePanal) {
      gsap.to(FinishRidePanalRef.current, {
        y: 0,
        duration: 0.3,
      });
    } else {
      gsap.to(FinishRidePanalRef.current, {
        y: "100%",
        duration: 0.3,
      });
    }
  }, [FinishRidePanal]);
  return (
    <div className="w-full h-screen flex flex-col overflow-hidden ">
      <div className="fixed  top-0 left-0 w-full  flex items-center justify-between px-4 py-3">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
          className="w-16"
        />

        <Link
          className="bg-white h-10 w-10 rounded-full flex items-center justify-center shadow-md"
          to="/CaptainLogout"
        >
          <i className="text-lg font-semibold ri-logout-circle-r-line"></i>
        </Link>
      </div>

      <div className="w-full h-5/4 overflow-hidden ">
        <img
          src="https://user-images.githubusercontent.com/6416095/52931260-c6bb5e80-3371-11e9-9d46-83f7d1389d18.gif"
          alt="uber map"
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div 
      onClick={()=>{
        setFinishRidePanal(true);
      }}
  
      className="w-full  h-1/6 p-2 bg-orange-400 flex flex-col ">
        <i className="text-center text-xl font-semibold ri-arrow-up-wide-line"></i>
        <div className="flex justify-between items-center p-4 ">
          <h2 className="text-xl font-medium">4 KM away</h2>
          <button
            onClick={() => {}}
            className="bg-green-400 text-black py-3 px-10 rounded-lg text-xl font-semibold hover:bg-orange-600 transition duration-300 "
          >
            Completed
          </button>
        </div>
      </div>

      <div
        ref={FinishRidePanalRef}
        className=" bg-gray-100 fixed bottom-0  w-full p-2 space-y-3  translate-y-full"
      >
        <FinishRide setFinishRidePanal={setFinishRidePanal}/>
      </div>
    </div>
  );
}

export default CaptainRiding