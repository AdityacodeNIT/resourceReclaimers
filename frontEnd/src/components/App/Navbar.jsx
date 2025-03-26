import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import UserContext from "../../context/UserContext";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const { userDetail } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar w-full bg-gradient-to-r from-green-900 to-green-700 text-white shadow-lg px-6 h-20">
      <div className="flex items-center justify-between w-full h-full">
        {/* Logo */}
        <div className="text-2xl lg:text-3xl font-bold italic tracking-wide">
          <span className="bg-gradient-to-r from-lime-400 to-green-300 text-transparent bg-clip-text">
            Resource<span className="text-4xl font-semibold">R</span>eclaimers
          </span>
        </div>

        {/* Mobile Menu Button */}
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
          } md:flex flex-col md:flex-row items-center absolute md:static top-20 left-0 w-full md:w-auto bg-green-900 md:bg-transparent md:space-x-8 p-4 md:p-0 z-50 transition-all duration-300`}
        >
          <ul className="flex flex-col md:flex-row w-full md:w-auto items-center space-y-4 md:space-y-0">
            <li className="mx-3 text-md lg:text-lg font-medium hover:text-lime-300 transition duration-200">
              <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            </li>
            <li className="mx-3 text-md lg:text-lg font-medium hover:text-lime-300 transition duration-200">
              <Link to="/aboutus" onClick={() => setMenuOpen(false)}>About Us</Link>
            </li>
          </ul>

          {/* Sell Products Link */}
          <div>
            <Link to="/seller" className="text-white text-lg font-medium hover:text-lime-300 transition duration-200">
              Sell Your Products
            </Link>
          </div>

          {/* Search Bar */}
          <div className="w-full md:w-auto">
            <SearchBar />
          </div>
        </div>

        

        {/* Cart and User Section */}
        <div className="flex items-center space-x-4">
          {/* Shopping Cart */}
          <Link to="/cart" className="text-white bg-lime-800 hover:bg-lime-500 text-lg p-2 rounded-lg transition duration-300">
            <FontAwesomeIcon icon={faShoppingCart} />
          </Link>

          {/* User Avatar or Login/Register */}
          {userDetail?.data?.user ? (
            <Link to="/user">
              <img
                className="w-12 h-12 rounded-full border-2 border-white hover:border-lime-500 transition duration-300"
                src={userDetail.data.avatar || userDetail.data.user.avatar}
                alt="User Avatar"
              />
            </Link>
          ) : (
            <Link to="/register">
              <button className="text-lime-400 text-md font-semibold px-4 py-2 border border-lime-400 rounded-md hover:bg-lime-400 hover:text-gray-900 transition duration-300">
                Login / Register
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


// import React, { useState, useContext } from "react";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faShoppingCart, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
// import UserContext from "../../context/UserContext";
// import SearchBar from "./SearchBar";

// const Navbar = () => {
//   const { userDetail } = useContext(UserContext);
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <nav className="navbar w-full bg-gray-900 text-white shadow-md px-6 h-20">
//       <div className="flex items-center justify-between w-full h-full">
        
//         {/* Logo */}
//         <div className="text-2xl lg:text-3xl font-bold italic tracking-wide">
//           <span className="bg-gradient-to-r from-gray-400 to-gray-200 text-transparent bg-clip-text">
//             Resource<span className="text-4xl font-semibold">R</span>eclaimers
//           </span>
//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           className="md:hidden text-white text-2xl focus:outline-none"
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
//         </button>

//         {/* Navigation Links */}
//         <div
//           className={`${
//             menuOpen ? "flex" : "hidden"
//           } md:flex flex-col md:flex-row items-center absolute md:static top-20 left-0 w-full md:w-auto bg-gray-800 md:bg-transparent md:space-x-8 p-4 md:p-0 z-50 transition-all duration-300`}
//         >
//           <ul className="flex flex-col md:flex-row w-full md:w-auto items-center space-y-4 md:space-y-0">
//             <li className="mx-3 text-md lg:text-lg font-medium hover:text-gray-400 transition duration-200">
//               <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
//             </li>
//             <li className="mx-3 text-md lg:text-lg font-medium hover:text-gray-400 transition duration-200">
//               <Link to="/aboutus" onClick={() => setMenuOpen(false)}>About Us</Link>
//             </li>
//           </ul>

//           {/* Sell Products Link */}
//           <div>
//             <Link to="/seller" className="text-white text-lg font-medium hover:text-gray-400 transition duration-200">
//               Sell Your Products
//             </Link>
//           </div>

//           {/* Search Bar */}
//           <div className="w-full md:w-auto">
//             <SearchBar />
//           </div>
//         </div>

//         {/* Cart and User Section */}
//         <div className="flex items-center space-x-4">
          
//           {/* Shopping Cart */}
//           <Link to="/cart" className="text-white bg-gray-700 hover:bg-gray-500 text-lg p-2 rounded-lg transition duration-300">
//             <FontAwesomeIcon icon={faShoppingCart} />
//           </Link>

//           {/* User Avatar or Login/Register */}
//           {userDetail?.data?.user ? (
//             <Link to="/user">
//               <img
//                 className="w-12 h-12 rounded-full border-2 border-white hover:border-gray-500 transition duration-300"
//                 src={userDetail.data.avatar || userDetail.data.user.avatar}
//                 alt="User Avatar"
//               />
//             </Link>
//           ) : (
//             <Link to="/register">
//               <button className="text-gray-300 text-md font-semibold px-4 py-2 border border-gray-400 rounded-md hover:bg-gray-600 hover:text-white transition duration-300">
//                 Login / Register
//               </button>
//             </Link>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
