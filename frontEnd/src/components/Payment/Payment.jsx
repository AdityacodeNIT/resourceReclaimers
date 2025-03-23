import React, { useContext, useState } from "react";
import axios from "axios";
import UserContext from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  const {
    totalProductPrice,
    removeItemfromCheckout,
    totalCartPrice,
    orderSuccessful,
    userDetail,
  } = useContext(UserContext);

  const baseAmount = totalProductPrice() || totalCartPrice();
  const totalAmount = Math.ceil(baseAmount * 1.18);

  const [paymentData, setPaymentData] = useState({ amount: totalAmount });
  const [loading, setLoading] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handleInputChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const applyCoupon = () => {
    if (coupon === "DISCOUNT10") {
      setDiscount(totalAmount * 0.1);
    } else {
      setPaymentStatus("Invalid Coupon Code");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPaymentStatus(null);

    try {
      const keyResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/getkey`);
      const { key } = keyResponse.data;

      const finalAmount = totalAmount - discount;

      const paymentResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v2/payments/paid`,
        { amount: finalAmount }
      );

      if (!paymentResponse || !paymentResponse.data) {
        throw new Error("Payment initiation failed");
      }
      
      const { order } = paymentResponse.data;

      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "ई-Cart Logistics",
        description: "Secure Payment",
        image: "https://example.com/your_logo",
        order_id: order.id,
        callback_url: `${import.meta.env.VITE_API_URL}/api/v2/payments/paymentcallback`,
        prefill: {
          name: userDetail?.data?.user?.username || "User",
          email: userDetail?.data?.user?.email || "user@example.com",
          contact: "9000090000",
        },
        theme: {
          color: "#3399cc",
        },
        handler: async (response) => {
          try {
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;

            setPaymentStatus("Verifying Payment...");

            const verifyResponse = await axios.post(
              `${import.meta.env.VITE_API_URL}/api/v2/payments/paymentcallback`,
              {
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
              }
            );

            if (verifyResponse.data.success) {
              setPaymentStatus("Payment Successful! Redirecting...");
              orderSuccessful();
              removeItemfromCheckout();
              setTimeout(() => navigate(`/order-success/${order.id}`), 2000);
              
            } else {
              setPaymentStatus("Payment Verification Failed! Please try again.");
            }
          } catch (error) {
            console.error("Payment Verification Error:", error);
            setPaymentStatus("Payment Failed! Please try again.");
          }
        },
        modal: {
          escape: false,
          ondismiss: () => {
            setPaymentStatus("Payment Cancelled! Please try again.");
          },
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Payment Error:", error);
      setPaymentStatus("Payment Failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-300 flex justify-center items-center h-screen p-4">
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Payment</h2>

        <div className="mb-4">
          <p className="text-lg font-medium">Base Amount: ₹{baseAmount}</p>
          <p className="text-lg font-medium">Tax (18%): ₹{Math.ceil(baseAmount * 0.18)}</p>
          <p className="text-lg font-bold">
            Final Amount: ₹{totalAmount - discount}{" "}
            {discount > 0 && <span className="text-green-600">(-₹{discount} applied)</span>}
          </p>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter Coupon Code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            className="w-full border p-2 rounded-md focus:ring-indigo-300 focus:ring-2"
          />
          <button
            onClick={applyCoupon}
            className="mt-2 w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Apply Coupon
          </button>
        </div>

        <form onSubmit={handleFormSubmit}>
          <input
            type="number"
            name="amount"
            id="amount"
            value={paymentData.amount}
            onChange={handleInputChange}
            required
            className="w-full border rounded-md p-2 text-center focus:ring-indigo-300 focus:ring-2"
            disabled
          />

          <button
            type="submit"
            className={`w-full mt-4 p-2 rounded-lg font-semibold ${
              loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
            } text-white`}
            disabled={loading}
          >
            {loading ? "Processing..." : "Confirm Payment"}
          </button>
        </form>

        {paymentStatus && (
          <p className={`text-center mt-4 ${paymentStatus.includes("Failed") ? "text-red-600" : "text-green-600"}`}>
            {paymentStatus}
          </p>
        )}
      </div>
    </div>
  );
};

export default Payment;
