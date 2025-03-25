import React, { useState } from "react";
import { FaRecycle, FaLeaf, FaHandshake, FaGlobe, FaPhone, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

const About = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const toggleContact = () => {
    setIsContactOpen((prev) => !prev);
  };

  return (
    <div className="p-8 bg-gradient-to-br from-green-200 to-green-100 min-h-screen flex flex-col items-center gap-10 text-gray-900">
      
      {/* Company Title */}
      <h1 className="text-4xl font-extrabold text-center text-green-800 mb-4">About Resource Reclaimers</h1>

      {/* Company Intro */}
      <p className="text-lg text-gray-700 text-center max-w-4xl leading-relaxed">
        Resource Reclaimers is dedicated to reducing waste through smart refurbishing and recycling solutions. We strive to reintegrate discarded items into circulation, ensuring minimal environmental impact while offering affordable, sustainable alternatives.
      </p>

      {/* Mission Section */}
      <section className="w-full max-w-5xl flex flex-col md:flex-row items-center gap-8 bg-green-300 p-6 rounded-lg shadow-lg">
        <FaRecycle className="text-green-700 text-6xl" />
        <div>
          <h2 className="text-2xl font-semibold text-green-800 mb-2">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            To create a sustainable ecosystem where discarded but functional products are repaired, refurbished, and given a new life, reducing environmental impact while providing affordable solutions for consumers.
          </p>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="w-full max-w-5xl flex flex-col md:flex-row-reverse items-center gap-8 bg-green-300 p-6 rounded-lg shadow-lg">
        <FaGlobe className="text-green-700 text-6xl" />
        <div>
          <h2 className="text-2xl font-semibold text-green-800 mb-2">The Problem</h2>
          <p className="text-gray-700 leading-relaxed">
            Millions of usable products are discarded daily, increasing waste and pollution. Many of these items could serve another purpose if repaired or reused. The lack of a structured system for repurposing leads to inefficient waste management and a rising carbon footprint.
          </p>
        </div>
      </section>

      {/* Solution Section */}
      <section className="w-full max-w-5xl bg-green-300 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-green-800 mb-4 text-center">Our Approach</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-3 text-lg">
          <li>We collect used products from individuals and businesses.</li>
          <li>Partner with local repair shops to refurbish items.</li>
          <li>Offer affordable, second-life products to buyers.</li>
          <li>Recycle materials that are beyond refurbishment.</li>
          <li>Collaborate with sustainability partners for eco-friendly solutions.</li>
        </ul>
      </section>

      {/* Contact & Social */}
      <div className="relative mt-8">
        <button
          onClick={toggleContact}
          className="p-3 rounded-full bg-green-600 text-white hover:bg-green-500 shadow-lg transition-transform transform hover:scale-110"
          title="Contact Us"
        >
          <FaPhone size={22} />
        </button>

        {isContactOpen && (
          <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-green-300 shadow-xl rounded-lg p-4 flex gap-6 border border-gray-400">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 transition-colors"
              title="LinkedIn"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-500 transition-colors"
              title="Twitter"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-600 transition-colors"
              title="Instagram"
            >
              <FaInstagram size={24} />
            </a>
          </div>
        )}
      </div>

      {/* Footer or Company Tagline */}
      <p className="text-gray-600 text-sm mt-8 text-center">
        Reducing waste, one refurbished product at a time.
      </p>
    </div>
  );
};

export default About;