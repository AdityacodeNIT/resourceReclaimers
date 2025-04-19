import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import UserContext from "../../context/UserContext.jsx";
import Reminder from "../App/Reminder.jsx";

const ProductList = () => {
  const { childToParent } = useContext(UserContext);
  const [productsData, setProductsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/product/getProduct`
        );
        setProductsData(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        setError("Failed to load products. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r bg-green-50 to-bg-white">
      <Reminder />

      {/* Hero Banner */}
    

      {/* Product Grid */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Featured Products
        </h2>

        {isLoading ? (
          <p className="text-center text-gray-600 text-lg">Loading products..</p>
        ) : error ? (
          <p className="text-center text-red-500 text-lg">{error}</p>
        ) : productsData.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No products available.</p>
        ) : (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {productsData.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1"
                onClick={() => childToParent(product)}
              >
                <Link to="/About" className="block">
                  {/* Product Image */}
                  <div className="relative overflow-hidden h-64 bg-gray-100 rounded-t-xl">
                    <img
                      src={product.ProductImage}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {product.name}
                    </h3>
                    <p className="text-lg font-bold text-teal-600 mt-2">
                      ₹{product.price}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
