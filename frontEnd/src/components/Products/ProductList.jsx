import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import UserContext from "../../context/UserContext.jsx";

import Reminder from "../App/Reminder.jsx";

const ProductList = () => {
  const { childToParent } = useContext(UserContext);
  const [productsData, setProductsData] = useState([]);

  const getProductDetail = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/product/getProduct`
      );
      console.log("API Response:", response.data); // Debugging
  
      // Ensure productsData is always an array
      setProductsData(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Failed to fetch products", error);
      setProductsData([]); // Ensure it's an empty array even on error
    }
  };

  useEffect(() => {
    getProductDetail();
  }, []);

  return (

    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300">
      <Reminder />

      {/* Hero Banner */}
     

      <div
        className="bg-cover bg-center w-full h-auto"
        style={{ backgroundImage: 'url("/src/assets/design/d.jpg")' }}
      >
        {/* Product Grid */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {productsData&& productsData.map((product) => (
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
