/* eslint-disable no-unused-vars */
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useContext } from 'react';
import axios from 'axios';
import { useState } from 'react';

const UserProtectedWrapper =({children}) => {
     

    const {user, setUser} = useContext(UserDataContext);
    const [isloading, setIsloading] = useState(true);

    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    useEffect(() => {
        if (!token) {
            navigate("/UserLogin");
        }       
    }, [token,navigate]);
    
    const response = axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/profile`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then(response =>{
        if(response.Status === 200){
            const data = response.data;
            setUser(response.data.user);
            setIsloading(false);
        }
    }).catch(error => {
        console.error("Error fetching user data:", error);
        setIsloading(false);
    });
    return (<>{children}</>)
};

export default UserProtectedWrapper