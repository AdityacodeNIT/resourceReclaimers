import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminProductReview = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/products/pending").then((res) => setProducts(res.data));
  }, []);

  const updateProduct = async (id, status, price) => {
    await axios.put(`/api/products/${id}`, { evaluationStatus: status, evaluatedPrice: price });
    setProducts(products.filter((p) => p._id !== id));
  };

  return (
    <div className="p-8 bg-green-200 min-h-screen">
      <h2 className="text-2xl font-bold text-center">Admin Product Review</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {products.map((product) => (
          <div key={product._id} className="bg-white p-4 shadow rounded relative">
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-gray-700 font-semibold">Condition: {product.sellerDeclaredCondition}</p>
            <p className="text-gray-700 font-semibold">Category: {product.category}</p>
            <p className="text-gray-700 font-semibold">Proof: <a href={product.originalPriceProof} target="_blank" className="text-blue-600 underline">View Proof</a></p>
            
            {/* Product Images Preview */}
            <div className="flex gap-2 mt-2">
              {product.productImages && product.productImages.map((img, index) => (
                <img key={index} src={img} alt="Product" className="w-16 h-16 object-cover border rounded" />
              ))}
            </div>
            
            <input type="number" placeholder="Evaluated Price" id={`price-${product._id}`} className="p-2 border w-full mt-2" />
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => updateProduct(product._id, "Completed", document.getElementById(`price-${product._id}`).value)}
                className="p-2 bg-blue-500 text-white w-1/2 rounded"
              >
                Approve
              </button>
              <button
                onClick={() => updateProduct(product._id, "Rejected", 0)}
                className="p-2 bg-red-500 text-white w-1/2 rounded"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProductReview;
