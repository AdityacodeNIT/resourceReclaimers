import React, { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const UserUpdateDetails = () => {
  const { getUserDetail } = useContext(UserContext);
  const [UpdateData, setUpdateData] = useState({
    fullName: "",
    email: "",
  });

  const navigate = useNavigate(); // intializing use navigate method

  const handleInputChange = (e) => {
    setUpdateData({
      ...UpdateData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/users/updateUserdetail`,
        UpdateData,
        {
          withCredentials: true,
          credentials: "include",
        }
      );

      if (!response) {
        console.error("Unable to Update");
        // Handle the case where response is not received
      }

      if (response.status >= 200 && response.status < 300) {
        navigate("/user");

        // Navigate the user to the home page
      }
      getUserDetail(response.data);
    } catch (error) {
      console.error("Issue in updating user details", error);
      // Handle the error
    }
  };
  return (
    <div>
      <form onSubmit={handleFormSubmit} encType="multipart/form-data">
        <div className="w-auto mx-24 mt-16  ">
          <input
            type="text"
            name="fullName"
            placeholder="Enter your fullname"
            value={UpdateData.fullName}
            onChange={handleInputChange}
            required
            className=" mt-3 border-2 border-rose-700  text-lg w-full p-3 rounded-md"
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={UpdateData.email}
            onChange={handleInputChange}
            required
            className=" mt-3 border-2 border-pink-700  text-lg  w-full p-3 rounded-md"
          />

          <button
            type="submit"
            className="m-2 border-2 p-2 ml-auto bg-rose-400 rounded-md  font-semibold  align-middle"
          >
            Update{" "}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserUpdateDetails;
