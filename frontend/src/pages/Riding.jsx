import React from "react";
import homeImg from "../assets/HomeImg.gif";
import Car from "../assets/Car.png";
import { Link } from "react-router-dom";

const Riding = () => {
  return (
    <div className="w-full h-screen flex  flex flex-col overflow-hidden">
      <Link
        className="fixed bg-white h-10 w-10 rounded-full flex items-center justify-center top-2 left-2 z-50"
        to="/home"
      >
        <i className=" text-lg font-semibold ri-home-7-line"></i>
      </Link>

      <div className="w-full h-1/2 ">
        <img
          src={homeImg}
          alt="uber map"
          className="w-full h-full object-cover"
        />
      </div>

      <div className=" w-full h-1/2 flex  flex-col justify-center rounded-lg mb-4 px-2">
        <div className=" w-full h-full flex items-center justify-center rounded-lg mb-4">
          <div className=" w-full flex items-center justify-start ml-4 rounded-lg ">
            <img className="h-25 object-cover " src={Car} alt="Car" />
          </div>
          <div className=" w-full flex items-center justify-end mr-4 rounded-lg">
            <div className=" text-right flex flex-col  w-full ">
              <h3 className=" text-xl font-semibold">Ashish</h3>
              <h2 className=" text-2xl font-bold -mt-1 -mb-1">MP 37 1553</h2>
              <p className="font-semibold text-gray-700">Hyndai Aura </p>
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
        <button className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-800 text-white py-2 px-4 rounded-lg mt-4 ">
          Make A Payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
