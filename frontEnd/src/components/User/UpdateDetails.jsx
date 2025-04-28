import React from "react";
import { Link } from "react-router-dom";
import { FaUserEdit, FaLock, FaCamera } from "react-icons/fa"; // Importing icons

const UpdateDetails = () => {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 min-h-screen flex flex-col justify-center items-center py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-12">
        Update Your Account Details
      </h1>

      <div className="bg-blue-100 shadow-xl rounded-lg p-6 w-full max-w-md flex flex-col space-y-6">
        
        {/* Update Details Link */}
        <Link to="/changeDetails" className="w-full">
          <div className="font-semibold text-lg md:text-xl flex items-center justify-center py-4 bg-indigo-700 text-white rounded-md hover:bg-indigo-700 transition ease-in-out transform hover:scale-105">
            <FaUserEdit className="mr-3 text-xl" />
            <span>Update Details</span>
          </div>
        </Link>

        {/* Change Password Link */}
        <Link to="/changePassword" className="w-full">
          <div className="font-semibold text-lg md:text-xl flex items-center justify-center py-4 bg-green-700 text-white rounded-md hover:bg-green-700 transition ease-in-out transform hover:scale-105">
            <FaLock className="mr-3 text-xl" />
            <span>Change Password</span>
          </div>
        </Link>

        {/* Update Avatar Link */}
        <Link to="/updateAvatar" className="w-full">
          <div className="font-semibold text-lg md:text-xl flex items-center justify-center py-4 bg-blue-700 text-white rounded-md hover:bg-blue-700 transition ease-in-out transform hover:scale-105">
            <FaCamera className="mr-3 text-xl" />
            <span>Update Avatar</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default UpdateDetails;
