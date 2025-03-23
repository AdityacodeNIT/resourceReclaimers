import React, { useEffect, useState } from "react";
import axios from "axios";

const Orderlist = () => {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/shiprocket/getOrder`,
          { withCredentials: true }
        );
        setOrderData(response.data.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchOrderData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Order List</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-800">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="border border-gray-600 px-4 py-2">Order ID</th>
              <th className="border border-gray-600 px-4 py-2">Customer</th>
              <th className="border border-gray-600 px-4 py-2">Address</th>
              <th className="border border-gray-600 px-4 py-2">Status</th>
              <th className="border border-gray-600 px-4 py-2">Items</th>
              <th className="border border-gray-600 px-4 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {orderData.map((order) => (
              <tr key={order.id} className="bg-gray-200 hover:bg-gray-300">
                <td className="border border-gray-600 px-4 py-2">{order.id}</td>
                <td className="border border-gray-600 px-4 py-2">{order.customer_name}</td>
                <td className="border border-gray-600 px-4 py-2">
                  {order.customer_city}, {order.customer_state}
                </td>
                <td className="border border-gray-600 px-4 py-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm text-white ${
                      order.status === "Delivered"
                        ? "bg-green-500"
                        : order.status === "Shipped"
                        ? "bg-blue-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="border border-gray-600 px-4 py-2">
                  {order.products?.length ? (
                    <ul>
                      {order.products.map((item, idx) => (
                        <li key={idx}>
                          {item.name} (x{item.quantity || 1}) - ₹{item.selling_price}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "No items available"
                  )}
                </td>
                <td className="border border-gray-600 px-4 py-2 font-bold">₹{order.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orderlist;