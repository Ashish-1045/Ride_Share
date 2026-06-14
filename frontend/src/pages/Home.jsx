/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../Components/LocationSearchPanel";
import VechielPanal from "../Components/VechielPanal";
import ConfirmRidePanal from "../Components/ConfirmRidePanal";
import homeImg from "../assets/HomeImg.gif";
import LookingForDriver from "../Components/LookingForDriver";
import WaitingForDriver from "../Components/WaitingForDriver";

const Home = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [panalOpen, setPanelOpen] = useState(false);
  const vechielPanalRef = useRef(null)
  const panalRef = useRef(null);
  const vechielFoundRef = useRef(null);
  const WaitingForDriverRef = useRef(null);
  const confirmRidePanalRef = useRef(null);
  const [confirmRidePanal, setConfirmRidePanal] = useState(false);
  const panalClosRef = useRef(null);
  const [vechielPanal, setVechielPanal] = useState(false);
  const [vechielFound, setVechielFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);

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

 useGSAP(() => {
   if (vechielPanal) {
     gsap.to(vechielPanalRef.current, {
       y: 0,
       duration: 0.3,
     });
   } else {
     gsap.to(vechielPanalRef.current, {
       y: "100%",
       duration: 0.3,
     });
   }
 }, [vechielPanal]);
    

  useGSAP(() => {
    if (confirmRidePanal) {
      gsap.to(confirmRidePanalRef.current, {
        y: 0,
        duration: 0.3,
      });
    } else {
      gsap.to(confirmRidePanalRef.current, {
        y: "100%",
        duration: 0.3,
      });
    }
  }, [confirmRidePanal]);

    useGSAP(() => {
      if (vechielFound) {
        gsap.to(vechielFoundRef.current, {
          y: 0,
          duration: 0.3,
        });
      } else {
        gsap.to(vechielFoundRef.current, {
          y: "100%",
          duration: 0.3,
        });
      }
    }, [vechielFound]);

        useGSAP(() => {
          if (waitingForDriver) {
            gsap.to(WaitingForDriverRef.current, {
              y: 0,
              duration: 0.3,
            });
          } else {
            gsap.to(WaitingForDriverRef.current, {
              y: "100%",
              duration: 0.3,
            });
          }
        }, [waitingForDriver]);


  

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
          src={homeImg}
          alt="uber map"
          className="w-full h-full object-cover"
        />
      </div>

      <div className=" w-full h-screen flex flex-col justify-end absolute bottom-0  ">
        <div className="h[30%] p-5 bg-white bottom-0 w-full relative">
          <h5
            onClick={() => setPanelOpen(false)}
            ref={panalClosRef}
            className="flex absolute top-6 right-7 items-center gap-2 text-gray-900 text-2xl font-bold opacity-0 cursor-pointer"
          >
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
          <LocationSearchPanel
            vechielPanal={vechielPanal}
            setVechielPanal={setVechielPanal}
            setPanelOpen={setPanelOpen}
          />
        </div>

        <div
          ref={vechielPanalRef}
          className="ref= bg-white fixed bottom-0  w-full p-2 space-y-3  translate-y-full"
        >
          <VechielPanal
            setVechielPanal={setVechielPanal}
            setConfirmRidePanal={setConfirmRidePanal}
          />
        </div>

        <div
          ref={confirmRidePanalRef}
          className="ref= bg-white fixed bottom-0  w-full p-2 space-y-3  translate-y-full"
        >
          <ConfirmRidePanal
            setvechielFound={setVechielFound}
            setConfirmRidePanal={setConfirmRidePanal}
          />
        </div>
        <div
          ref={vechielFoundRef}
          className="ref= bg-white fixed bottom-0  w-full p-2 space-y-3  translate-y-full"
        >
          <LookingForDriver setvechielFound={setVechielFound} />
        </div>

         <div
          ref={WaitingForDriverRef}
          className="ref= bg-white fixed bottom-0  w-full p-2 space-y-3 translate-y-full"
        >
          <WaitingForDriver setWaitingForDriver={setWaitingForDriver} />
        </div>
      </div>
    </div>
  );
};

export default Home;
