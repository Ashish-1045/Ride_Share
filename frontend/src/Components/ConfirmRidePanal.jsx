import React from "react";
import Car from "../assets/Car.png";
// import { useRef } from 'react';
// import gsap from 'gsap';
// import LookingForDriver from './LookingForDriver';

const ConfirmRidePanal = (props) => {
  //  const closeref = useRef(null);

  // const handleClose = () => {
  //   gsap.to(closeref.current, {
  //     opacity: 0,
  //     duration: 0.1,
  //     y: "100%",
  //     onComplete: () => {
  //       props.setConfirmRidePanal(false);
  //     },
  //   });
  // };

  return (
    <div className="bg-white w-full ">
      <h3
        onClick={() => props.setConfirmRidePanal(false)}
        className="text-2xl font-semibold flex items-center gap-2 w-full  justify-center mb-0 cursor-pointer "
      >
        <i className="text-gray-300 ri-arrow-down-wide-fill"></i>
      </h3>

      <div className="flex items-center justify-start gap-2 ml-4 w-full">
        <i className=" text-2xl font-bold ri-riding-line"></i>
        <h3 className="text-2xl font-bold text-center ">Confirm Your Ride</h3>
      </div>

      <div className=" w-full flex items-center justify-center rounded-lg mb-4">
        <img className="h-35 object-cover   " src={Car} alt="Car" />
      </div>

      <div>
        {" "}
        <div className="border-b-2 pb-4 space-y-9 w-full border-gray-500 mt-1">
          <div className="flex items-center gap-6 ml-4 h-auto">
            <i className="text-2xl text-bold ri-map-pin-user-fill"></i>
            <div className="flex flex-col ">
              <h2 className="text-lg font-bold ">562/11</h2>
              <h4 className="font-semibold"> {props.pickup}</h4>
            </div>
          </div>
        </div>
        <div className="border-b-2 pb-4  mt-1 border-gray-500">
          <div className="flex items-center gap-6 ml-4 h-auto">
            <i className="text-2xl text-bold ri-map-pin-fill"></i>
            <div className="flex flex-col ">
              <h2 className="text-lg font-bold ">562/11</h2>
              <h4 className="font-semibold"> {props.destination}</h4>
            </div>
          </div>
        </div>
        <div className="border-b-2 pb-4  mt-1 border-gray-500 ">
          <div className="flex items-center gap-6 ml-4 h-auto">
            <i className="text-2xl text-bold ri-currency-line"></i>
            <div className="flex flex-col ">
              <h2 className="text-lg font-bold ">
                {" "}
                ₹{props.fare?.[props.vehicleType]}
              </h2>
              <h4 className="font-semibold"> cash on delivery</h4>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          props.setConfirmRidePanal(false);
          props.setvechielFound(true);
          props.createride()
        }}
        className="bg-green-500 text-black py-3 px-26 rounded text-xl font-semibold hover:bg-green-800 transition duration-300 w-full mt-4"
      >
        Confirm
      </button>
    </div>
  );
};

export default ConfirmRidePanal;
