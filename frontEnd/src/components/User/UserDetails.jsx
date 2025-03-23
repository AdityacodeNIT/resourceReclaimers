import React, { useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/UserContext";

const UserDetails = () => {
  const { userDetail, setUserDetail } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const validateRefreshToken = async () => {
      if (!userDetail) {
        return; // Exit if user details are not available
      }

      try {
        // Validate the refresh token with the backend. If valid, the backend will return a new access token
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/v1/users/refresh-token`,
          {},
          { withCredentials: true } // Cookies contain the refresh token
        );

        // Update access token in context or storage if valid
        const { accessToken } = response.data;
        if (accessToken) {
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;
        }
      } catch (error) {
        setUserDetail(null);
        console.error("Error validating refresh token 12329hehf:", error);
      }
    };

    validateRefreshToken();
  }, [userDetail]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-800 to-indigo-900 flex flex-col md:flex-row">
      <div className="md:w-1/2 flex flex-col justify-center items-center bg-blue-500 p-4 md:p-0">
        {userDetail ? (
          <div key={userDetail.id} className="text-yellow-200 w-full max-w-lg">
            <div className="flex items-center space-x-4 mb-6 justify-center">
              <img
                className="w-24 h-24  b-2 bg-black object-cover rounded-full shadow-lg"
                src={userDetail.data.avatar || userDetail.data.user.avatar}
                alt="User avatar"
              />
              <div className="text-md font-semibold">
                {userDetail.data.username || userDetail.data.user.username}
              </div>
            </div>
            <div className="text-sm mb-4">
              <p>
                Name:{" "}
                {userDetail.data.fullName || userDetail.data.user.fullName}
              </p>
              <p>
                Email: {userDetail.data.email || userDetail.data.user.email}
              </p>
            </div>
            <div className="space-y-3">
              {userDetail.data.user.role == "custiomer" ? (
                <>
                  <Link
                    to="/Admin"
                    className="block py-2 bg-purple-800 px-2 hover:bg-indigo-500 transition text-center"
                  >
                    Admin Panel
                  </Link>
                  <Link
                    to="/helpdesk"
                    className="block py-2 bg-purple-800 px-2 hover:bg-red-500 transition text-center"
                  >
                    Helpdesk
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/cart"
                    className="block py-2 bg-purple-800 px-2 hover:bg-blue-500 transition text-center"
                  >
                    My Cart
                  </Link>
                  <Link
                    to="/myOrder"
                    className="block py-2 bg-purple-800 px-2 hover:bg-green-500 transition text-center"
                  >
                    My Orders
                  </Link>
                  <Link
                    to="/updateDetails"
                    className="block py-2 bg-purple-800 px-2 hover:bg-yellow-500 transition text-center"
                  >
                    Update Details
                  </Link>
                  <Link
                    to="/Wishlist"
                    className="block py-2 bg-purple-800 px-2 hover:bg-yellow-500 transition text-center"
                  >
                    Wishlist
                  </Link>

                  <Link
                    to="/seller"
                    className="block py-2 bg-purple-800 px-2 hover:bg-red-500 transition text-center"
                  >
                  Become A Seller
                  </Link>
                  <Link
                    to="/helpdesk"
                    className="block py-2 bg-purple-800 px-2 hover:bg-red-500 transition text-center"
                  >
                    Helpdesk
                  </Link>
                  <Link
                    to="/logOut"
                    className="block py-2 bg-purple-800 px-2 hover:bg-indigo-500 transition text-center"
                  >
                    LogOut
                  </Link>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center text-white">
            <h2 className="text-lg font-bold">You are not logged in</h2>
            <Link
              to="/userLogin"
              className="block py-2 mt-4 bg-purple-600 px-4 hover:bg-indigo-500 transition text-center text-white rounded"
            >
              Log In
            </Link>
          </div>
        )}
      </div>
      <div className="md:w-1/2 flex items-center justify-center p-6 md:p-0">
        <div className="text-white text-xl">
          Placeholder for future content or components.
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
