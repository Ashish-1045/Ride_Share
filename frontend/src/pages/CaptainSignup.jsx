import { Link } from "react-router-dom";
import { useState } from "react";
const CaptainSignup = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [userdata, setUserdata] = useState({});  

  const Submithandler = (e) => {
    e.preventDefault();
    setfirstName("");
    setlastName("");
    setEmail("");
    setPassword("");

    setUserdata({
      Fullname: {
        firstName: firstName,
        lastName: lastName
      },
      email: email,
      password: password,
    });
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gray-100">
      <div className=" w-full p-7 flex flex-col items-center justify-center">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOqOs_B9fC9jHPVxieoS8AbjT4HbOqOVMv4A&s"
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

export default CaptainSignup;
