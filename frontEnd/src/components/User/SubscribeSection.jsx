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
    <div className="relative py-14 px-6 bg-purple-900 text-white text-center shadow-lg">
      <h2 className="text-3xl font-extrabold">📩 Stay Updated</h2>
      <p className="mt-4 text-lg">Subscribe for the latest deals and updates.</p>
      {formSubmitted && (
          <p className="mt-6 text-xl text-yellow-300">
            Thanks for reaching out! We'll be in touch shortly.
          </p>
        )}

      <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="p-3 rounded-lg w-72 text-black focus:outline-none shadow-md"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          className="p-3 rounded-lg w-72 text-black focus:outline-none shadow-md"
        />
        <button
          onClick={handleSubscribe}
          className="bg-yellow-500 hover:bg-yellow-600 px-6 py-3 rounded-lg font-semibold transition-transform transform hover:scale-105 shadow-md"
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
