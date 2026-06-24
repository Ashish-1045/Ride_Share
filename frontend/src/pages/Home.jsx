/* eslint-disable no-unused-vars */
import React from "react";
import axios from "axios";
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
// import ConfirmRidePopUp from "../Components/ConfirmRidePopUp";

const Home = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [panalOpen, setPanelOpen] = useState(false);
  const vechielPanalRef = useRef(null);
  const panalRef = useRef(null);
  const vechielFoundRef = useRef(null);
  const WaitingForDriverRef = useRef(null);
  const confirmRidePanalRef = useRef(null);
  const [confirmRidePanal, setConfirmRidePanal] = useState(false);
  const panalClosRef = useRef(null);
  const [vechielPanal, setVechielPanal] = useState(false);
  const [vechielFound, setVechielFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);

  const [activeField, setActiveField] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);

  const fetchSuggestions = async (value) => {
    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      setIsLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: {
            input: value,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      setSuggestions(response.data || []);
    } catch (error) {
      console.log("Suggestions Error:", error.response?.data || error.message);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectLocation = (location) => {
    if (activeField === "pickup") {
      setPickupLocation(location);
    } else {
      setDestination(location);
    }

    setSuggestions([]);
    setPanelOpen(false);

    const pickupValue = activeField === "pickup" ? location : pickupLocation;

    const destinationValue =
      activeField === "destination" ? location : destination;

    if (pickupValue && destinationValue) {
      // setVechielPanal(true);
    }
  };

  const SubmitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(() => {
    if (panalOpen) {
      gsap.to(panalRef.current, {
        height: "62%",
      });
      if (panalClosRef.current) {
        gsap.to(panalClosRef.current, {
          opacity: 1,
        });
      }
    } else {
      gsap.to(panalRef.current, {
        height: "0%",
      });
      if (panalClosRef.current) {
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

 async function findtrip() {
   try {
     const response = await axios.get(
       `${import.meta.env.VITE_BASE_URL}/rides/getfare`,
       {
         params: {
           pickup: pickupLocation,
           destination: destination,
         },
         headers: {
           Authorization: `Bearer ${localStorage.getItem("token")}`,
         },
       },
     );

     console.log("Fare Response:", response.data);

     setFare(response.data);
     setVechielPanal(true);
     setPanelOpen(false);
   } catch (error) {
     console.log(error.response?.data || error.message);
   }
 }

  async function createride() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        {
          pickup: pickupLocation,
          destination,
          vehicleType,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
        console.log(response.data);
    } catch (err) {
      console.log(err.response?.data);
    }
   
  }


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
            <div className="absolute left-8 top-[33%] flex flex-col items-center">
              <div className="w-1 h-16 bg-gray-700 rounded-full"></div>

              <div className="w-1.5 h-1.5 bg-gray-700 rounded-full mt-2"></div>
            </div>

            <input
              onFocus={() => {
                setActiveField("pickup");
                setPanelOpen(true);
              }}
              value={pickupLocation}
              onChange={(e) => {
                setPickupLocation(e.target.value);
                fetchSuggestions(e.target.value);
              }}
              className="bg-[#eee] px-9 w-full py-2 text-lg rounded-xl mt-4"
              type="text"
              placeholder="Add a pickup location"
            />
            <input
              onFocus={() => {
                setActiveField("destination");
                setPanelOpen(true);
              }}
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                fetchSuggestions(e.target.value);
              }}
              className="bg-[#eee] px-9 w-full py-2 text-lg rounded-xl mt-4"
              type="text"
              placeholder="Enter your destination"
            />
            <button
              type="button"
              onClick={findtrip}
              className="w-full bg-black text-white text-2xl py-2 rounded-lg mt-4"
            >
              Find
            </button>
          </form>
        </div>

        <div ref={panalRef} className=" w-screen bg-white ">
          <LocationSearchPanel
            suggestions={suggestions}
            isLoading={isLoading}
            onSelectLocation={handleSelectLocation}
            setPanelOpen={setPanelOpen}
          />
        </div>

        <div
          ref={vechielPanalRef}
          className="ref= bg-white fixed bottom-0  w-full p-2 space-y-3  translate-y-full"
        >
          <VechielPanal
            fare={fare}
            setFare={setFare}
            selectVehicle={setVehicleType}
            setVechielPanal={setVechielPanal}
            setConfirmRidePanal={setConfirmRidePanal}
          />
        </div>

        <div
          ref={confirmRidePanalRef}
          className="ref= bg-white fixed bottom-0  w-full p-2 space-y-3  translate-y-full"
        >
          <ConfirmRidePanal
            createride={createride}
            setvechielFound={setVechielFound}
            setConfirmRidePanal={setConfirmRidePanal}
            pickup={pickupLocation}
            destination={destination}
            fare={fare}
            vehicleType={vehicleType}
          />
        </div>
        <div
          ref={vechielFoundRef}
          className="ref= bg-white fixed bottom-0  w-full p-2 space-y-3  translate-y-full"
        >
          <LookingForDriver
            setvechielFound={setVechielFound}
            pickup={pickupLocation}
            destination={destination}
            fare={fare}
            vehicleType={vehicleType}
          />
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
