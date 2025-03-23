import React, { useContext } from "react";
import UserContext from "../../context/UserContext.jsx"; // Import context
import { Link } from "react-router-dom";

const SearchResult = () => {
  const { searchResult, childToParent } = useContext(UserContext); // Access the search result from context

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6">
      {/* Title Section */}
      <div className="text-center py-10">
        <h1 className="text-4xl font-extrabold text-violet-400">🔍 Search Results</h1>
        <p className="text-lg text-gray-400 mt-2">Find the best stationery & office products.</p>
      </div>

      {/* Search Results */}
      {searchResult.length > 0 ? (
        <div className="container mx-auto px-6 py-6 grid gap-8 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {searchResult.map((product) => (
            <Link to="/About" key={product._id}>
              <div
                className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-4 transition-transform transform hover:-translate-y-2 hover:scale-105 hover:shadow-2xl"
                onClick={() => childToParent(product)}
              >
                {/* Product Image */}
                <div className="relative overflow-hidden bg-gray-700 rounded-md flex items-center justify-center h-52">
                  <img
                    src={product.ProductImage}
                    alt={product.name}
                    className="w-4/5 h-auto object-contain transition-transform duration-500 ease-in-out transform hover:scale-110"
                  />
                </div>

                {/* Product Details */}
                <div className="mt-4 text-center">
                  <h2 className="text-lg font-semibold text-white truncate">{product.name}</h2>
                  <p className="text-green-400 font-bold text-lg mt-2">₹{product.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 text-lg mt-10">
          ❌ No results found. Try searching for something else.
        </p>
      )}

      {/* Floating Aesthetic Effects */}
      <div className="absolute top-10 left-10 w-16 h-16 bg-violet-500 opacity-20 blur-2xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-24 h-24 bg-indigo-500 opacity-30 blur-2xl rounded-full animate-pulse"></div>
    </div>
  );
};

export default SearchResult;
