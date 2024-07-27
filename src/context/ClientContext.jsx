import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ClientContext = createContext();

export const useClientContext = () => {
  return useContext(ClientContext);
};

const ClientContextProvider = ({ children }) => {
  const [createClientModal, setCreateClientModal] = useState(false);
  const [clientData, setClientData] = useState([]);

  const fetchUsers = () => {
    try {
      axios
        .get("https://boq.xri.com.bd/v1/client-user/all-user")
        .then((res) => setClientData(res.data.data.data))
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  // console.log(projectInfo);

  const handleDelete = (id) => {
    try {
      axios
        .delete(`https://boq.xri.com.bd/v1/client-user/delete/${id}`)
        .then((res) => {
          if (res.status === 200) {
            fetchUsers();
          }
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      console.log(error);
    }
  };

  // This is for client Pop up or modal page => start

  const handleOpenClient = () => {
    // console.log("this is calling from client management");
    setCreateClientModal(true); 
    fetchUsers();
  };

  const handleCloseClient = () => {
    fetchUsers();
    setCreateClientModal(false);
  };

  // This is for client Pop up or modal page => end

  const value = {
    createClientModal,
    handleOpenClient,
    handleCloseClient,

    clientData,
    handleDelete,
    fetchUsers,
  };
  return (
    <ClientContext.Provider value={value}>{children}</ClientContext.Provider>
  );
};

export default ClientContextProvider;
