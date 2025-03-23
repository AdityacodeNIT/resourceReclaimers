import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";

const SellerLogin = () => {
  const { getSellerDetail } = useContext(UserContext);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
    setErrorMessage(""); 
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/seller/login`,
        loginData,
        {
          withCredentials: true,
        }
      );

      if (response.status >= 200 && response.status < 300) {
        getSellerDetail(response.data);
        navigate("/seller");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Invalid login credentials."
      );
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-500">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-96 text-center border border-gray-300">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Seller Login</h1>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={loginData.username}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          {errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}
          <button
            type="submit"
            className="w-full p-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default SellerLogin;
