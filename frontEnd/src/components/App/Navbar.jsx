import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import UserContext from "../../context/UserContext";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const { userDetail } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar w-full text-white bg-gradient-to-r from-gray-900 to-blue-700 h-20 px-6 shadow-md">
      <div className="flex w-full items-center justify-between h-full">
        {/* Logo */}
        <div className="text-yellow-400 text-2xl lg:text-3xl font-bold">
          Parmarth E-Com
        </div>

        {/* Hamburger Menu for Mobile */}
        <button
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            menuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row items-center absolute md:static top-20 left-0 w-full md:w-auto bg-gray-900 md:bg-transparent md:space-x-8 p-4 md:p-0 z-50 transition-all duration-300`}
        >
          <ul className="flex flex-col md:flex-row w-full md:w-auto items-center space-y-4 md:space-y-0">
            <li className="mx-3 text-md lg:text-lg font-semibold hover:text-yellow-300 transition-colors duration-200">
              <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            </li>
            <li className="mx-3 text-md lg:text-lg font-semibold hover:text-yellow-300 transition-colors duration-200">
              <Link to="/Aboutus" onClick={() => setMenuOpen(false)}>About Us</Link>
            </li>
          </ul>

          {/* Search Bar */}
          <div className="w-full md:w-auto">
            <SearchBar />
          </div>
        </div>

        {/* Cart and User Section */}
        <div className="flex items-center space-x-4">
          <button className="text-white bg-yellow-900 hover:bg-yellow-500 text-lg p-2 rounded-lg transition-colors duration-300">
            <Link to="/cart">
              <FontAwesomeIcon icon={faShoppingCart} />
            </Link>
          </button>

          {userDetail && userDetail.data && userDetail.data.user ? (
            <Link to="/user">
              <img
                className="w-14 h-14 rounded-full border-4 border-yellow-50 hover:border-yellow-600 transition-colors duration-300"
                src={userDetail.data.avatar || userDetail.data.user.avatar}
                alt="User Avatar"
              />
            </Link>
          ) : (
            <button className="text-yellow-400 text-md font-bold px-4 py-2 border border-yellow-400 rounded-md hover:bg-yellow-400 hover:text-gray-900 transition-colors duration-300">
              <Link to="/register">Login/Register</Link>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;