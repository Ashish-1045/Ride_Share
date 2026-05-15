/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { useConnection } from "../../../backend/models/user.model";
import { CaptainDataContext } from "../context/CaptainContext";


const CaptainSignup = () => {
  const navigate = useNavigate();
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [color, setColor] = useState("");
  const [plate, setPlate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [userdata, setUserdata] = useState({});  

 const {captain, setCaptain} = useContext(CaptainDataContext);

  const Submithandler = async (e) => {
    e.preventDefault();
    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: color,
        plate: plate,
        capacity: capacity,
        vehicleType: vehicleType,
      },
    };

    setfirstName("");
    setlastName("");
    setEmail("");
    setPassword("");
    setColor("");
    setPlate("");
    setCapacity("");
    setVehicleType("");

    setUserdata({
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,

      vehicle: {
        color: color,
        plate: plate,
        capacity: capacity,
        vehicleType: vehicleType,
      },
    });
  const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`,captainData);
    if (response.status === 201) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/CaptainHome");
    }}
    
   
  

  return (
    <div className="flex flex-col items-center h-screen overflow-hidden justify-between min-h-screen bg-gray-100">
      <div className=" w-full pt-3  pb-2 flex flex-col items-center justify-center">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOqOs_B9fC9jHPVxieoS8AbjT4HbOqOVMv4A&s"
          alt="Uber Logo"
          className="w-16 mb-3 mr-60"
        />
        <form
          onSubmit={Submithandler}
          className="bg-white p-4 rounded shadow-md w-full max-w-sm"
        >
          <h3 className="text-lg font-medium mb-2">What's Your Name</h3>
          <div className="flex gap-4">
            <input
              className="bg-[#eeeeee] mb-6 px-4 py-2 rounded border font-xl w-1/2 placeholder:font-light "
              required
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
            />
            <input
              className="bg-[#eeeeee] mb-6 px-4 py-2 rounded border font-xl w-1/2 placeholder:font-light "
              required
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
            />
          </div>
          <h3 className="text-lg font-medium mb-2">What's Your Email</h3>
          <input
            className="bg-[#eeeeee] mb-6 px-4 py-2 rounded border font-xl w-full placeholder:font-light "
            required
            type="email"
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <h3 className="text-sm font-medium mb-2">Vehicle Color</h3>

              <input
                className="bg-[#eeeeee] px-4 py-2 rounded border w-full"
                required
                type="text"
                placeholder="Black"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Plate Number</h3>

              <input
                className="bg-[#eeeeee] px-4 py-2 rounded border w-full"
                required
                type="text"
                placeholder="MP04AB1234"
                value={plate}
                onChange={(e) => setPlate(e.target.value)}
              />
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Capacity</h3>

              <input
                className="bg-[#eeeeee] px-4 py-2 rounded border w-full"
                required
                type="number"
                placeholder="4"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
              />
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Vehicle Type</h3>

              <select
                className="bg-[#eeeeee] px-4 py-2 rounded border w-full"
                required
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
              >
                <option value="">Select</option>
                <option value="car">Car</option>
                <option value="motorcycle">Bike</option>
                <option value="auto">Auto</option>
              </select>
            </div>
          </div>
          <button className="bg-black text-white py-2 px-4 font-medium hover:scale-95 mt-6 w-full">
            Create Account
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <Link to="/CaptainLogin" className="text-blue-500 hover:underline">
            Log in as Captain
          </Link>
        </p>
      </div>
      <div className="w-full text-center text-sm text-gray-500 py-4 mt-4 mb-3 ">
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

export default CaptainSignup;
