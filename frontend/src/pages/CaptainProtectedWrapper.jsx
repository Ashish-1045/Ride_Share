/* eslint-disable no-unused-vars */
import {CaptainDataContext}from "../context/CaptainContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import axios from "axios";
import { useState } from "react";

const CaptainProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const {captain, setCaptain} = useContext(CaptainDataContext);
  const [isloading, setIsloading] = useState(true);
  useEffect(() => {
    if (!token) {
      navigate("/CaptainLogin");
    }
  }, [token, navigate]);

 const response = axios.get(`${import.meta.env.VITE_BACKEND_URL}/captain/profile`,
  {
    headers:{
      Authorization:`Bearer ${token}`,
    }
  }).then(response =>{
    if(response.status === 200){
      const data = response.data;
      setCaptain(response.data.captain);
      setIsloading(false);
    }
  }).catch(error =>{
    console.error("Error fetching captain data:", error);
    localStorage.removeItem("token");
    navigate("/CaptainLogin");
  })
  if(isloading){
    return <div>Loading...</div>;
  };



  return <>{children}</>;
};

export default CaptainProtectedWrapper;