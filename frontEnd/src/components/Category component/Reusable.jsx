import React, { useEffect, useState, useContext } from "react";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";
import Categories from "../Products/Categories";
import axios from "axios";

const Reusable = () => {
  const { childToParent } = useContext(UserContext);
  const [products, setProducts] = useState([]);

  const getProductDetail = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/product/ReusableProduct`
      );
      if (response) {
        setProducts(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  useEffect(() => {
    getProductDetail();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Hero Section (Nature-Inspired) */}
      <section className="relative w-full h-[40vh] flex flex-col items-center justify-center text-center bg-gradient-to-r from-green-600 to-teal-500 shadow-lg rounded-b-md">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Sustainable & Reusable Stationery 🌿
        </h1>
        <p className="mt-2 text-md sm:text-lg text-gray-200 max-w-xl">
          Eco-friendly products crafted from recycled materials to help the planet.
        </p>
        <Link
          to="/shop"
          className="mt-4 bg-white text-green-700 py-2 px-6 rounded-full shadow-md hover:bg-gray-200 transition-transform transform hover:scale-105"
        >
          Browse Eco Products
        </Link>

        {/* Floating Leaf Animations */}
        <div className="absolute top-5 left-10 w-16 h-16 bg-green-400 opacity-20 blur-2xl rounded-full animate-bounce"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-teal-500 opacity-30 blur-2xl rounded-full animate-pulse"></div>
      </section>

      {/* Categories Section */}
      <Categories />

      {/* Product Grid */}
      <div className="container mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-200">
          Shop Sustainable Essentials ♻️
        </h2>
        <div className="grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-gray-900 rounded-xl shadow-lg border border-green-700 transition-transform duration-300 transform hover:-translate-y-2 hover:scale-105 hover:shadow-2xl"
              onClick={() => childToParent(product)}
            >
              <Link to="/About" className="block">
                <div className="relative overflow-hidden h-56 bg-gray-700 rounded-t-xl flex items-center justify-center">
                  <img
                    src={product.ProductImage}
                    alt={product.name}
                    className="w-4/5 h-auto object-contain transition-transform duration-500 ease-in-out transform hover:scale-110"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-white font-semibold text-lg truncate">
                    {product.name}
                  </h3>
                  <p className="text-green-400 font-bold text-lg mt-2">
                    ₹{product.price}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="relative py-14 px-6 bg-gray-900 text-white text-center rounded-t-3xl shadow-lg">
        <h2 className="text-3xl font-extrabold">🌱 Join the Green Movement</h2>
        <p className="mt-4 text-lg">Subscribe to get updates on new eco-friendly stationery.</p>
        <div className="mt-6 flex justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-3 rounded-l-lg w-72 text-black focus:outline-none shadow-md"
          />
          <button className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-r-lg font-semibold transition-transform transform hover:scale-105 shadow-md">
            Subscribe
          </button>
        </div>

        {/* Floating Leaf Effects */}
        <div className="absolute top-5 left-10 w-14 h-14 bg-green-500 opacity-20 blur-2xl rounded-full animate-bounce"></div>
        <div className="absolute bottom-10 right-10 w-20 h-20 bg-teal-500 opacity-30 blur-2xl rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default Reusable;
