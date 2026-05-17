/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../Components/LocationSearchPanel";


const Home = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [panalOpen, setPanelOpen] = useState(false);
  const panalRef = useRef(null);
  const panalClosRef = useRef(null);

  const SubmitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(() => {
    if (panalOpen) {
      gsap.to(panalRef.current, {
        height: "74%",
      });
      if(panalClosRef.current){
        gsap.to(panalClosRef.current, {
          opacity: 1,
        });
      }
    }else{
      gsap.to(panalRef.current, {
        height: "0%",
      });
      if(panalClosRef.current){
        gsap.to(panalClosRef.current, {
          opacity: 0,
        });
      }
    }
  }, [panalOpen]);

  return (
    <div className=" w-screen h-screen relative overflow-hidden">
      <div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
          className="w-16 absolute top-5 left-5"
        />
      </div>
      <div className="w-full h-full">
        <img
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="uber map"
          className="w-full h-full object-cover "
        />
      </div>

      <div className=" w-full h-screen flex flex-col justify-end absolute bottom-0  ">
        <div className="h[30%] p-5 bg-white bottom-0 w-full relative">
          <h5 
          onClick ={()=> setPanelOpen(false)}
          ref={panalClosRef} 
          className="flex absolute top-6 right-7 items-center gap-2 text-gray-900 text-2xl font-bold opacity-0 cursor-pointer">
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h3 className="text-3xl font-semibold">Find a trip </h3>

          <form onSubmit={SubmitHandler}>
            <div className="absolute left-8 top-[43%] flex flex-col items-center">
              <div className="w-1 h-16 bg-gray-700 rounded-full"></div>

              <div className="w-1.5 h-1.5 bg-gray-700 rounded-full mt-2"></div>
            </div>

            <input
              onClick={() => setPanelOpen(true)}
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="bg-[#eee] px-9 w-[100%] py-2 text-lg rounded-xl mt-4 "
              type="text"
              placeholder="Add a pickup location"
            />
            <input
              onClick={() => setPanelOpen(true)}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="bg-[#eee] px-9 w-[100%] py-2 text-lg rounded-xl mt-4 "
              type="text"
              placeholder="Enter your destination"
            />
          </form>
        </div>

        <div ref={panalRef} className="  w-screen bg-white">
          <LocationSearchPanel />
        </div>
      </div>
    </div>
  );
};

export default Home;
