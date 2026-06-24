import React from 'react'
import Car from "../assets/Car.png";
import Auto from "../assets/Auto.png";
import Bike from "../assets/Bike.png";


const VechielPanal = (props) => {
  return (
    <div
      onClick={() => {
        props.setVechielPanal(false);
      }}
      className="space-y-3"
    >
      <h3
        onClick={() => {
          props.setVechielPanal(false);
        }}
        className="text-2xl font-semibold flex items-center gap-2 w-full  justify-center mb-1 cursor-pointer"
      >
        <i className=" ri-arrow-down-wide-fill"></i>
      </h3>
      <div className="mb-4">
        <h3 className="text-2xl font-semibold p-2">Choose a Vehicle</h3>
      </div>
      <div
        onClick={() => props.setConfirmRidePanal(true)}
        className="flex items-center justify-between border-black border-2 hover:border-3  rounded-xl p-3 w-full "
      >
        <img className="h-18 object-contain " src={Car} alt="car" />

        <div className="flex-1 ml-4">
          <h4 className="text-lg font-semibold">
            Go Uber{" "}
            <span>
              <i className="ri-user-3-fill text-lg">4</i>
            </span>
          </h4>

          <h5 className="text-sm font-medium text-gray-700">2 min away</h5>

          <p className="text-sm text-gray-500">Affordable, compact rides</p>
        </div>

        <h2 className="text-xl font-bold">₹{props.fare.car}</h2>
      </div>

      <div
        onClick={() => props.setConfirmRidePanal(true)}
        className="flex items-center justify-between  border-black border-2 hover:border-3  rounded-xl p-3 w-full "
      >
        <img className="h-13 object-contain" src={Bike} alt="bike" />

        <div className="flex-1 ml-4">
          <h4 className="text-lg font-semibold">
            Go Uber{" "}
            <span>
              <i className="ri-user-3-fill">1</i>
            </span>
          </h4>

          <h5 className="text-sm font-medium text-gray-700">3 min away</h5>

          <p className="text-sm text-gray-500">Affordable, Motorcycle rides</p>
        </div>

        <h2 className="text-xl font-bold">₹{props.fare.motorcycle}</h2>
      </div>
      <div
        onClick={() => props.setConfirmRidePanal(true)}
        className="flex items-center justify-between  border-black border-2 hover:border-3  rounded-xl p-3 w-full"
      >
        <img className="h-16 object-contain" src={Auto} alt="Auto" />

        <div className="flex-1 ml-4">
          <h4 className="text-lg font-semibold">
            Go Uber{" "}
            <span>
              <i className="ri-user-3-fill text-lg">3</i>
            </span>
          </h4>

          <h5 className="text-sm font-medium text-gray-700">5 min away</h5>

          <p className="text-sm text-gray-500">Affordable, Auto rides</p>
        </div>

        <h2 className="text-xl font-bold">₹{props.fare.auto}</h2>
      </div>
    </div>
  );
}

export default VechielPanal
