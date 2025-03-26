import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown, FaChevronUp, FaPlusCircle, FaMapMarkerAlt, FaEdit } from "react-icons/fa";
import axios from "axios";

const Seller = () => {
  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedProduct, setExpandedProduct] = useState(null);

  useEffect(() => {
    const getAllRefurbished = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/refurbished/getProduct`,
          { withCredentials: true }
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    const getAddress = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/address/getAddress`,
          { withCredentials: true }
        );
        setAddress(response.data.data || null);
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };

    getAddress();
    getAllRefurbished();
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center p-6 bg-gray-50">
      <div className="w-full max-w-6xl grid md:grid-cols-3 gap-6">
        
        {/* Left - Product List */}
        <div className="md:col-span-2 bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Refurbished Products</h2>

          {loading ? (
            <p className="text-gray-600">Loading products...</p>
          ) : products.length === 0 ? (
            <p className="text-gray-600">No refurbished products listed yet.</p>
          ) : (
            <div className="space-y-4">
              {products.map((product) => (
                <div key={product._id} className="bg-gray-100 rounded-lg p-4 flex items-center gap-4 shadow-md">
                  
                  {/* Product Image */}
                  {product.productImages.length > 0 && (
                    <img
                      src={product.productImages[0]}
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded-lg border"
                    />
                  )}

                  {/* Product Details */}
                  <div className="w-full">
                    <div 
                      className="flex justify-between items-center cursor-pointer hover:text-blue-500 transition"
                      onClick={() => setExpandedProduct(expandedProduct === product._id ? null : product._id)}
                    >
                      <h3 className="text-lg font-semibold">{product.name}</h3>
                      {expandedProduct === product._id ? <FaChevronUp /> : <FaChevronDown />}
                    </div>

                    <p className="text-sm font-bold text-gray-700">
                      Evaluated Price: <span className="text-green-600">
                        {product.evaluatedPrice && product.evaluatedPrice > 0 ? `₹${product.evaluatedPrice}` : "Evaluation in process"}
                      </span>
                    </p>

                    {expandedProduct === product._id && (
                      <div className="mt-3 space-y-2 text-sm text-gray-700">
                        <p>{product.description}</p>
                        <p><span className="font-semibold">Status:</span> <span className="text-blue-600">{product.evaluationStatus}</span></p>
                        <p><span className="font-semibold">Condition:</span> {product.sellerDeclaredCondition || "Not specified"}</p>
                        <p><span className="font-semibold">Category:</span> {product.category || "Not specified"}</p>
                        {product.originalPriceProof && (
                          <p>
                            <span className="font-semibold">Original Price Proof:</span> 
                            <a href={product.originalPriceProof} className="text-blue-500 underline ml-1">View Proof</a>
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add Product Button - Now inside the Refurbished Products Section */}
          {address && (
            <Link
              to="/addrefurbished"
              className="mt-6 w-full py-3 flex items-center justify-center gap-2 text-white font-semibold rounded-lg bg-green-600 hover:bg-green-500 transition"
            >
              <FaPlusCircle /> Add Product
            </Link>
          )}
        </div>

        {/* Right - Address Section */}
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col gap-4">
          {/* Address Section */}
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <div className="flex items-center justify-center gap-2">
              <h3 className="text-lg font-semibold">Your Address</h3>
              <FaMapMarkerAlt className="text-blue-600 text-xl" />
            </div>

            {address ? (
              <div className="mt-2 text-gray-700">
                <p>{address.firstName} {address.lastName}</p>
                <p>{address.streetAddress}, {address.city}, {address.state} - {address.postalCode}</p>
                <p>📞 {address.phoneNumber}</p>
              </div>
            ) : (
              <div className="text-red-500 font-semibold mt-2">
                <p>⚠️ Add an address before listing products.</p>
              </div>
            )}
          </div>

          {/* Update Address Button */}
          <Link
            to="/addressUpdate"
            className="w-full py-3 flex items-center justify-center gap-2 text-white font-semibold rounded-lg bg-gray-700 hover:bg-gray-800 transition"
          >
            <FaEdit /> Update Address
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Seller;
