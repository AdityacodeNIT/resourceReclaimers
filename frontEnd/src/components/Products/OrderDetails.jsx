import React, { useContext, useState } from "react";
import { FiTruck, FiCheckCircle, FiInfo, FiXCircle } from "react-icons/fi";
import axios from "axios";
import UserContext from "../../context/UserContext";

const OrderDetails = () => {
  const { orderItems, getUserDetail } = useContext(UserContext);
  const [cancellationStatus, setCancellationStatus] = useState(null);

  const handleCancelOrder = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/shiprocket/cancelOrder/${orderItems.id}`,
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        setCancellationStatus("Your order has been successfully canceled.");
        getUserDetail(); // Refresh user details after cancellation
      } else {
        setCancellationStatus("Failed to cancel the order. Please try again.");
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      setCancellationStatus("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-yellow-400 shadow-md py-3 rounded-lg bg-gray-800">
          📦 Order Details
        </h1>
      </header>

      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Order Status */}
        <section className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
          <div className="flex items-center">
            <FiInfo className="text-blue-400 text-3xl mr-4" />
            <div>
              <h2 className="text-xl font-semibold text-white">Order Status</h2>
              <p className="text-gray-300">{orderItems.status || "Processing"}</p>
            </div>
          </div>
          <p className="text-sm text-gray-400 mt-4">
            Order Created On: {orderItems.order_date} at {orderItems.channel_created_at}
          </p>
        </section>

        {/* Delivery Status */}
        <section className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
          <div className="flex items-center">
            <FiTruck className="text-green-400 text-3xl mr-4" />
            <div>
              <h2 className="text-xl font-semibold text-white">Delivery Status</h2>
              <p className="text-gray-300">{orderItems.delivery_status || "Not Shipped Yet"}</p>
            </div>
          </div>
          <p className="text-sm text-gray-400 mt-4">
            {orderItems.out_for_delivery_date ? `🚚 Out for Delivery: ${orderItems.out_for_delivery_date}` : ""}
            {orderItems.delivered_date ? ` 🎉 Delivered On: ${orderItems.delivered_date}` : ""}
          </p>
        </section>

        {/* Shipping Details */}
        <section className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
          <h2 className="text-lg font-semibold text-yellow-400 border-b pb-2 mb-4">
            🚚 Shipping Information
          </h2>
          <p><strong>Courier:</strong> {orderItems.last_mile_courier_name || "Not Assigned"}</p>
          <p><strong>Tracking Number:</strong> {orderItems.last_mile_awb || "Pending"}</p>
          <p>
            <strong>Tracking Link:</strong>{" "}
            {orderItems.last_mile_awb_track_url ? (
              <a
                href={orderItems.last_mile_awb_track_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                Track Order
              </a>
            ) : (
              "Not Available"
            )}
          </p>
          <p><strong>Pickup Location:</strong> {orderItems.pickup_location}</p>
        </section>

        {/* Payment Details */}
        <section className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
          <h2 className="text-lg font-semibold text-yellow-400 border-b pb-2 mb-4">
            💳 Payment Details
          </h2>
          <p><strong>Payment Method:</strong> {orderItems.payment_method}</p>
          <p><strong>Payment Status:</strong> {orderItems.payment_status || "Not Available"}</p>
          <p><strong>Total Amount:</strong> ₹{orderItems.total} {orderItems.currency}</p>
          <p>
            <strong>Transaction ID:</strong> {orderItems.transaction_detail?.transaction_id || "N/A"}
          </p>
          <p><strong>Invoice Number:</strong> {orderItems.invoice_no || "N/A"}</p>
        </section>

        {/* Return & Exchange */}
        <section className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
          <h2 className="text-lg font-semibold text-yellow-400 border-b pb-2 mb-4">
            🔄 Return & Exchange
          </h2>
          <p><strong>Return Allowed:</strong> {orderItems.allow_return ? "✅ Yes" : "❌ No"}</p>
          <p><strong>Return Pickup Data:</strong> {orderItems.return_pickup_data || "Not Requested"}</p>
          <p><strong>Exchange Status:</strong> {orderItems.exchange_status || "No Exchange Requested"}</p>
        </section>

        {/* Cancel Order Section */}
        { orderItems.status !== "Delivered" && (
          <section className="bg-red-800 p-6 rounded-lg shadow-lg border border-red-700">
            <h2 className="text-lg font-semibold text-white border-b pb-2 mb-4">
              ❌ Cancel Order
            </h2>
            <p className="text-sm text-gray-300 mb-4">
              If your order is not yet delivered, you can cancel it.
            </p>
            <button
              onClick={handleCancelOrder}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105 flex items-center gap-2"
            >
              <FiXCircle /> Cancel Order
            </button>
            {cancellationStatus && (
              <p className="text-sm mt-4 text-gray-300">{cancellationStatus}</p>
            )}
          </section>
        )}

        {/* Action Buttons */}
        <footer className="mt-8 flex justify-end space-x-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105">
            Print Details
          </button>
          <button className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105">
            Back
          </button>
        </footer>
      </div>
    </div>
  );
};

export default OrderDetails;
