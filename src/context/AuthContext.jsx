import React, { useContext, useEffect, useState } from "react";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// const user = useAuth();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(false);

  // login function
  function login(email, password) {
    if (
      import.meta.env.VITE_USER_EMAIL === email &&
      import.meta.env.VITE_USER_PASSWORD === password
    ) {
      setCurrentUser(true);
      return "success";
    } else {
      return "failed";
    }
  }

  //logout function
  function logout() {
    setCurrentUser(false)
  }

  const value = {
    currentUser,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
