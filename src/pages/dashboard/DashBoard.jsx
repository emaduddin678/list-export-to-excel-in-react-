import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const DashBoard = () => {
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(false);
  const [projectInfo, setProjectInfo] = useState({
    projectTitle: "",
    userName: "",
    clientName: "",
    ariaCircle: "",
  });
  const user = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    // Set initial mode based on localStorage
    const mode = localStorage.getItem("mode") || "light";
    if (mode === "dark") {
      document.body.classList.add("dark");
    }
    // const getStatus = localStorage.getItem("status") || "close";
    // if (getStatus === "close") {
    //   document.getElementById("navId").classList.toggle("close");
    // }
  }, []);

  const handleModeToggle = () => {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
      localStorage.setItem("mode", "dark");
    } else {
      localStorage.setItem("mode", "light");
    }
  };
  const handleSidebarToggle = () => {
    document.getElementById("navId").classList.toggle("close");
    if (document.getElementById("navId").classList.contains("close")) {
      localStorage.setItem("status", "close");
    } else {
      localStorage.setItem("status", "open");
    }
  };

  const handleCreateBOQ = () => {
    setModal(true);
  };
  const handleFormInput = (e) => {
    setProjectInfo((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const validateProjectInfo = () => {
    const { projectTitle, userName, clientName, ariaCircle } = projectInfo;
    if (
      projectTitle === "" ||
      userName === "" ||
      clientName === "" ||
      ariaCircle === ""
    ) {
      console.log("helo");
      setError(true);
      return false;
    }
    setError(false);
    return true;
  };
  const hanleFormSubmit = (e) => {
    e.preventDefault();
    if (validateProjectInfo()) {
      // Proceed with form submission or other logic
      navigate("createboq");
      console.log("Form is valid. Submitting...");
    } else {
      console.log("Form is invalid. Please fill out all fields.");
    }
  };

  const handleLogout = () => {
    user.logout();
  };
  console.log(projectInfo);

  return (
    <div className={`${modal && "relative h-screen overflow-hidden"}`}>
      {modal && (
        <div
          className={`z-20 opacity-1 transition-all delay-300 bg-gray-900 absolute inset-0 flex justify-center items-center`}
        >
          <div className=" bg-black ">
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-black rounded-lg shadow ">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                  <h3 className="text-lg font-semibold text-white ">
                    Create New Product
                  </h3>
                  <button
                    onClick={() => setModal(false)}
                    type="button"
                    className="bg-transparent hover:bg-gray-200  text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  "
                    data-modal-toggle="crud-modal"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>

                <form
                  onSubmit={hanleFormSubmit}
                  className="p-4 md:p-5 bg-black "
                >
                  <div className="grid gap-4 mb-4 grid-cols-2 bg-black ">
                    <div className="col-span-2 bg-black ">
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-white "
                      >
                        BOQ Title
                      </label>
                      <input
                        type="text"
                        name="projectTitle"
                        onChange={handleFormInput}
                        value={projectInfo.projectTitle}
                        id="name"
                        className={`${
                          projectInfo.projectTitle !== "" && error
                            ? "bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            : "border-2 border-red-500 bg-gray-50 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        }`}
                        placeholder="Type project name..."
                        required=""
                      />
                    </div>
                    <div className="col-span-2 bg-black ">
                      <label
                        htmlFor="pName"
                        className="block mb-2 text-sm font-medium text-white "
                      >
                        Provider user name
                      </label>
                      <input
                        type="text"
                        name="userName"
                        onChange={handleFormInput}
                        value={projectInfo.userName}
                        id="pName"
                        className={`${
                          projectInfo.userName !== "" && error
                            ? "bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            : "border-2 border-red-500 bg-gray-50 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        }`}
                        placeholder="Type provider user name..."
                        required=""
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="client Name"
                        className="block mb-2 text-sm font-medium  text-white "
                      >
                        Client Name
                      </label>
                      {console.log(error)}
                      <input
                        type="text"
                        name="clientName"
                        onChange={handleFormInput}
                        value={projectInfo.clientName}
                        id="client Name"
                        className={`${
                          projectInfo.clientName !== "" && error
                            ? "bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            : "border-2 border-red-500 bg-gray-50 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        }`}
                        placeholder="Enter name..."
                        required=""
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="ariaCircle"
                        className="block mb-2 text-sm font-medium  text-white "
                      >
                        Aria Circle
                      </label>
                      <select
                        id="ariaCircle"
                        name="ariaCircle"
                        onChange={handleFormInput}
                        value={projectInfo.ariaCircle}
                        className={`${
                          projectInfo.ariaCircle !== "" && error
                            ? "cursor-pointer bg-gray-50 border border-gray-300  text-gray-800 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                            : " border-2 border-red-500 bg-gray-50 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 cursor-pointer focus:ring-primary-500 focus:border-primary-500 "
                        }`}
                        // className="cursor-pointer bg-gray-50 border border-gray-300  text-gray-800 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                      >
                        <option defaultValue="">Select Aria Circle</option>
                        <option value="dhaka">Dhaka</option>
                        <option value="chattogram">Chattogram</option>
                        <option value="sylhet">Sylhet</option>
                        <option value="khulna">Khulna</option>
                        <option value="barishal">Barishal</option>
                        <option value="rangpur">Rangpur</option>
                        <option value="mymensingh">Mymensingh</option>
                      </select>
                    </div>

                    {/* <div className="col-span-2">
                      <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium  text-white "
                      >
                        Product Description
                      </label>
                      <textarea
                        id="description"
                        rows="4"
                        className="block p-2.5 w-full text-sm  text-white bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Write product description here"
                      ></textarea>
                    </div> */}
                  </div>
                  <button
                    onClick={hanleFormSubmit}
                    type="submit"
                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  >
                    <svg
                      className="me-1 -ms-1 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Add new product
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      <nav id="navId">
        <div className="logo-name">
          <div className="logo-image">
            <img src="/brand-logo.png" alt="" />
          </div>
          <span className="logo_name">ASIATIC EXP</span>
        </div>
        <div className="menu-items">
          <ul className="nav-links">
            <li>
              <div style={{ cursor: "pointer" }}>
                <svg
                  width="24"
                  fill="#707070"
                  data-name="Livello 1"
                  id="Livello_1"
                  strokeWidth="2"
                  viewBox="0 0 128 128"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M127.12,60.22,115.46,48.56h0L69,2.05a7,7,0,0,0-9.9,0L12.57,48.53h0L.88,60.22a3,3,0,0,0,4.24,4.24l6.57-6.57V121a7,7,0,0,0,7,7H46a7,7,0,0,0,7-7V81a1,1,0,0,1,1-1H74a1,1,0,0,1,1,1v40a7,7,0,0,0,7,7h27.34a7,7,0,0,0,7-7V57.92l6.54,6.54a3,3,0,0,0,4.24-4.24ZM110.34,121a1,1,0,0,1-1,1H82a1,1,0,0,1-1-1V81a7,7,0,0,0-7-7H54a7,7,0,0,0-7,7v40a1,1,0,0,1-1,1H18.69a1,1,0,0,1-1-1V51.9L63.29,6.29a1,1,0,0,1,1.41,0l45.63,45.63Z" />
                </svg>
                <Link to={"/dashboard"} className="link-name">
                  Dashboard
                </Link>
              </div>
            </li>
            <li>
              <div style={{ cursor: "pointer" }}>
                <svg
                  fill="#707070"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13,3 L5,3 L5,21 L15,21 L15,23 L5,23 C3.8954305,23 3,22.1045695 3,21 L3,3 C3,1.8954305 3.8954305,1 5,1 L15.4142136,1 L21,6.58578644 L21,14 L19,14 L19,9 L15,9 C13.8954305,9 13,8.1045695 13,7 L13,3 Z M19,19 L19,17 L21,17 L21,19 L23,19 L23,21 L21,21 L21,23 L19,23 L19,21 L17,21 L17,19 L19,19 Z M18.5857864,7 L15,3.41421356 L15,7 L18.5857864,7 Z"
                    fillRule="evenodd"
                  />
                </svg>
                <button onClick={handleCreateBOQ} className="link-name">
                  Create BOQ
                </button>
              </div>
            </li>
            <li>
              <div style={{ cursor: "pointer" }}>
                <svg
                  fill="#707070"
                  width="24"
                  height="24"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M504 255.531c.253 136.64-111.18 248.372-247.82 248.468-59.015.042-113.223-20.53-155.822-54.911-11.077-8.94-11.905-25.541-1.839-35.607l11.267-11.267c8.609-8.609 22.353-9.551 31.891-1.984C173.062 425.135 212.781 440 256 440c101.705 0 184-82.311 184-184 0-101.705-82.311-184-184-184-48.814 0-93.149 18.969-126.068 49.932l50.754 50.754c10.08 10.08 2.941 27.314-11.313 27.314H24c-8.837 0-16-7.163-16-16V38.627c0-14.254 17.234-21.393 27.314-11.314l49.372 49.372C129.209 34.136 189.552 8 256 8c136.81 0 247.747 110.78 248 247.531zm-180.912 78.784l9.823-12.63c8.138-10.463 6.253-25.542-4.21-33.679L288 256.349V152c0-13.255-10.745-24-24-24h-16c-13.255 0-24 10.745-24 24v135.651l65.409 50.874c10.463 8.137 25.541 6.253 33.679-4.21z" />
                </svg>
                <span className="link-name">History</span>
              </div>
            </li>
          </ul>

          <ul className="logout-mode">
            <li>
              <div onClick={handleLogout} style={{ cursor: "pointer" }}>
                <svg
                  fill="#707070"
                  //   height="20"
                  viewBox="0 0 20 20"
                  width="28"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    d="M3 3C2.44772 3 2 3.44772 2 4V16C2 16.5523 2.44772 17 3 17C3.55228 17 4 16.5523 4 16V4C4 3.44772 3.55228 3 3 3ZM13.2929 12.2929C12.9024 12.6834 12.9024 13.3166 13.2929 13.7071C13.6834 14.0976 14.3166 14.0976 14.7071 13.7071L17.7071 10.7071C17.8946 10.5196 18 10.2652 18 10C18 9.73478 17.8946 9.48043 17.7071 9.29289L14.7071 6.29289C14.3166 5.90237 13.6834 5.90237 13.2929 6.29289C12.9024 6.68342 12.9024 7.31658 13.2929 7.70711L14.5858 9L7 9C6.44771 9 6 9.44772 6 10C6 10.5523 6.44772 11 7 11H14.5858L13.2929 12.2929Z"
                    fill="#707070"
                    fillRule="evenodd"
                  />
                </svg>

                <span className="link-name">Logout</span>
              </div>
            </li>
            <li className="mode">
              <div style={{ cursor: "pointer" }}>
                <svg
                  className="moonIcon"
                  fill="#707070"
                  width="24"
                  data-name="Layer 2"
                  id="Layer_2"
                  viewBox="0 0 35 35"
                  strokeWidth="2"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18.44,34.68a18.22,18.22,0,0,1-2.94-.24,18.18,18.18,0,0,1-15-20.86A18.06,18.06,0,0,1,9.59.63,2.42,2.42,0,0,1,12.2.79a2.39,2.39,0,0,1,1,2.41L11.9,3.1l1.23.22A15.66,15.66,0,0,0,23.34,21h0a15.82,15.82,0,0,0,8.47.53A2.44,2.44,0,0,1,34.47,25,18.18,18.18,0,0,1,18.44,34.68ZM10.67,2.89a15.67,15.67,0,0,0-5,22.77A15.66,15.66,0,0,0,32.18,24a18.49,18.49,0,0,1-9.65-.64A18.18,18.18,0,0,1,10.67,2.89Z" />
                </svg>
                <span className="link-name">Dark Mode</span>
              </div>
              <div className="mode-toggle" onClick={handleModeToggle}>
                <span className="switch"></span>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <section className="dashboard">
        <div className="top">
          <svg
            onClick={handleSidebarToggle}
            style={{ cursor: "pointer" }}
            fill="none"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6H20M4 12H12M4 18H20"
              stroke="#4A5568"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
          {/* <i className="uil uil-bars "></i> */}
          <div className="search-box">
            <svg
              height="24px"
              id="Layer_1"
              //   style="enable-background:new 0 0 512 512;"
              version="1.1"
              viewBox="0 0 512 512"
              //   width="512px"
              xmlSpace="preserve"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <path d="M448.3,424.7L335,311.3c20.8-26,33.3-59.1,33.3-95.1c0-84.1-68.1-152.2-152-152.2c-84,0-152,68.2-152,152.2  s68.1,152.2,152,152.2c36.2,0,69.4-12.7,95.5-33.8L425,448L448.3,424.7z M120.1,312.6c-25.7-25.7-39.8-59.9-39.8-96.3  s14.2-70.6,39.8-96.3S180,80,216.3,80c36.3,0,70.5,14.2,96.2,39.9s39.8,59.9,39.8,96.3s-14.2,70.6-39.8,96.3  c-25.7,25.7-59.9,39.9-96.2,39.9C180,352.5,145.8,338.3,120.1,312.6z" />
            </svg>
            <input type="text" placeholder="Search here..." />
          </div>
          <img
            className="round"
            src="https://randomuser.me/api/portraits/women/79.jpg"
            alt="user"
          />
        </div>
        <div className="dash-content">
          <div className="overview">
            <div className="title">
              <i className="uil uil-tachometer-fast-alt"></i>
              <span className="text">Dashboard</span>
            </div>
            <div className="boxes">
              <div className="box box1">
                <i className="uil uil-thumbs-up"></i>
                <span className="text">Total Projects</span>
                <span className="number">512</span>
              </div>
              <div className="box box2">
                <i className="uil uil-comments"></i>
                <span className="text">Comments</span>
                <span className="number">20,120</span>
              </div>
              <div className="box box3">
                <i className="uil uil-share"></i>
                <span className="text">Total Share</span>
                <span className="number">10,120</span>
              </div>
            </div>
          </div>
          <div className="activity">
            <div className="title">
              <i className="uil uil-clock-three"></i>
              <span className="text">Recent Activity</span>
            </div>
            <div className="activity-data">
              <div className="data names">
                <span className="data-title">Name</span>
                <span className="data-list">project name</span>
                <span className="data-list">project name</span>
                <span className="data-list">project name</span>
                <span className="data-list">project name</span>
                <span className="data-list">project name</span>
                <span className="data-list">project name</span>
                <span className="data-list">project name</span>
              </div>
              <div className="data email">
                <span className="data-title">Email</span>
                <span className="data-list">projectname@gmail.com</span>
                <span className="data-list">projectname@gmail.com</span>
                <span className="data-list">projectname@gmail.com</span>
                <span className="data-list">projectname@gmail.com</span>
                <span className="data-list">projectname@gmail.com</span>
                <span className="data-list">projectname@gmail.com</span>
                <span className="data-list">projectname@gmail.com</span>
              </div>
              <div className="data joined">
                <span className="data-title">Joined</span>
                <span className="data-list">2022-02-12</span>
                <span className="data-list">2022-02-12</span>
                <span className="data-list">2022-02-13</span>
                <span className="data-list">2022-02-13</span>
                <span className="data-list">2022-02-14</span>
                <span className="data-list">2022-02-14</span>
                <span className="data-list">2022-02-15</span>
              </div>
              <div className="data type">
                <span className="data-title">Type</span>
                <span className="data-list">New</span>
                <span className="data-list">Member</span>
                <span className="data-list">Member</span>
                <span className="data-list">New</span>
                <span className="data-list">Member</span>
                <span className="data-list">New</span>
                <span className="data-list">Member</span>
              </div>
              <div className="data status">
                <span className="data-title">Status</span>
                <span className="data-list">Liked</span>
                <span className="data-list">Liked</span>
                <span className="data-list">Liked</span>
                <span className="data-list">Liked</span>
                <span className="data-list">Liked</span>
                <span className="data-list">Liked</span>
                <span className="data-list">Liked</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashBoard;
