import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ import useNavigate
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import UserContext from "../../context/UserContext.jsx";

const SearchBar = () => {
  const { handleSearch } = useContext(UserContext);
  const [query, setQuery] = useState("");
  const navigate = useNavigate(); 

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const executeSearch = async () => {
    if (query.trim()) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/v1/product/searchProduct`,
          { name: query }
        );
        handleSearch(response.data);
        navigate("/searchResult"); // ✅ Navigate after search
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      executeSearch();
    }
  };

  return (
    <div className="flex items-center bg-white rounded-lg shadow-lg px-2 py-1 w-70 lg:w-96">
      <button className="text-gray-600 hover:text-blue-600 transition duration-300 ml-3">
        <FontAwesomeIcon icon={faSearch} className="text-xl" />
      </button>

      <input
        type="text"
        name="search"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search for products..."
        className="bg-transparent w-full px-4 py-2 focus:outline-none text-gray-700 font-medium"
      />

      <button
        onClick={executeSearch}
        className="text-gray-600 hover:text-blue-600 transition duration-300 ml-3 mr-4"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
