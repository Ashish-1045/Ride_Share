import React from 'react'
import { Route,Routes } from 'react-router-dom';
import Home from './pages/Home';
<<<<<<< HEAD
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
=======
import CaptainLogin from "./pages/captainLogin";
import CaptainSignup from "./pages/captainSignup";
import UserLogin from "./pages/userLogin";
import UserSignup from "./pages/userSignup";
>>>>>>> 514409827b9ebbbb970c5016f240658e39762552

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