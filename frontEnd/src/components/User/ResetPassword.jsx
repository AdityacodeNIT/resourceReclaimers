import React, { useState } from "react";
import axios from "axios";
import{ useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate=useNavigate();

  const handleRequestOTP = async () => {
    setError("");
    setMessage("");
    if (!email) {
      setError("Please enter your email");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/users/request-reset-password`, { email });
      setMessage("OTP sent to your email");
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleResetPassword = async () => {
    setError("");
    setMessage("");
    if (!otp || !newPassword || !confirmPassword) {
      setError("All fields are required");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/users/reset-password`, {
        email,
        otp,
        newPassword,
        confirmPassword,
      });
      setMessage("Password reset successful! You can now log in.");
      setStep(1);
      setOtp("");
      setNewPassword("");
      setConfirmPassword("");
      navigate("/userLogin")
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-lg shadow-md font-sans">
      {step === 1 && (
        <>
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            Request Password Reset OTP
          </h2>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleRequestOTP}
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors duration-300"
          >
            Send OTP
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            Reset Password
          </h2>
          <input
            type="text"
            placeholder="Enter the OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleResetPassword}
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-colors duration-300"
          >
            Reset Password
          </button>
          <button
            onClick={() => setStep(1)}
            className="mt-4 w-full bg-gray-500 text-white py-3 rounded-md hover:bg-gray-600 transition-colors duration-300"
          >
            Back
          </button>
        </>
      )}

      {message && (
        <p className="mt-4 text-center text-green-600 font-semibold">{message}</p>
      )}
      {error && (
        <p className="mt-4 text-center text-red-600 font-semibold">{error}</p>
      )}
    </div>
  );
};

export default ResetPassword;