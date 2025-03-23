import React, { useContext } from "react";
import axios from "axios";
import UserContext from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { getUserDetail } = useContext(UserContext);
  const navigate = useNavigate();

  const logoutUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/users/logout`,
        {},
        { withCredentials: true, credentials: "include" }
      );

      if (response.status === 200) {
        getUserDetail(null); // Clear user session
        navigate("/"); // Redirect to home page
      } else {
        alert("Unexpected response from server. Please try again.");
      }
    } catch (error) {
      console.error("Logout failed:", error.message);
      alert("Failed to logout. Please check your network.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="p-8 text-center">
        <h2 className="text-3xl font-bold text-red-500 mb-6">Logout</h2>
        <p className="text-gray-300 mb-6">
          Are you sure you want to log out? You will need to log in again to access your account.
        </p>

        <button
          className="text-lg bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          onClick={logoutUser}
        >
          Confirm Logout
        </button>
      </div>
    </div>
  );
};

export default Logout;
