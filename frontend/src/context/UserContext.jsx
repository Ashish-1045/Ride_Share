/* eslint-disable react-refresh/only-export-components */


import React, { createContext, useState } from "react";
export const UserDataContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState({
    fullName: {
      firstname: "",
      lastname: "",
    },
    email: "",
    isLoggedIn: false,
  });

  return (
    <UserDataContext.Provider value={{ user, setUser }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;