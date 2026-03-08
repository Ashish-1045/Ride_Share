import React from "react";

const UserLogin = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center ml-8">
      <form action="">
        <h3 className="text-2xl font-bold">What's Your Email</h3>
        <input className="border font-xl" required type="email" placeholder="your@email.com" />
        <h3 className="text-2xl font-bold mt-4">Enter Your Password</h3>
        <input className="border font-xl" required type="password" placeholder="Password" />
        <button>Login</button>
      </form>
    </div>
  );
};

export default UserLogin;
