/* eslint-disable no-unused-vars */
import { CaptainDataContext } from "../context/CaptainContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import axios from "axios";

const CaptainProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { setCaptain } = useContext(CaptainDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/CaptainLogin");
      return;
    }
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setCaptain(response.data.captain); 
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching captain data:", error);
        localStorage.removeItem("token");
        navigate("/CaptainLogin");
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default CaptainProtectedWrapper;
