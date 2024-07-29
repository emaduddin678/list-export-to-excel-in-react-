import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const BoqContext = createContext();

export const useBoqContext = () => {
  return useContext(BoqContext);
};

const BoqContextProvider = ({ children }) => {
  const [allBoq, setAllBoq] = useState([]);
  const fetchBoq = () => {
    axios
      .get("/boq/all-boq")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchBoq();
  }, []);
  const value = {
    allBoq,
    fetchBoq,
  };
  return <BoqContext.Provider value={value}>{children}</BoqContext.Provider>;
};

export default BoqContextProvider;
