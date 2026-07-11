import React from 'react';
import Car from "../assets/Car.png";

const WaitingForDriver = ({ setWaitingForDriver, acceptedRide, pickup, destination, fare }) => {
  const captain = acceptedRide?.captain;
  const captainName = captain?.fullname?.firstname
    ? `${captain.fullname.firstname} ${captain.fullname.lastname || ""}`.trim()
    : "Driver";
  const plateNumber = captain?.vehicle?.plate || "N/A";
  const vehicleType = captain?.vehicle?.vehicleType || "car";
  const vehicleColor = captain?.vehicle?.color || "";
  const fareAmount = acceptedRide?.fare ?? fare?.car ?? fare?.motorcycle ?? fare?.auto ?? 0;

  return (
    <div className="bg-white w-full ">
      <h3
        onClick={() => setWaitingForDriver(false)}
        className="text-2xl font-semibold flex items-center gap-2 w-full justify-center mb-0 cursor-pointer"
      >
        <i className="text-gray-300 ri-arrow-down-wide-fill"></i>
      </h3>

      <div className="flex items-center justify-start gap-2 ml-4 w-full">
        <h3 className="text-2xl font-base">
          <i className="ri-arrow-right-circle-fill"></i>
        </h3>
        <div>
          <h3 className="text-2xl font-bold text-center">Waiting for Driver</h3>
        </div>
      </div>

      <div className="w-full flex items-center justify-center rounded-lg mb-4">
        <div className="w-full flex items-center justify-start ml-4 rounded-lg mb-4">
          <img className="h-25 object-cover" src={Car} alt="Car" />
        </div>
        <div className="w-full flex items-center justify-end mr-4 rounded-lg mb-4">
          <div className="text-right flex flex-col w-full">
            <h3 className="text-xl font-semibold">{captainName}</h3>
            <h2 className="text-2xl font-bold -mt-1 -mb-1">{plateNumber}</h2>
            <p className="font-semibold text-gray-700">
              {vehicleColor ? `${vehicleColor} ${vehicleType}` : vehicleType}
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className="border-b-2 pb-4 space-y-9 w-full border-gray-500 mt-1">
          <div className="flex items-center gap-6 ml-4 h-auto">
            <i className="text-2xl text-bold ri-map-pin-user-fill"></i>
            <div className="flex flex-col">
              <h2 className="text-lg font-bold">{pickup || "Pickup location"}</h2>
              <h4 className="font-semibold">{pickup || "Pickup location"}</h4>
            </div>
          </div>
        </div>

        <div className="border-b-2 pb-4 mt-1 border-gray-500">
          <div className="flex items-center gap-6 ml-4 h-auto">
            <i className="text-2xl text-bold ri-map-pin-fill"></i>
            <div className="flex flex-col">
              <h2 className="text-lg font-bold">{destination || "Destination"}</h2>
              <h4 className="font-semibold">{destination || "Destination"}</h4>
            </div>
          </div>
        </div>

        <div className="border-b-2 pb-4 mt-1 border-gray-500">
          <div className="flex items-center gap-6 ml-4 h-auto">
            <i className="text-2xl text-bold ri-currency-line"></i>
            <div className="flex flex-col">
              <h2 className="text-lg font-bold">{fareAmount.toFixed(2)}</h2>
              <h4 className="font-semibold">Cash on delivery</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver