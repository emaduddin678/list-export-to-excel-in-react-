import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CreateBoqPopUp = ({handleCloseBOQ}) => {
  const [error, setError] = useState(false);
  const [projectInfo, setProjectInfo] = useState({
    projectTitle: "",
    userName: "",
    clientName: "",
    ariaCircle: "",
  });
  const user = useAuth();
  const navigate = useNavigate();
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
  return (
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
              {/* {console.log(handleCloseBOQ)} */}
              <button
                onClick={() => handleCloseBOQ()}
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

            <form onSubmit={hanleFormSubmit} className="p-4 md:p-5 bg-black ">
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
  );
};

export default CreateBoqPopUp;
