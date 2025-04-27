// import React, { useContext, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import UserContext from "../../context/UserContext";

// const Userlogin = () => {
//   const { getUserDetail } = useContext(UserContext);
//   const [loginData, setLoginData] = useState({
//     username: "",
//     password: "",
//   });
//   const [errorMessage, setErrorMessage] = useState(""); // For storing error messages
  
//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     setLoginData({
//       ...loginData,
//       [e.target.name]: e.target.value,
//     });
//     setErrorMessage(""); // Clear error message on input change
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_API_URL}/api/v1/users/login`,
//         loginData,
//         {
//           withCredentials: true,
//         }
//       );

//       if (response.status >= 200 && response.status < 300) {
//         getUserDetail(response.data);
//         navigate("/user");
//       }
//     } catch (error) {
//       if (error.response) {
//         setErrorMessage(
//           error.response.data.message || "Invalid login credentials."
//         );
//       } else {
//         console.error("Issue in login", error);
//         setErrorMessage("An unexpected error occurred. Please try again.");
//       }
//     }
//   };

//   return (
//     <div className="h-screen flex flex-col md:flex-row bg-gradient-to-r from-green-300 to-green-100">
//       {/* Left section - Login form */}
//       <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-4">
//         <div className="w-full md:w-3/4 p-8 bg-green-200 shadow-xl rounded-lg border border-white">
//           <h1 className="text-3xl font-extrabold text-green-700 text-center mb-6">
//             Login
//           </h1>
//           <form onSubmit={handleFormSubmit} encType="multipart/form-data">
//             <div className="mb-4">
//               <input
//                 type="text"
//                 name="username"
//                 placeholder="Enter your username"
//                 value={loginData.username}
//                 onChange={handleInputChange}
//                 required
//                 className="p-2 w-full border-2 border-green-400 rounded-md transition duration-200 focus:outline-none bg-gray-100 focus:border-green-600"
//               />
//               {errorMessage && !loginData.username && (
//                 <p className="text-red-600 text-sm mt-1">{errorMessage}</p>
//               )}
//             </div>
//             <div className="mb-4">
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Enter your password"
//                 value={loginData.password}
//                 onChange={handleInputChange}
//                 required
//                 className="p-2 w-full border-2 border-green-400 rounded-md transition duration-200 focus:outline-none bg-gray-100 focus:border-green-600"
//               />
//               {errorMessage && loginData.username && (
//                 <p className="text-red-600 text-sm mt-1">{errorMessage}</p>
//               )}
//             </div>
//             <button
//               type="submit"
//               className="w-full p-3 bg-green-500 text-white font-bold rounded-md transition duration-200 hover:bg-green-400"
//             >
//               Login
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* Right section - Image */}
//       <div className="hidden md:block md:w-1/2">
//         <img
//           src="/assets/design/login.webp"
//           alt="Login Page Illustration"
//           className="w-full h-screen object-cover"
//         />
//       </div>
//     </div>
//   );
// };

// export default Userlogin;

import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";

const UserLogin = () => {
  const { getUserDetail } = useContext(UserContext);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // Store error messages
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
        { withCredentials: true }
      );

      if (response.status >= 200 && response.status < 300) {
        getUserDetail(response.data);
        navigate("/user");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Invalid login credentials."
      );
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-gray-200 text-center mb-6">
          Welcome Back
        </h1>

        <form onSubmit={handleFormSubmit} className="space-y-5">
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={loginData.username}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-gray-700 text-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:outline-none transition"
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
              className="w-full px-4 py-3 bg-gray-700 text-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:outline-none transition"
            />
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-gray-600 text-gray-200 font-semibold rounded-md hover:bg-gray-500 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-gray-400">
          Forgot password?{" "}
          <Link  to="/resetpass" className="text-gray-300 hover:underline">
            Reset here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
