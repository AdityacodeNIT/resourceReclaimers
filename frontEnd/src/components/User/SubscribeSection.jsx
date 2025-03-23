import React, { useState } from "react";

const SubscribeSection = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async () => {
    if (!email || !email.includes("@")) {
      setMessage("❌ Please enter a valid email address.");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/subscribe`, {
        email,
      }
    );

      const data = await response.json();
      if (response.ok) {
        setMessage("✅ Subscription successful! 🎉 Check your email for a welcome message.");
        setEmail("");
      } else {
        setMessage(`⚠️ ${data.message}`);
      }
    } catch (error) {
      setMessage("⚠️ Error subscribing. Please try again.");
      console.error("Subscription error:", error);
    }
  };

  return (
    <div className="relative py-14 px-6 bg-purple-900 text-white text-center  shadow-lg">
      <h2 className="text-3xl font-extrabold">📩 Stay Updated</h2>
      <p className="mt-4 text-lg">Subscribe for the latest deals and updates.</p>

      <div className="mt-6 flex justify-center">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="p-3 rounded-l-lg w-72 text-black focus:outline-none shadow-md"
        />
        <button
          onClick={handleSubscribe}
          className="bg-yellow-500 hover:bg-yellow-600 px-6 py-3 rounded-r-lg font-semibold transition-transform transform hover:scale-105 shadow-md"
        >
          Subscribe
        </button>
      </div>

      {message && <p className="mt-4 text-lg font-semibold">{message}</p>}

      <div className="absolute top-5 left-10 w-14 h-14 bg-yellow-500 opacity-20 blur-2xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-20 h-20 bg-orange-500 opacity-30 blur-2xl rounded-full animate-pulse"></div>
    </div>
  );
};

export default SubscribeSection;
