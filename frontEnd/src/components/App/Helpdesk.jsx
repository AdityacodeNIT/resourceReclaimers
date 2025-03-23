import React from "react";
import { FaInstagram, FaTwitter, FaEnvelope } from "react-icons/fa";

const Helpdesk = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <h2 className="text-4xl font-bold mb-6 text-center text-green-400">
        📞 Helpdesk & Support
      </h2>
      <p className="text-lg text-gray-300 text-center max-w-lg mb-8">
        Have any questions or need support? Reach out to us through any of the platforms below.
      </p>

      {/* Contact Options */}
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Email */}
        <a
          href="as5920644@gmail.com"
          className="flex items-center gap-4 bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-700 transition-transform transform hover:scale-105"
        >
          <FaEnvelope className="text-3xl text-green-400" />
          <span className="text-lg">as5920644@gmail.com</span>
        </a>

        {/* Instagram */}
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-700 transition-transform transform hover:scale-105"
        >
          <FaInstagram className="text-3xl text-pink-500" />
          <span className="text-lg">Instagram</span>
        </a>

        {/* Twitter */}
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-700 transition-transform transform hover:scale-105"
        >
          <FaTwitter className="text-3xl text-blue-400" />
          <span className="text-lg">Twitter</span>
        </a>
      </div>
    </div>
  );
};

export default Helpdesk;
