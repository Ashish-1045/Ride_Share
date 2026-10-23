import React, { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import CaptainDetails from "../Components/CaptainDetails";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useState } from "react";
import FinishRide from "../Components/FinishRide";
import useLocationTracking from "../hooks/useLocationTracking";
import LiveTracking from "../Components/LiveTracking";

const CaptainRiding = () => {
  const location = useLocation();
  const ride = location.state?.ride;
  const [FinishRidePanal, setFinishRidePanal] = useState(false);
  const FinishRidePanalRef = useRef(null);
  const captainId = ride?.captain?._id || ride?.captainId || null;

  const { userLocation, captainLocation, socket,  } =
    useLocationTracking(captainId, "captain");

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

  const handleCompleteRide = (e) => {
    e.stopPropagation();
    if (ride) {
      console.log("📍 Emitting ride-ended to server:", ride);
      try {
        if (socket && socket.connected) {
          socket.emit("ride-ended", ride);
        } else {
          // fallback: emit generic message so backend can route if listening
          console.warn("Socket not connected — ride-ended not sent");
        }
      } catch (err) {
        console.error("Error emitting ride-ended:", err);
      }
      setFinishRidePanal(false);
    }
  };
  return (
    <div
      onClick={() => {
        setFinishRidePanal(true);
      }}
      className="w-full h-screen flex flex-col overflow-hidden "
    >
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

      <div className="w-full h-5/4 ">
             <LiveTracking
               className="w-full h-full object-cover"
               userLocation={userLocation}
               captainLocation={captainLocation}
             />
           </div>

      <div
        onClick={() => {
          setFinishRidePanal(true);
        }}
        className="w-full  h-1/6 p-2 bg-orange-400 flex flex-col "
      >
        <i className="text-center text-xl font-semibold ri-arrow-up-wide-line"></i>
        <div className="flex justify-between items-center p-4 ">
          <div>
            <h2 className="text-xl font-medium">
              {ride?.distance || "4 KM"} away
            </h2>
            {ride && (
              <div className="text-sm">
                <p className="font-semibold">
                  Passenger: {ride.fullname?.firstname}{" "}
                  {ride.fullname?.lastname}
                </p>
                <p className="font-semibold">Destination: {ride.destination}</p>
                <p className="font-semibold">Fare: ₹{ride.fare}</p>
              </div>
            )}
          </div>
          <button
            onClick={handleCompleteRide}
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
        <FinishRide
          ride={ride}
          setFinishRidePanal={setFinishRidePanal}
          finishRide={handleCompleteRide}
        />
      </div>
    </div>
  );
};

export default CaptainRiding;


