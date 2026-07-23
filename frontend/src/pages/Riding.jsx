import React, { useEffect } from "react";
import homeImg from "../assets/HomeImg.gif";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketContext";
const Riding = () => {
  const location = useLocation();
  const ride = location.state?.ride;
  const { receiveMessageFromEvent } = useSocket();
  const navigate = useNavigate();

  useEffect(() => {
    const cleanup = receiveMessageFromEvent("ride-ended", (rideData) => {
      console.log("📍 Ride ended:", rideData);
      navigate("/home");
    });

  return () => cleanup?.();
}, [receiveMessageFromEvent, navigate]);
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

      <div className=" w-full h-1/2 flex  flex-col justify-center rounded-full mb-4 px-2">
        <div className=" w-full h-full flex items-center justify-center rounded-lg mb-4">
          <div className=" w-full flex items-center justify-start -ml-2 rounded-lg ">
            <img
              src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy82NDkzYzI1NS04N2M4LTRlMmUtOTQyOS1jZjcwOWJmMWI4MzgucG5n"
              alt="Car"
              className="h-24  object-contain "
            />
          </div>
          <div className=" w-full flex items-center justify-end mr-4 rounded-lg">
            <div className=" text-right flex flex-col  w-full ">
              <h3 className=" text-xl font-semibold">
                {ride?.captain?.fullname?.firstname}{" "}
                {ride?.captain?.fullname?.lastname}
              </h3>
              <h2 className=" text-2xl font-bold -mt-1 -mb-1">
                {ride?.captain?.vehicle?.plate || "MP 37 1553"}
              </h2>
              <p className="font-semibold text-gray-700">
                {ride?.captain?.vehicle?.vehicleType || "Hyndai Aura"}{" "}
              </p>
            </div>
          </div>
        </div>

        <div className="border-b-2 pb-4  mt-1 border-gray-500">
          <div className="flex items-center gap-6 ml-4 h-auto">
            <i className="text-2xl text-bold ri-map-pin-fill"></i>
            <div className="flex flex-col ">
              <h2 className="text-lg font-bold ">Destination</h2>
              <h4 className="font-semibold">
                {ride?.destination || "Raj darbar, j-sector , Ayoodya Bypass"}
              </h4>
            </div>
          </div>
        </div>
        <div className="border-b-2 pb-4  mt-1 border-gray-500 ">
          <div className="flex items-center gap-6 ml-4 h-auto">
            <i className="text-2xl text-bold ri-currency-line"></i>
            <div className="flex flex-col ">
              <h2 className="text-lg font-bold">₹{ride?.fare || "199.20"}</h2>
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
