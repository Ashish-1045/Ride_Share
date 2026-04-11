
import { Route,Routes } from 'react-router-dom';
import Start from './pages/Start';
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import Home from './pages/Home';



const App = () => {
//  const ans = UserDataContext();
//  console.log(ans)
  return (
    <div>
      <Routes>
        <Route path = "/" element= {<Start/>} />
         <Route path = "/Home" element= {<Home/>} />
         <Route path = "/CaptainLogin" element= {<CaptainLogin/>} />
          <Route path = "/CaptainSignup" element= {<CaptainSignup/>} />
          <Route path = "/UserLogin" element= {<UserLogin/>} />
          <Route path = "/UserSignup" element= {<UserSignup/>} />
      </Routes>
    </div>
  );
}

export default App