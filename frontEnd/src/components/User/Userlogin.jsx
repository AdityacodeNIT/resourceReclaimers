import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";

const Userlogin = () => {
  const { getUserDetail } = useContext(UserContext);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // For storing error messages
  
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
    setErrorMessage(""); // Clear error message on input change
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/users/login`,
        loginData,
        {
          withCredentials: true,
        }
      );

      if (response.status >= 200 && response.status < 300) {
        getUserDetail(response.data);
        navigate("/user");
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(
          error.response.data.message || "Invalid login credentials."
        );
      } else {
        console.error("Issue in login", error);
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row bg-gradient-to-r from-green-300 to-green-100 mt-2">
      {/* Left section - Login form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-4">
        <div className="w-full md:w-3/4 p-8 bg-green-200 shadow-xl rounded-lg border border-white">
          <h1 className="text-3xl font-extrabold text-green-700 text-center mb-6">
            Login
          </h1>
          <form onSubmit={handleFormSubmit} encType="multipart/form-data">
            <div className="mb-4">
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={loginData.username}
                onChange={handleInputChange}
                required
                className="p-2 w-full border-2 border-green-400 rounded-md transition duration-200 focus:outline-none bg-gray-100 focus:border-green-600"
              />
              {errorMessage && !loginData.username && (
                <p className="text-red-600 text-sm mt-1">{errorMessage}</p>
              )}
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={loginData.password}
                onChange={handleInputChange}
                required
                className="p-2 w-full border-2 border-green-400 rounded-md transition duration-200 focus:outline-none bg-gray-100 focus:border-green-600"
              />
              {errorMessage && loginData.username && (
                <p className="text-red-600 text-sm mt-1">{errorMessage}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-green-500 text-white font-bold rounded-md transition duration-200 hover:bg-green-400"
            >
              Login
            </button>
          </form>
        </div>
      </div>

      {/* Right section - Image */}
      <div className="hidden md:block md:w-1/2">
        <img
          src="/assets/design/login.webp"
          alt="Login Page Illustration"
          className="w-full h-screen object-cover"
        />
      </div>
    </div>
  );
};

export default Userlogin;