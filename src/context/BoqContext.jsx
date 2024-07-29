import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BoqContext = createContext();

export const useBoqContext = () => {
  return useContext(BoqContext);
};

const BoqContextProvider = ({ children }) => {
  // const navigate = useNavigate()
  const [allBoq, setAllBoq] = useState([]);
  const [error, setError] = useState(false);
  const [nameForGP_user_id, setNameForGP_user_id] = useState("");
  const [clientsIdWithName, setClientsIdWithName] = useState([]);
  const [boq, setBoq] = useState({
    Project_name: "",
    AEXP_BOQ_Creator: "",
    GP_user_id: "",
    BOQ: [],
    BOQ_ID: "",
  });

  const getGPUserId = (id) => {
    setBoq((prev) => ({ ...prev, GP_user_id: id }));
  };
  const generateRandomId = () => {
    const id = Math.random() * 1000;
    const idTxt = boq.Project_name.split(" ")[0].toUpperCase();
    // console.log(idTxt, Math.round(id));
    // const showId = (idTxt, Math.round(id))
    // console.log(showId)
    setBoq((prev) => ({ ...prev, BOQ_ID: `${idTxt}${Math.round(id)}` }));
  };
  // console.log(boq);
  const fetchUsersByName = (name) => {
    try {
      // console.log(name);
      if (name === "") {
        return;
      } else {
        axios
          .get(`/client-user/name/${name}`)
          .then((res) => setClientsIdWithName(res.data.data))
          .catch((err) => {
            throw err;
          });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // console.log(nameForGP_user_id);
    fetchUsersByName(nameForGP_user_id);
    if (nameForGP_user_id === "") {
      setClientsIdWithName([]);
    }
  }, [nameForGP_user_id]);
  // const user = useAuth();
  const handleFormInput = (e) => {
    if (e.target.name === "client_Name") {
      setNameForGP_user_id(e.target.value);
    } else if (e.target.name === "Project_name") {
      const idTxt = boq.Project_name.split(" ")[0].toUpperCase();
      // const aaa =idTxt, (e.target.value)
      setBoq((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
          BOQ_ID: idTxt,
        };
      });
    } else {
      setBoq((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
        };
      });
    }
  };
  const validateboq = () => {
    const { Project_name, AEXP_BOQ_Creator, GP_user_id, BOQ_ID } = boq;
    if (
      Project_name === "" ||
      AEXP_BOQ_Creator === "" ||
      GP_user_id === "" ||
      BOQ_ID === ""
    ) {
      // console.log("helo");
      setError(true);
      return false;
    } else {
      setError(false);
      return true;
    }
  };

 

  const fetchBoq = () => {
    axios
      .get("/boq/all-boq")
      .then((res) => setAllBoq(res.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchBoq();
  }, []);
  const value = {
    allBoq,
    boq,
    error,
    handleFormInput,
    fetchBoq,
    clientsIdWithName,
    nameForGP_user_id,
    generateRandomId,
    getGPUserId,
    validateboq,
  };
  return <BoqContext.Provider value={value}>{children}</BoqContext.Provider>;
};

export default BoqContextProvider;
