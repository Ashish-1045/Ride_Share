/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { UserDataContext } from "../context/UserContext";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { useContext } from "react";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userdata, setUserdata] = useState({});

  const navigate = useNavigate();
  const {user, setUser} = useContext(UserDataContext);
  

  const Submithandler = async (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/login`,
      userData,
    );

     if (response.status === 200) {
      const data = response.data;
        setUser(data.user);
         localStorage.setItem("token", data.user.token);
        navigate("/Home");
   
    }
    // console.log(setUserdata)
   
    setEmail("");
    setPassword("");
  
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gray-100">
      <div className="w-full p-7 flex flex-col items-center justify-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
          className="w-16 mb-8 mr-60"
        />

        <form
          onSubmit={Submithandler}
          className="bg-white p-6 rounded shadow-md w-full max-w-sm"
        >
          <h3 className="text-lg font-medium mb-2">What's Your Email</h3>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-6 px-4 py-2 rounded border w-full"
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
            className="bg-[#eeeeee] mb-6 px-4 py-2 rounded border w-full"
            required
            type="password"
            placeholder="Password"
          />

          <button className="bg-black text-white py-2 px-4 font-medium hover:scale-95 mt-6 w-full">
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?
          <Link to="/Usersignup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>

      <div className="w-full p-7">
        <Link
          to="/CaptainLogin"
          className="bg-[#10b461] text-white py-2 px-4 font-medium hover:scale-95 mt-6 w-full flex items-center justify-center rounded"
        >
          Sign in As Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
