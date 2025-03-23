import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/users/changePassword`,
        {
          currentPassword,
          newPassword,
          confirmPassword,
        },
        {
          withCredentials: true,
        }
      );
      setMessage(response.data.message || "Password changed successfully");
      if (response) {
        navigate("/user");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Error changing password");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
        Change Password
      </h2>
      <form onSubmit={handleChangePassword} className="flex flex-col">
        <label className="mb-2 text-gray-600">
          Current Password:
          <input
            type="password"
            value={currentPassword}
            name="currentpassword"
            placeholder="Enter currrent password"
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label className="mb-2 text-gray-600">
          New Password:
          <input
            type="password"
            value={newPassword}
            name="password"
            placeholder="Enter currrent password"
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label className="mb-2 text-gray-600">
          Confirm New Password:
          <input
            type="password"
            value={confirmPassword}
            name="password"
            placeholder="Enter currrent password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <button
          type="submit"
          className="w-full mt-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Change Password
        </button>
      </form>
      {message && <p className="mt-4 text-center text-green-600">{message}</p>}
    </div>
  );
};

export default ChangePassword;
