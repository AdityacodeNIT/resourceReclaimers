import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import UserContext from "../../context/UserContext.jsx";
import Categories from "./Categories.jsx";
import Reminder from "../App/Reminder.jsx";

const ProductList = () => {
  const { childToParent } = useContext(UserContext);
  const [productsData, setProductsData] = useState([]);

  const getProductDetail = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/product/getProduct`
      );
      if (response) {
        setProductsData(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  useEffect(() => {
    getProductDetail();
  }, []);

  return (

    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300">
      <Reminder />

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-white mb-3">
            Discover Amazing Products
          </h1>
          <p className="text-lg text-gray-100 max-w-2xl mx-auto">
            Explore our exclusive collection of top-notch products curated just
            for you.
          </p>
          <button className="mt-8 bg-white text-indigo-600 py-3 px-8 rounded-full shadow-lg hover:bg-gray-200 transition">
            Browse All
          </button>
        </div>
      </section>

      <div
        className="bg-cover bg-center w-full h-auto"
        style={{ backgroundImage: 'url("/src/assets/design/d.jpg")' }}
      >
        {/* Product Grid */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {productsData.map((product) => (
              <div
                key={product._id}
                className="relative bg-gradient-to-br from-pink-200 via-gray-100 to-gray-200 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1"
                onClick={() => childToParent(product)}
              >
                <Link to="/About" style={{ textDecoration: "none" }}>
                  <div className="relative overflow-hidden h-80 bg-gray-100 rounded-t-lg object-contain">
                    <img
                      src={product.ProductImage}
                      alt={product.name}
                      className="w-full h-full object-contain transition-transform duration-300 ease-in-out transform hover:scale-110"
                    />
                    <div className="absolute top-0 left-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent w-full h-full opacity-60"></div>
                    <div className="absolute bottom-0 left-0 p-4 text-white font-bold text-lg">
                      {product.name}
                    </div>
                  </div>
                  <div className="p-4 text-center">
                    <p className="text-teal-600 font-bold text-lg mt-2">
                      ₹{product.price}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
