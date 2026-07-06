
import axios from "axios";
import React, { useRef }from "react";
import { useContext } from "react";
import { CaptainDataContext} from "../context/CaptainContext";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CaptainDetails from "../Components/CaptainDetails";
import RidePopUp from "../Components/RidePopUp";
import { useState } from "react";
import { useSocket } from "../context/SocketContext";
import { useEffect } from "react";



const CaptainHome = () => {
    const {
   sendMessageToEvent,
   receiveMessageFromEvent,
   isConnected
} = useSocket();
  const {captain} = useContext(CaptainDataContext);

  

  const [ridePopUpPanal, setRidePopUpPanal] = useState(false);
    const [ConfirmridePopUpPanal, setConfirmRidePopUpPanal] = useState(false);
    const [ride, setRide] = useState(null);
  const RidePopUpPanalRef =  useRef(null)
  const ConfirmRidePopUpPanalRef = useRef(null)

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
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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
   if (!isConnected || !captain?._id) return;

   sendMessageToEvent("join", {
     userType: "captain",
     userId: captain._id,
   });

   const sendLocation = () => {
     navigator.geolocation.getCurrentPosition(
       (position) => {
         sendMessageToEvent("update-location-captain", {
           userId: captain._id,
           location: {
             lat: position.coords.latitude,
             lng: position.coords.longitude,
           },
         });
       },
       (err) => console.log(err),
     );
   };

   sendLocation();

   const interval = setInterval(sendLocation, 10000);

   const unsubscribe = receiveMessageFromEvent("new-ride", (rideData) => {
     console.log("🚖 New Ride:", rideData);

     setRide(rideData);
     setRidePopUpPanal(true);
   });

   return () => {
     clearInterval(interval);
     unsubscribe();
   };
 }, [isConnected, captain?._id]);




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
        <img
          src="https://user-images.githubusercontent.com/6416095/52931260-c6bb5e80-3371-11e9-9d46-83f7d1389d18.gif"
          alt="uber map"
          className="w-full h-full object-cover object-center"
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

      
    </div>
  );
};

export default CaptainHome;
