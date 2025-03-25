import React, { useEffect, useState } from "react";
import axios from "axios";

const RefurbishedProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [expandedImage, setExpandedImage] = useState(null);

  // State for evaluation update
  const [evaluatedPrice, setEvaluatedPrice] = useState("");
  const [evaluationStatus, setEvaluationStatus] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/refurbished/getAllProducts`,
          { withCredentials: true }
        );
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const toggleExpand = (product) => {
    setExpandedProduct(expandedProduct === product._id ? null : product._id);
    setEvaluatedPrice(product.evaluatedPrice || "");
    setEvaluationStatus(product.evaluationStatus || "Pending");
  };

  const handleUpdateProduct = async (productId) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/refurbished/updateProduct/${productId}`,
        { evaluatedPrice, evaluationStatus },
        { withCredentials: true }
      );

      setProducts((prev) =>
        prev.map((p) =>
          p._id === productId ? { ...p, evaluatedPrice, evaluationStatus } : p
        )
      );

      alert("Product updated successfully!");
    } catch (error) {
      alert("Error updating product: " + error.message);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Refurbished Products</h1>
      <table className="w-full border-collapse bg-white shadow-lg rounded-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 border">Product Name</th>
            <th className="p-3 border">Original Price</th>
            <th className="p-3 border">Evaluated Price</th>
            <th className="p-3 border">Category</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <React.Fragment key={product._id}>
              <tr
                className="hover:bg-gray-100 cursor-pointer"
                onClick={() => toggleExpand(product)}
              >
                <td className="p-3 border">{product.name}</td>
                <td className="p-3 border">₹{product.price || "N/A"}</td>
                <td className="p-3 border">₹{product.evaluatedPrice || "Not Evaluated"}</td>
                <td className="p-3 border">{product.category}</td>
                <td className="p-3 border text-blue-500 underline text-center">
                  {expandedProduct === product._id ? "Hide Details" : "View Details"}
                </td>
              </tr>

              {expandedProduct === product._id && (
                <tr>
                  <td colSpan="5" className="p-4 border bg-gray-50">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-semibold">Images:</h3>
                        <div className="flex space-x-2">
                          {product.productImages.map((img, index) => (
                            <img
                              key={index}
                              src={img}
                              alt="Product"
                              className="w-24 h-24 object-cover rounded-md cursor-pointer hover:scale-105 transition"
                              onClick={() => setExpandedImage(img)}
                            />
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold">Pickup Location:</h3>
                        <p>{product.pickupLocation[0]?.streetAddress}, {product.pickupLocation[0]?.city}</p>
                        <p>{product.pickupLocation[0]?.state}, {product.pickupLocation[0]?.country}</p>
                        <p>Postal Code: {product.pickupLocation[0]?.postalCode}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold">Seller Contact:</h3>
                        <p>{product.sellerContact}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold">Condition:</h3>
                        <p>{product.sellerDeclaredCondition}</p>
                        <h3 className="font-semibold mt-2">Evaluation Status:</h3>
                        <p>{product.evaluationStatus}</p>
                        {product.originalPriceProof && (
                          <>
                            <h3 className="font-semibold mt-2">Original Price Proof:</h3>
                            <img src={product.originalPriceProof} alt="Original Price Proof" className="w-24 h-24 object-cover rounded-md" />
                          </>
                        )}
                      </div>
                      <div className="col-span-2">
                        <h3 className="font-semibold">Update Evaluation</h3>
                        <div className="flex flex-col space-y-2">
                          <input
                            type="number"
                            placeholder="Enter Evaluated Price"
                            value={evaluatedPrice}
                            onChange={(e) => setEvaluatedPrice(e.target.value)}
                            className="border p-2 rounded"
                          />
                          <select
                            value={evaluationStatus}
                            onChange={(e) => setEvaluationStatus(e.target.value)}
                            className="border p-2 rounded"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Under Review">Under Review</option>
                            <option value="Completed">Completed</option>
                          </select>
                          <button
                            onClick={() => handleUpdateProduct(product._id)}
                            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                          >
                            {product.evaluationStatus === "Completed" ? "Re-Evaluate" : "Update Evaluation"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RefurbishedProduct;
