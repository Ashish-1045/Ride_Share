import React from 'react'
import { useState } from 'react';

const RidePopUp = (props) => {
     const [OTP, setOTP] = useState('')
       const SubmitHandler = (e) => {
         e.preventDefault();
       };


  
  return (
    <div className="bg-gray-100 w-full">
      <h3
        onClick={() => props.setRidePopUpPanal(false)}
        className="text-2xl font-semibold flex items-center gap-2 w-full  justify-center mb-0 cursor-pointer "
      >
        <i className="text-gray-300 ri-arrow-down-wide-fill"></i>
      </h3>

      <div className="flex items-center justify-start gap-2 ml-4 w-full">
        <i className=" text-2xl font-bold ri-riding-line"></i>
        <h3 className="text-2xl font-bold text-center ">
          Avaliable For Ride !
        </h3>
      </div>

      <div className="flex justify-between gap-3 items-center mt-5 p-2 bg-gradient-to-b from-gray-100 to-gray-200 rounded ">
        <div className="flex justify-between items-center gap-5">
          <img
            className="h-20 w-20 rounded-full object-cover"
            src="data:image/jpeg;base64,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"
            alt=""
          />
          <h4 className="font-semibold text-xl ">nmaes</h4>
        </div>

        <div>
          <h5 className="text-lg font-semibold">249 km</h5>
        </div>
      </div>

      <div>
        {" "}
        <div className="border-b-2 pb-4 space-y-9 w-full border-gray-500 mt-5">
          <div className="flex items-center gap-6 ml-4 h-auto">
            <i className="text-2xl text-bold ri-map-pin-user-fill"></i>
            <div className="flex flex-col ">
              <h2 className="text-lg font-bold ">562/11</h2>
              <h4 className="font-semibold">
                {" "}
                Raj darbar, j-sector , Ayoodya Bypass
              </h4>
            </div>
          </div>
        </div>
        <div className="border-b-2 pb-4  mt-1 border-gray-500">
          <div className="flex items-center gap-6 ml-4 h-auto">
            <i className="text-2xl text-bold ri-map-pin-fill"></i>
            <div className="flex flex-col ">
              <h2 className="text-lg font-bold ">562/11</h2>
              <h4 className="font-semibold">
                {" "}
                Raj darbar, j-sector , Ayoodya Bypass
              </h4>
            </div>
          </div>
        </div>
        <div className="border-b-2 pb-4  mt-1 border-gray-500 ">
          <div className="flex items-center gap-6 ml-4 h-auto">
            <i className="text-2xl text-bold ri-currency-line"></i>
            <div className="flex flex-col ">
              <h2 className="text-lg font-bold ">199.20</h2>
              <h4 className="font-semibold"> cash on delivery</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full p-3">
        <form
          onSubmit={(e) => {
            SubmitHandler(e);
          }}
        >
          <input
            value={OTP}
            onChange={(e) => setOTP(e.target.value)}
            className="w-full py-2 px-5 border-2 rounded-lg text-gray-500 text-2xl font-semibold space-x-2"
            type="text"
            placeholder="Enter Your OTP"
          />

          <div className="flex justify-between items-center ">
            <button
              onClick={() => {
                props.setConfirmRidePopUpPanal(true);
              }}
              className="bg-orange-400 text-black py-3 px-10 rounded-lg text-xl font-semibold hover:bg-orange-600 transition duration-300  mt-4"
            >
              Accept
            </button>
            <button
              onClick={() => {
                props.setRidePopUpPanal(false);
              }}
              className="bg-gray-400 text-black py-3 px-10 rounded-lg text-xl font-semibold hover:bg-gray-600 transition duration-300  mt-4"
            >
              Ignore
            </button>
          </div>
        </form>
      </div>
    </div>
  );
    }   

export default RidePopUp