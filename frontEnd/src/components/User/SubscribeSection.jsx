import React, { useState } from "react";
import axios from "axios";
import { submitContactForm } from "../Utils/SupbaseService.jsx";

const SubscribeSection = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    await submitContactForm(name, email);
    setName('');
    setEmail('');
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      navigate('/');
    }, 4000);
  };

  return (
    <div className="relative py-14 px-6 bg-gradient-to-r from-green-400 to-blue-600 text-white text-center shadow-lg">
      <h2 className="text-3xl font-bold">Join the Movement 🌱</h2>
      <p className="mt-4 text-lg">Subscribe and be part of positive change!</p>
      {formSubmitted && (
        <p className="mt-6 text-xl text-yellow-300">
          🎉 Thanks for subscribing! Together, we reclaim resources and make a difference. 🎉
        </p>
      )}

      <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-3">
        <div className="relative">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="p-3 rounded-lg w-72 text-black focus:outline-none shadow-md"
          />
  
        </div>
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="p-3 rounded-lg w-72 text-black focus:outline-none shadow-md"
          />
    
        </div>
        <button
          onClick={handleSubscribe}
          className="bg-yellow-500 hover:bg-yellow-600 px-6 py-3 rounded-lg font-semibold transition-transform transform hover:scale-105 shadow-md flex items-center gap-2"
        >
         Subscribe
        </button>
      </div>

      <div className="absolute top-5 left-10 w-14 h-14 bg-yellow-500 opacity-20 blur-2xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-20 h-20 bg-orange-500 opacity-30 blur-2xl rounded-full animate-pulse"></div>
    </div>
  );
};

export default SubscribeSection;