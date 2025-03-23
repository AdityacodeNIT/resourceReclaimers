import React, { useState } from "react";
import { FaRocket, FaHistory, FaPhone, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

const About = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const toggleContact = () => {
    setIsContactOpen((prev) => !prev);
  };

  return (
    <div className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen flex flex-col items-center gap-10 text-white">
      
      {/* Company Title */}
      <h1 className="text-4xl font-extrabold text-center text-gray-100 mb-4">About Parmarth E-com</h1>

      {/* Company Intro */}
      <p className="text-lg text-gray-300 text-center max-w-4xl leading-relaxed">
        Parmarth E-com is a next-generation e-commerce platform delivering high-quality stationery solutions for modern businesses, educational institutions, and tech-savvy individuals. We combine traditional stationery with cutting-edge tech products to meet the dynamic demands of professionals and learners.
      </p>

      {/* Mission Section */}
      <section className="w-full max-w-5xl flex flex-col md:flex-row items-center gap-8 bg-gray-800 p-6 rounded-lg shadow-lg">
        <FaRocket className="text-yellow-400 text-6xl" />
        <div>
          <h2 className="text-2xl font-semibold text-yellow-400 mb-2">Our Mission</h2>
          <p className="text-gray-300 leading-relaxed">
            To revolutionize the stationery industry by integrating technology, quality, and seamless user experiences. Our mission is to empower individuals and organizations with tools that foster creativity, productivity, and innovation — beyond the ordinary.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="w-full max-w-5xl flex flex-col md:flex-row-reverse items-center gap-8 bg-gray-800 p-6 rounded-lg shadow-lg">
        <FaHistory className="text-yellow-400 text-6xl" />
        <div>
          <h2 className="text-2xl font-semibold text-yellow-400 mb-2">Our Journey</h2>
          <p className="text-gray-300 leading-relaxed">
            Founded with a vision to redefine how stationery is perceived, Parmarth E-com brings together traditional supplies and smart, tech-enhanced tools — making workspaces future-ready. With a focus on reliability, innovation, and customer satisfaction, we are constantly evolving to meet global needs.
          </p>
        </div>
      </section>

      {/* What We Offer */}
      <section className="w-full max-w-5xl bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4 text-center">What We Offer</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-3 text-lg">
          <li>Tech-enabled stationery solutions for professionals and businesses.</li>
          <li>Customizable supplies for schools, universities, and startups.</li>
          <li>Office organization tools integrated with modern design.</li>
          <li>Eco-friendly and sustainable stationery options.</li>
          <li>Fast, reliable delivery with end-to-end tracking and support.</li>
        </ul>
      </section>

      {/* Contact & Social */}
      <div className="relative mt-8">
        <button
          onClick={toggleContact}
          className="p-3 rounded-full bg-yellow-500 text-black hover:bg-yellow-400 shadow-lg transition-transform transform hover:scale-110"
          title="Contact Us"
        >
          <FaPhone size={22} />
        </button>

        {isContactOpen && (
          <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-gray-800 shadow-xl rounded-lg p-4 flex gap-6 border border-gray-600">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-500 transition-colors"
              title="LinkedIn"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-blue-400 transition-colors"
              title="Twitter"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-400 hover:text-pink-500 transition-colors"
              title="Instagram"
            >
              <FaInstagram size={24} />
            </a>
          </div>
        )}
      </div>

      {/* Footer or Company Tagline */}
      <p className="text-gray-500 text-sm mt-8 text-center">
        Empowering modern workspaces — one innovative tool at a time.
      </p>
    </div>
  );
};

export default About;
