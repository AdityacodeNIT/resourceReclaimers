import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";

const UpdateAvatar = () => {
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();
  const { getUserDetail } = useContext(UserContext);

  // Handle File Selection
  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]); // Ensure we store the actual file
  };

  // Handle Form Submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!avatar) {
      console.error("No file selected!");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("avatar", avatar); // Correctly append the file

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/users/updateAvatar`,
        formDataToSend,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data", // Important for file uploads
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        console.log("Avatar updated successfully:", response.data);
        getUserDetail(); // Refresh user data
        navigate("/user");
      } else {
        console.error("Failed to update avatar:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating avatar:", error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} encType="multipart/form-data" className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-lg">
      <input
        type="file"
        name="avatar"
        accept="image/*"
        onChange={handleFileChange}
        required
        className="mb-4 p-2 w-full border-2 border-blue-500 rounded-md bg-gray-700 text-white focus:outline-none focus:border-blue-400"
      />

      <button
        type="submit"
        className="w-full p-3 bg-blue-600 text-white font-bold rounded-md transition duration-200 hover:bg-blue-700"
      >
        Change Avatar
      </button>
    </form>
  );
};

export default UpdateAvatar;
