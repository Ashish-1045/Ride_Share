import React from 'react'
import {Link} from 'react-router-dom';
const Home = () => {
  return (
    <div>
      <div className=" bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1557404763-69708cd8b9ce?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHRyYWZpY3xlbnwwfHwwfHx8MA%3D%3D')]  h-screen pt-8 flex justify-between flex-col w-full bg-pink-300 ">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="U Logo"
          className="w-16 ml-8"
        />
        <div className="bg-white w-full  py-8 px-3 shadow-lg flex flex-col items-center gap-4">
          <h1 className="text-4xl font-bold text-center ">
            Get Start With Uber
          </h1>
          <Link to="/UserLogin" className=" flex item-center justify-center bg-black text-white py-3 px-26 rounded text-lg font-semibold hover:bg-gray-800 transition duration-300">
            continue
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home