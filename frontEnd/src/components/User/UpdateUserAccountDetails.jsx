import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../context/UserContext";

const UpdateUserAccountDetails = () => {
  const { getUserDetail } = useContext(UserContext);
  const [updateData, setUpdatedata] = useState({
    fullName: "",
    email: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setUpdatedata({
      ...updateData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/users/updateUserdetail`,
        updateData,

        {
          withCredentials: true,
          credentials: "include",
        }
      );

      if (!response) {
        console.error("check the data it is unable to update");
      }
      if (response.status >= 200 && response.status < 300) {
        // document.cookie = `accessToken=${response.data.data.accessToken}; path=/`;
        getUserDetail(response.data);

        navigate("/user");
      }
    } catch (error) {
      console.error("Issue in updates", error);
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row bg-gradient-to-r from-pink-400 mt-2 to-purple-500">
      {/* Left section - Login form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-4">
        <div className="w-full md:w-3/4 p-8 bg-pink-300 shadow-xl rounded-lg border border-white">
          <h1 className="text-3xl font-extrabold text-blue-600 text-center mb-6">
            Update Details
          </h1>
          <form onSubmit={handleFormSubmit} encType="multipart/form-data">
            <input
              type="text"
              name="fullName"
              placeholder="Enter your fullName"
              value={updateData.fullName}
              onChange={handleInputChange}
              required
              className="mb-4 p-2 w-full border-2 border-rose-400 rounded-md transition duration-200 focus:outline-none bg-gray-600 focus:border-rose-600"
            />
            <input
              type="email"
              name="email"
              placeholder="Enter your new email"
              value={updateData.email}
              onChange={handleInputChange}
              required
              className="mb-4 p-2 w-full border-2 border-rose-400 rounded-md transition duration-200 focus:outline-none bg-gray-600 focus:border-rose-600"
            />
            <button
              type="submit"
              className="w-full p-3 bg-blue-800 text-white font-bold rounded-md transition duration-200 hover:bg-rose-600"
            >
              Login
            </button>
          </form>
        </div>
      </div>

      {/* Right section - Image */}
      <div className="hidden md:block md:w-1/2">
        <img
          src="/assets/design/login.jpeg"
          alt="Login Page Illustration"
          className="w-full h-screen object-cover"
        />
      </div>
    </div>
  );
};

export default UpdateUserAccountDetails;
