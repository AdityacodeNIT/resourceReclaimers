import React, { useEffect, useState, useContext } from "react";
import UserContext from "../../context/UserContext";
import axios from "axios";
import { Link } from "react-router-dom";
import Categories from "../Products/Categories";

const Writing = () => {
  const { childToParent } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProductDetail = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/product/WritingProduct`
      );
      if (response) {
        setProducts(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductDetail();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section (Cyan & Blue Glow) */}
      <section className="relative w-full h-[40vh] flex flex-col items-center justify-center text-center bg-gradient-to-r from-cyan-600 to-blue-500 shadow-xl rounded-b-lg px-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow-md">
          ✍️ Elevate Your Writing Experience
        </h1>
        <p className="mt-3 text-lg sm:text-xl max-w-2xl text-gray-200">
          Explore premium writing tools crafted for precision & creativity.
        </p>
        <Link
          to="/products"
          className="mt-5 bg-white text-cyan-600 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-gray-200 transition-transform transform hover:scale-105"
        >
          Browse Collection
        </Link>

        {/* Floating Glow Effects */}
        <div className="absolute top-6 left-12 w-16 h-16 bg-blue-400 opacity-20 blur-2xl rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-12 w-24 h-24 bg-cyan-400 opacity-30 blur-2xl rounded-full animate-pulse"></div>
      </section>

      {/* Categories Section */}
      <Categories />

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <p className="text-xl font-semibold text-gray-300 animate-pulse">Loading products...</p>
        </div>
      ) : (
        /* Product Grid */
        <div className="container mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-cyan-400">
            🖊️ Premium Writing Tools
          </h2>

          <div className="grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {products.map((product) => (
              <div
                key={product._id}
                className="relative bg-gray-900 rounded-xl shadow-lg border border-gray-700 transition-transform duration-300 transform hover:-translate-y-2 hover:scale-105 hover:shadow-2xl"
                onClick={() => childToParent(product)}
              >
                <Link to="/About">
                  {/* Product Image */}
                  <div className="relative overflow-hidden bg-gray-800 rounded-t-xl h-56 flex items-center justify-center">
                    <img
                      src={product.ProductImage}
                      alt={product.name}
                      className="w-4/5 h-auto object-contain transition-transform duration-500 ease-in-out transform hover:scale-110"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="p-4 text-center">
                    <h3 className="text-white font-semibold text-lg truncate">
                      {product.name}
                    </h3>
                    <p className="text-cyan-400 font-bold text-lg mt-2">
                      ₹{product.price}
                    </p>
                  </div>
                </Link>

                {/* Floating Neon Glow */}
                <div className="absolute -top-2 -left-2 w-10 h-10 bg-cyan-500 opacity-30 blur-lg rounded-full animate-ping"></div>
                <div className="absolute -bottom-2 -right-2 w-14 h-14 bg-blue-500 opacity-30 blur-lg rounded-full animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Newsletter Section */}
      <div className="relative py-14 px-6 bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white text-center rounded-t-3xl shadow-lg">
        <h2 className="text-3xl font-extrabold text-cyan-400">📩 Stay Updated</h2>
        <p className="mt-4 text-lg">Subscribe to our newsletter for exclusive deals & new arrivals.</p>
        <div className="mt-6 flex justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-3 rounded-l-lg w-72 text-black focus:outline-none shadow-md"
          />
          <button className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-r-lg font-semibold transition-transform transform hover:scale-105 shadow-md">
            Subscribe
          </button>
        </div>

        {/* Floating Glow Effects */}
        <div className="absolute top-5 left-10 w-14 h-14 bg-cyan-500 opacity-20 blur-2xl rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-20 h-20 bg-blue-500 opacity-30 blur-2xl rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default Writing;
