import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";

const Seller = () => {
  const { sellerDetail } = useContext(UserContext);

  return (

      <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-800 to-gray-500">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Become a Seller</h2>
        <p className="text-gray-600 mt-2">
          Start selling on our platform and reach thousands of customers!
        </p>

        <div className="mt-6 space-y-4">
          {!sellerDetail ? (
            <>
              <Link
                to="/sellerRegister"
                className="block w-full py-2 bg-purple-800 text-white font-semibold rounded-lg hover:bg-purple-600 transition"
              >
                Sign Up
              </Link>
              <Link
                to="/sellerLogin"
                className="block w-full py-2 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-600 transition"
              >
                Login
              </Link>
            </>
          ) : (
            <div className="text-left bg-gray-100 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900">
                Welcome, {sellerDetail.data.user.fullName}!
              </h3>
              <p className="text-gray-700">📧 {sellerDetail.data.user.email}</p>
              <p className="text-gray-700">👤 {sellerDetail.data.user.username}</p>
              
              {sellerDetail.data.user.approved ? (
                <Link
                  to="/addProduct"
                  className="mt-4 block w-full py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-500 transition text-center"
                >
                  Add Product
                </Link>
              ) : (
                <p className="mt-4 text-red-600 font-semibold">
                  Your seller account is not approved yet.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Seller;
