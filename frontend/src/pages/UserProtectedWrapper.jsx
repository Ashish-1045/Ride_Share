import React,{useContext} from 'react';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const UserProtectedWrapper =({children}) => {
  
    const {user} = useContext(UserDataContext);
    const navigate = useNavigate();
    if(!user.email){
        return navigate("/login");
    }
    return (<>{children}</>)
};

export default UserProtectedWrapper