<<<<<<< HEAD
import { Link } from "react-router-dom";
const UserLogin = () => {
 
  
  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gray-100">
      <div className=" w-full p-7 flex flex-col items-center justify-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
          className="w-16 mb-8 mr-75"
        />
        <form className="bg-white p-6 rounded shadow-md w-full max-w-sm">
          <h3 className="text-lg font-medium mb-2">What's Your Name</h3>
          <div className="flex gap-4">
            <input
              className="bg-[#eeeeee] mb-6 px-4 py-2 rounded border font-xl w-1/2 placeholder:font-light "
              required
              type="email"
              placeholder="First Name"
            />
            <input
              className="bg-[#eeeeee] mb-6 px-4 py-2 rounded border font-xl w-1/2 placeholder:font-light "
              required
              type="email"
              placeholder="Last Name"
            />
          </div>
          <h3 className="text-lg font-medium mb-2">What's Your Email</h3>
          <input
            className="bg-[#eeeeee] mb-6 px-4 py-2 rounded border font-xl w-full placeholder:font-light "
            required
            type="email"
            placeholder="your@email.com"
          />
          <h3 className="text-lg font-medium mb-2 mt-2">
            What's Your Password
          </h3>
          <input
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
          Don't have an account?{" "}
          <Link to="/Usersignup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
      <div className=" w-full p-7">
        <Link
          to="/CaptainLogin"
          className="bg-[#10b461] text-white py-2 px-4 font-medium hover:scale-95 mt-6 w-full flex items-center justify-center rounded text-center"
        >
          Sign in As Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
=======
import React from 'react'

const UserSignup = () => {
  return (
    <div>UserSignup</div>
  )
}

export default UserSignup
>>>>>>> 514409827b9ebbbb970c5016f240658e39762552
