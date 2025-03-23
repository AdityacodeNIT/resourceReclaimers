import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const Categories = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-black">
      <nav className="flex justify-between items-center h-16 px-6 border-b-4 border-teal-400 text-lg bg-gradient-to-r from-teal-700 via-gray-900 to-black lg:font-semibold text-white shadow-lg">
        {/* Title */}
        <div className="font-extrabold text-xl text-teal-300">📂 Categories</div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
        </button>

        {/* Category Links */}
        <div
          className={`${
            menuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row absolute md:static top-16 left-0 w-full md:w-auto bg-gray-900 md:bg-transparent z-50 md:space-x-6 text-center md:text-left`}
        >
          {[
            { name: "Writing Instruments", path: "/WritingInstruments" },
            { name: "Paper Products", path: "/PaperProducts" },
            { name: "Desk Supplies", path: "/DeskSupplies" },
            { name: "Filing & Storage", path: "/Filing&Storage" },
            { name: "Reusable Products", path: "/ReusableProducts" },
          ].map((category, index) => (
            <div
              key={index}
              className="p-3 transition-all bg-transparent hover:bg-teal-500 hover:text-yellow-600 rounded-lg cursor-pointer shadow-md"
            >
              <Link to={category.path} onClick={() => setMenuOpen(false)}>
                {category.name}
              </Link>
            </div>
          ))}
        </div>
      </nav>

      {/* Floating Glow Effects (Subtle Aesthetic) */}
      <div className="absolute top-5 left-10 w-14 h-14 bg-teal-500 opacity-20 blur-2xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-20 h-20 bg-emerald-500 opacity-30 blur-2xl rounded-full animate-pulse"></div>
    </div>
  );
};

export default Categories;
