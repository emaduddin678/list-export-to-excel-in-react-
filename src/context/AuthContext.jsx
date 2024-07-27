import React, { useContext, useEffect, useState } from "react";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// const user = useAuth();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(false);
  // const [createClientModal, setCreateClientModal] = useState(false);



  // login function
  function login(msg) {
    if (msg === "Login Successful") {
      setCurrentUser(true);
      return true;
    } else {
      return false;
    }
  }

  //logout function
  function logout() {
    setCurrentUser(false);
  }

  const value = {
    currentUser,
    login,
    logout,
   
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
