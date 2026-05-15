/* eslint-disable no-unused-vars */
import React from 'react'
import { useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const CaptainDataContext = React.createContext();

const CaptainContext = ({children}) => {

    const [captain, setCaptain] = useState(null);
    const [isloading, setIsloading] = useState(false);
    const [error, setError] = useState(null);

    const updateCaptain = (captainData) => {
        setCaptain(captainData);
    };

    const value ={
        captain,
        setCaptain,
        isloading,
        setIsloading,
        error,
        setError,
        updateCaptain
    
    }
     
  return (
    <CaptainDataContext.Provider value={value}>
      {children}
    </CaptainDataContext.Provider>
  )
}

export default CaptainContext;