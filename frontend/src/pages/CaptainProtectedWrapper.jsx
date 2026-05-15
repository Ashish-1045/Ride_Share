/* eslint-disable no-unused-vars */
import {CaptainDataContext}from "../context/CaptainContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";


const CaptainProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const {captain, setCaptain} = useContext(CaptainDataContext);
  useEffect(() => {
    if (!token) {
      navigate("/CaptainLogin");
    }
  });

  return <>{children}</>;
};

export default CaptainProtectedWrapper;