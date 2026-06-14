import React from 'react'
import Car from "../assets/Car.png"


const LookingForDriver = (props) => {
  
  return (
    <div className="bg-white w-full ">
      <h3 onClick ={() => props.setvechielFound(false)}
      className="text-2xl font-semibold flex items-center gap-2 w-full  justify-center mb-0 cursor-pointer ">
        <i className="text-gray-300 ri-arrow-down-wide-fill"></i>
      </h3>

      <div className="flex items-center justify-start gap-2 ml-4 w-full">
        <img
          className="h-8 object-contain mb-3"
          src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
          alt="confirm"
        />
        <h3 className="text-2xl font-bold text-center ">Looking for Driver</h3>
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
    </div>
  );
};


export default LookingForDriver