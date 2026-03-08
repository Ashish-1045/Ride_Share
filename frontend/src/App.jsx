import React from 'react'
import { Route,Routes } from 'react-router-dom';
import Home from './pages/Home';
import CaptainLogin from "./pages/captainLogin";
import CaptainSignup from "./pages/captainSignup";
import UserLogin from "./pages/userLogin";
import UserSignup from "./pages/userSignup";

const App = () => {
  return (
    <div>
      <Routes>
         <Route path = "/" element= {<Home/>} />
         <Route path = "/CaptainLogin" element= {<CaptainLogin/>} />
          <Route path = "/CaptainSignup" element= {<CaptainSignup/>} />
          <Route path = "/UserLogin" element= {<UserLogin/>} />
          <Route path = "/UserSignup" element= {<UserSignup/>} />
      </Routes>
    </div>
  );
}

export default App