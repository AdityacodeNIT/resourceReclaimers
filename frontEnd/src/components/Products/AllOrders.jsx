import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { GetOrderId } = useContext(UserContext);

  const fetchOrders = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/shiprocket/getOrder`,
        { withCredentials: true }
      );

      if (response && response.data.data.data) {
        setOrders(response.data.data.data);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      {/* Header Section */}
      <h2 className="text-3xl font-bold text-center mb-6">📦 Order History</h2>

      {/* Loading State */}
      {loading ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {[...Array(6)].map((_, idx) => (
            <div key={idx} className="bg-gray-800 animate-pulse p-6 rounded-lg shadow-lg h-40"></div>
          ))}
        </div>
      ) : error ? (
        /* Error State */
        <div className="flex flex-col items-center justify-center">
          <p className="text-red-500 text-lg font-semibold">{error}</p>
          <button
            onClick={fetchOrders}
            className="mt-4 px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-transform transform hover:scale-105"
          >
            Retry
          </button>
        </div>
      ) : orders.length > 0 ? (
        /* Order List */
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {orders.map((order) => (
            <Link to="/OrderItems" key={order.id}>
              <div
                className="bg-gray-800 rounded-lg shadow-lg p-6 transition-transform transform hover:-translate-y-2 hover:shadow-2xl border border-gray-700"
                onClick={() => GetOrderId(order.id)}
              >
                <h3 className="text-lg font-semibold text-green-400">
                  Order ID: {order.id}
                </h3>
                <p className="text-gray-300">
                  <strong>Customer:</strong> {order.customer_name}
                </p>
                <p className="text-gray-300">
                  <strong>Address:</strong> {order.customer_city}, {order.customer_state}
                </p>
                <p className="font-semibold">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm ${
                      order.status === "Delivered"
                        ? "bg-green-500 text-white"
                        : order.status === "Shipped"
                        ? "bg-blue-500 text-white"
                        : "bg-yellow-500 text-black"
                    }`}
                  >
                    {order.status}
                  </span>
                </p>
                <div className="mt-4">
                  <strong className="text-gray-400">Items:</strong>
                  {order.products?.length ? (
                    order.products.map((item, idx) => (
                      <span key={idx} className="block text-gray-300 text-sm">
                        {item.name} (x{item.quantity || 1}) - ₹{item.selling_price}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400">No items available</span>
                  )}
                </div>
                <p className="text-lg font-bold text-yellow-400 mt-3">
                  Total: ₹{order.total}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        /* No Orders Found */
        <div className="text-center">
          <p className="text-gray-400 text-lg">No orders found.</p>
        </div>
      )}
    </div>
  );
};

export default AllOrders;
