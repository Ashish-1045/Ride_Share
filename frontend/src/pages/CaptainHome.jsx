/* eslint-disable react-hooks/exhaustive-deps */

import axios from "axios";
import React, { useRef } from "react";
import { useContext } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CaptainDetails from "../Components/CaptainDetails";
import RidePopUp from "../Components/RidePopUp";
import ConfirmRidePopUp from "../Components/ConfirmRidePopUp";
import { useState } from "react";
import { useSocket } from "../context/SocketContext";
import { useEffect } from "react";
import LiveTracking from "../Components/LiveTracking";


const CaptainHome = () => {
  const { sendMessageToEvent, receiveMessageFromEvent, isConnected } =
    useSocket();
  const { captain } = useContext(CaptainDataContext);
  const [userLocation, setUserLocation] = useState(null);
  const [captainLocation, setCaptainLocation] = useState(null);
  const [ridePopUpPanal, setRidePopUpPanal] = useState(false);
  const [ConfirmridePopUpPanal, setConfirmRidePopUpPanal] = useState(false);
  const [ride, setRide] = useState(null);
  const RidePopUpPanalRef = useRef(null);
  const ConfirmRidePopUpPanalRef = useRef(null);

  
  async function confirmRide() {
    if (!ride) {
      console.log("Ride not available");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
        {
          rideId: ride._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("captainToken")}`,
          },
        },
      );

      console.log("✅ Ride confirmed:", response.data);

      setRidePopUpPanal(true);
    } catch (error) {
      console.log(
        "❌ Confirm Ride Error:",
        error.response?.data || error.message,
      );
    }
  }
  useGSAP(() => {
    if (ridePopUpPanal) {
      gsap.to(RidePopUpPanalRef.current, {
        y: 0,
        duration: 0.3,
      });
    } else {
      gsap.to(RidePopUpPanalRef.current, {
        y: "100%",
        duration: 0.3,
      });
    }
  }, [ridePopUpPanal]);

  useGSAP(() => {
    if (ConfirmridePopUpPanal) {
      gsap.to(ConfirmRidePopUpPanalRef.current, {
        y: 0,
        duration: 0.3,
      });
    } else {
      gsap.to(ConfirmRidePopUpPanalRef.current, {
        y: "100%",
        duration: 0.3,
      });
    }
  }, [ConfirmridePopUpPanal]);

  useEffect(() => {
    const captainId = captain?.id || captain?._id;
    if (!isConnected || !captainId) return;

    sendMessageToEvent("join", {
      userType: "captain",
      userId: captainId,
    });

  const watchId = navigator.geolocation.watchPosition(
    (position) => {
      const location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      setCaptainLocation(location);

      sendMessageToEvent("update-location-captain", {
        userId: captainId,
        location,
      });
    },
    (error) => {
      console.log(error);
    },
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 10000,
    },
  );

   


    const unsubscribe = receiveMessageFromEvent("new-ride", (rideData) => {
      console.log("🚖 New Ride:", rideData);

      setRide(rideData);
      setRidePopUpPanal(true);
    });
    const unsubscribeLocation = receiveMessageFromEvent(
      "user-location-update",
      (data) => {
        setUserLocation(data.location);
      },
    );
return () => {
  navigator.geolocation.clearWatch(watchId);
  unsubscribe();
  unsubscribeLocation();
};
  }, [isConnected, captain?.id, captain?._id]);

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

      <div className="w-full h-3/5 overflow-hidden ">
        <LiveTracking
          userLocation={userLocation}
          captainLocation={captainLocation}
        />
      </div>

      <div className="w-full  h-2/5 p-2 bg-gray-100 ">
        <CaptainDetails />
      </div>
      <div
        ref={RidePopUpPanalRef}
        className=" bg-gray-100 fixed bottom-0  w-full p-2 space-y-3  translate-y-full"
      >
        <RidePopUp
          ride={ride}
          setRidePopUpPanal={setRidePopUpPanal}
          setConfirmRidePopUpPanal={setConfirmRidePopUpPanal}
          confirmRide={confirmRide}
        />
      </div>

      <div
        ref={ConfirmRidePopUpPanalRef}
        className=" bg-gray-100 fixed bottom-0  w-full p-2 space-y-3  translate-y-full"
      >
        <ConfirmRidePopUp
          ride={ride}
          setConfirmRidePopUpPanal={setConfirmRidePopUpPanal}
          setRidePopUpPanal={setRidePopUpPanal}
          confirmRide={confirmRide}
        />
      </div>
    </div>
  );
};

export default CaptainHome;




