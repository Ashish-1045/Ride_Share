/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";



const UserSignup = () => {
  const [firstname, setfirstName] = useState("");
  const [lastname, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userdata, setUserdata] = useState({});

  const navigate = useNavigate();
  // const {user, setUser } = useContext( UserDataContext());
  const {user, setUser } = useContext(UserDataContext);

  const Submithandler = async (e) => {
     e.preventDefault();
    const newUser = {
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
    };

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);
    if (response.status === 201) {
      const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.user.token);
        navigate("/Home");
      
    }
    setfirstName("");
    setlastName("");
    setEmail("");
    setPassword("");
    
  };

   
  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gray-100">
      <div className=" w-full p-7 flex flex-col items-center justify-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
          className="w-16 mb-8 mr-60"
        />
        <form
          onSubmit={Submithandler}
          className="bg-white p-6 rounded shadow-md w-full max-w-sm"
        >
          <h3 className="text-lg font-medium mb-2">What's Your Name</h3>
          <div className="flex gap-4">
            <input
              className="bg-[#eeeeee] mb-6 px-4 py-2 rounded border font-xl w-1/2 placeholder:font-light "
              required
              type="text"
              placeholder="First Name"
              value={firstname}
              onChange={(e) => setfirstName(e.target.value)}
            />
            <input
              className="bg-[#eeeeee] mb-6 px-4 py-2 rounded border font-xl w-1/2 placeholder:font-light "
              required
              type="text"
              placeholder="Last Name"
              value={lastname}
              onChange={(e) => setlastName(e.target.value)}
            />
          </div>
          <h3 className="text-lg font-medium mb-2">What's Your Email</h3>
          <input
            className="bg-[#eeeeee] mb-6 px-4 py-2 rounded border font-xl w-full placeholder:font-light "
            required
            type="email"
            autoComplete="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h3 className="text-lg font-medium mb-2 mt-2">
            What's Your Password
          </h3>
          <input
            className="bg-[#eeeeee] mb-6  px-4 py-2 rounded border font-xl w-full placeholder:font-light "
            required
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-black text-white py-2 px-4 font-medium hover:scale-95 mt-6 w-full">
            Create Account
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <Link to="/UserLogin" className="text-blue-500 hover:underline">
            Log in as User
          </Link>
        </p>
      </div>
      <div className="w-full text-center text-sm text-gray-500 py-4 mt-6 mb-3 ">
        <p>© 2026 Uber. All rights reserved.</p>
        <p className="mt-1">
          By signing up, you agree to our
          <span className="text-blue-500 cursor-pointer hover:underline">
            {" "}
            Terms{" "}
          </span>
          and
          <span className="text-blue-500 cursor-pointer hover:underline">
            {" "}
            Privacy Policy
          </span>
          .
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
