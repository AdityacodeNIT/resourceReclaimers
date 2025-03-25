import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown, FaChevronUp, FaPlusCircle, FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";

const Seller = () => {
  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedProduct, setExpandedProduct] = useState(null);

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
      if(response){
      setAddress(response.data.data || null);
      console.log(response);
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  useEffect(() => {
    getAddress();
    getAllRefurbished();
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gradient-to-r from-blue-800 to-gray-500 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl flex gap-8">
        
        {/* Left Side - Product List */}
        <div className="w-2/3">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Refurbished Products</h2>

          {loading ? (
            <p className="text-gray-600">Loading products...</p>
          ) : products.length === 0 ? (
            <p className="text-gray-600">No refurbished products listed yet.</p>
          ) : (
            <div className="space-y-4">
              {products.map((product) => (
                <div key={product._id} className="flex items-center gap-4 border-b pb-4">
                  
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
                    <div className="flex justify-between items-center cursor-pointer" 
                         onClick={() => setExpandedProduct(expandedProduct === product._id ? null : product._id)}>
                      <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                      {expandedProduct === product._id ? <FaChevronUp /> : <FaChevronDown />}
                    </div>

                    <p className="text-sm font-bold text-gray-700">
                      EvaluatedPrice: <span className="text-green-600">
                        {product.evaluatedPrice && product.evaluatedPrice > 0 ? `₹${product.evaluatedPrice}` : "Evaluation in process"}
                      </span>
                    </p>

                    {expandedProduct === product._id && (
                      <div className="mt-2 text-left">
                        <p className="text-sm text-gray-600">{product.description}</p>
                        <p className="text-sm font-bold text-gray-700">
                          Status: <span className="text-blue-600">{product.evaluationStatus}</span>
                        </p>
                        <p className="text-sm text-gray-600">Condition: {product.sellerDeclaredCondition || "Not specified"}</p>
                        <p className="text-sm text-gray-600">Category: {product.category || "Not specified"}</p>
                        {product.originalPriceProof && (
                          <p className="text-sm text-gray-600">
                            Original Price Proof: <a href={product.originalPriceProof} className="text-blue-500 underline">View Proof</a>
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Side - Address & Add Product */}
        <div className="w-1/3">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold text-lg text-center">Your Address</h3>

            {address ? (
              <div className="mt-2 text-center">
                <FaMapMarkerAlt className="text-blue-600 text-xl mb-2" />
                <p>{address.firstName} {address.lastName}</p>
                <p>{address.streetAddress}, {address.city}, {address.state} - {address.postalCode}</p>
                <p>Phone: {address.phoneNumber}</p>
              </div>
            ) : (
              <div className="text-center mt-2">
                <p className="text-red-500 font-semibold">⚠️ Add an address before listing products.</p>
                <Link
                  to="/addressUpdate"
                  className="mt-2 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
                >
                  Add Address
                </Link>
              </div>
            )}
          </div>

          {address && (
            <Link
              to="/addrefurbished"
              className="mt-4 flex items-center justify-center gap-2 w-full py-2 text-white font-semibold rounded-lg bg-green-600 hover:bg-green-500 transition text-center"
            >
              <FaPlusCircle /> Add Product
            </Link>
          )}
        </div>

      </div>
    </div>
  );
};

export default Seller;
