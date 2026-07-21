
import React from "react";
import Car from "../assets/Car.png";

const WaitingForDriver = ({
  setWaitingForDriver,
  acceptedRide,
  pickup,
  destination,
  fare,
}) => {
  const captain = acceptedRide?.captain;

  const captainName = captain?.fullname?.firstname
    ? `${captain.fullname.firstname} ${captain.fullname.lastname || ""}`.trim()
    : "Driver";

  const plateNumber = captain?.vehicle?.plate || "N/A";
  const vehicleType = captain?.vehicle?.vehicleType || "Car";
  const vehicleColor = captain?.vehicle?.color || "";
  const otp = acceptedRide?.otp;

  const fareAmount =
    acceptedRide?.fare ??
    fare?.car ??
    fare?.motorcycle ??
    fare?.auto ??
    fare ??
    0;
  return (
    <div className="bg-white w-full">
      <h3
        onClick={() => setWaitingForDriver(false)}
        className="text-2xl font-semibold flex items-center justify-center cursor-pointer"
      >
        <i className="text-gray-300 ri-arrow-down-wide-fill"></i>
      </h3>

      <div className="flex items-center gap-2 ml-4">
        <i className="ri-arrow-right-circle-fill text-2xl"></i>
        <h3 className="text-2xl font-bold">Waiting for Driver</h3>
      </div>

      <div className="flex items-center justify-between px-4 mt-4 mb-4">
        <img className="h-24 object-contain" src={Car} alt="Car" />

        <div className="text-right">
          <h3 className="text-xl font-semibold capitalize">{captainName}</h3>

          <h2 className="text-2xl font-bold">{plateNumber}</h2>

          <p className="font-semibold text-gray-700">
            {vehicleColor ? `${vehicleColor} ${vehicleType}` : vehicleType}
          </p>
        </div>
      </div>

      {/* OTP */}
      {otp && (
        <div className="mx-4 mb-4 bg-yellow-50 border-2 border-yellow-400 rounded-xl px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 font-medium">
              Share this OTP with your driver
            </p>
            <h2 className="text-3xl font-bold tracking-widest text-gray-900">
              {otp}
            </h2>
          </div>
          <i className="ri-shield-keyhole-line text-3xl text-yellow-600"></i>
        </div>
      )}

      <div>
        {/* Pickup */}
        <div className="border-b-2 border-gray-300 py-4">
          <div className="flex items-center gap-6 ml-4">
            <i className="ri-map-pin-user-fill text-2xl"></i>

            <div>
              <h2 className="text-lg font-bold">
                {pickup || "Pickup Location"}
              </h2>

              <h4 className="text-gray-600">{pickup || "Pickup Location"}</h4>
            </div>
          </div>
        </div>

        {/* Destination */}
        <div className="border-b-2 border-gray-300 py-4">
          <div className="flex items-center gap-6 ml-4">
            <i className="ri-map-pin-fill text-2xl"></i>

            <div>
              <h2 className="text-lg font-bold">
                {destination || "Destination"}
              </h2>

              <h4 className="text-gray-600">{destination || "Destination"}</h4>
            </div>
          </div>
        </div>

        {/* Fare */}
        <div className="border-b-2 border-gray-300 py-4">
          <div className="flex items-center gap-6 ml-4">
            <i className="ri-currency-line text-2xl"></i>

            <div>
              <h2 className="text-lg font-bold">
                ₹{Number(fareAmount).toFixed(2)}
              </h2>

              <h4 className="text-gray-600">Cash on Delivery</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;