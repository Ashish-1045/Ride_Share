import React from 'react'
import { Link } from 'react-router-dom';
import CaptainDetails from '../Components/CaptainDetails';
const CaptainRiding = () => {
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
      
    </div>
  );
}

export default CaptainRiding