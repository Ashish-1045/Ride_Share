<<<<<<< HEAD
import { Link } from "react-router-dom";
import React, { useState } from "react";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Captaindata, setCaptaindata] = useState({});

  const Submithandler = (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    setCaptaindata({ email: email, password: password });
  
  };
  return (
    
    <div className="flex flex-col items-center justify-between min-h-screen bg-gray-100">
      
      <div className=" w-full p-7 flex flex-col items-center justify-center">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOqOs_B9fC9jHPVxieoS8AbjT4HbOqOVMv4A&s"
          alt="Uber Logo"
          className="w-16 mb-8 mr-75"
        />
        <form
          onSubmit={Submithandler}
          className="bg-white p-6 rounded shadow-md w-full max-w-sm"
        >
          <h3 className="text-lg font-medium mb-2">What's Your Email</h3>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-6 px-4 py-2 rounded border font-xl w-full placeholder:font-light "
            required
            type="email"
            placeholder="your@email.com"
          />
          <h3 className="text-lg font-medium mb-2 mt-2">
            What's Your Password
          </h3>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-6  px-4 py-2 rounded border font-xl w-full placeholder:font-light "
            required
            type="password"
            placeholder="Password"
          />
          <button className="bg-black text-white py-2 px-4 font-medium hover:scale-95 mt-6 w-full">
            Login
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          Join a fleet ?{" "}
          <Link to="/CaptainSignup" className="text-blue-500 hover:underline">
            Register as a Captain
          </Link>
        </p>
      </div>
      <div className=" w-full p-7">
        <Link
          to="/UserLogin"
          className="bg-orange-400 text-white py-2 px-4 font-medium hover:scale-95 mt-6 w-full flex items-center justify-center rounded text-center"
        >
          Sign in As User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
=======
import React from 'react'

const  CaptainLogin = () => {
  return (
    <div className="CaptainLogin">Captain Login Page</div>
  )
}

export default  CaptainLogin
>>>>>>> 514409827b9ebbbb970c5016f240658e39762552
