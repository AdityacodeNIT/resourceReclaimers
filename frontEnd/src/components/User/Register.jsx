import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";

const Register = () => {
  const navigate = useNavigate();
  const { getUserDetail } = useContext(UserContext);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    avatar: null,
    coverImage: null, // Add cover image state if needed
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("fullName", formData.fullName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("username", formData.username);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("avatar", formData.avatar);
    formDataToSend.append("coverImage", formData.coverImage); // Append cover image if needed

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/users/register`,
        formDataToSend,

        { withCredentials: true, credentials: "include" }
      );
      if (response.status >= 200 && response.status < 300) {
        navigate("/userLogin");
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row bg-gradient-to-r mt-2 from-blue-800 to-gray-500">
      {/* Left section - Register form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-4">
        <div className="w-full md:w-3/4 p-8 bg-purple-400 shadow-xl rounded-lg border border-white-300">
          <h1 className="text-3xl font-extrabold text-blue-600 text-center mb-6">
            Register
          </h1>
          <form onSubmit={handleFormSubmit} encType="multipart/form-data">
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              className="mb-4 p-2 w-full border-2 border-rose-400 rounded-md transition duration-200 bg-gray-600 focus:outline-none focus:border-blue-600"
            />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="mb-4 p-2 w-full border-2 border-rose-400 rounded-md transition duration-200 bg-gray-600 focus:outline-none focus:border-blue-600"
            />
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleInputChange}
              required
              className="mb-4 p-2 w-full border-2 border-rose-400 rounded-md transition duration-200 bg-gray-600  focus:outline-none focus:border-blue-600"
            />
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="mb-4 p-2 w-full border-2 border-rose-400 rounded-md transition duration-200 bg-gray-600 focus:outline-none focus:border-blue-600"
            />
            <input
              type="file"
              name="avatar"
              onChange={handleFileChange}
              required
              className="mb-4 p-2 w-full border-2 border-rose-400 rounded-md transition duration-200 bg-gray-600  focus:outline-none focus:border-blue-600"
            />
            {/* Add input for cover image if needed */}
            {/* <input type="file" name="coverImage" onChange={handleFileChange} /> */}
            <button
              type="submit"
              className="w-full p-3 bg-blue-600 text-white font-bold rounded-md transition duration-200 hover:bg-rose-700"
            >
              Register
            </button>
            <p className="mt-4 text-center">
              Already a user?{" "}
              <Link to="/userLogin" className="text-blue-400">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right section - Image */}
      <div className="hidden md:block md:w-1/2">
        <img
          src="/assets/design/register.jpeg" // Update with your image path
          alt="Register Page Illustration"
          className="w-full h-screen object-cover"
        />
      </div>
    </div>
  );
};

export default Register;
