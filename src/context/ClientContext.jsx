import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ClientContext = createContext();

export function useClientContext() {
  return useContext(ClientContext);
}

const ClientContextProvider = ({ children }) => {
  const [createClientModal, setCreateClientModal] = useState(false);
  const [clientData, setClientData] = useState([]);
  const [prevClientData, setPrevClientData] = useState({
    client_name: "",
    designation: "",
    department: "",
    circle: "",
    contact_number: "",
    email_id: "",
  });
  // console.log("🚀 ~ ClientContextProvider ~ prevClientData:", prevClientData);

  const fetchUsers = () => {
    try {
      axios
        .get("/client-user/all-user")
        .then((res) => setClientData(res.data.data.data))
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsersByName = (name) => {
    try {
      console.log(name);
      if (name === "") {
        fetchUsers();
      } else {
        axios
          .get(`/client-user/name/${name}`)
          .then((res) => setClientData(res.data.data))
          .catch((err) => {
            throw err;
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsersById = (id) => {
    console.log(id);
    try {
      if (id === "") {
        fetchUsers();
      } else {
        axios
          .get(`client-user/find/${id}`)
          .then((res) => {
            // console.log(res)
            if (res.data.status) {
              setClientData([res.data.data]);
            }
          })
          .catch((err) => {
            throw err;
          });
      }
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

  const handleOpenUpdateClient = (info) => {
    // console.log("🚀 ~ handleUpdateClient ~ info:", info);
    setPrevClientData(info);
    setCreateClientModal(true);
    // fetchUsers();
  };

  const handleCloseClient = () => {
    setPrevClientData({
      client_name: "",
      designation: "",
      department: "",
      circle: "",
      contact_number: "",
      email_id: "",
    });
    fetchUsers();
    setCreateClientModal(false);
  };

  // This is for client Pop up or modal page => end

  const value = {
    createClientModal,
    handleOpenClient,
    handleCloseClient,

    clientData,
    prevClientData,
    handleDelete,
    fetchUsers,
    fetchUsersByName,
    fetchUsersById,
    handleOpenUpdateClient,
  };
  return (
    <ClientContext.Provider value={value}>{children}</ClientContext.Provider>
  );
};

export default ClientContextProvider;
