import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faBolt, faShieldAlt, faTools, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import ProductList from "../Products/ProductList";
import SubscribeSection from "../User/SubscribeSection";
import {motion} from "framer-motion";

const Home = () => {
    return (
<div className="w-full font-sans">
            {/* Hero Section */}
            <div className="p-6 md:p-10 rounded-xl shadow-xl flex flex-col md:flex-row items-center md:items-start gap-10 w-full">
  {/* Text Section */}
  <div className="w-full md:w-1/2 text-center md:text-left lg:mt-12">
    <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg shadow-orange-400 leading-tight text-gray-900">
      Refurbish. Reuse. Resell.
    </h1>
    <p className="text-lg md:text-xl font-medium mb-6 text-gray-500">
      Sell your old electronics and furniture easily. We verify, refurbish, and connect them with new users affordably.
    </p>
    <Link to="/shop">
      <button className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 px-6 py-3 rounded-full text-base font-semibold flex items-center gap-3 shadow-lg hover:scale-105 transition-transform mx-auto md:mx-0">
        Shop Now <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </Link>
  </div>

  {/* Image Section */}
  <div className="w-full md:w-1/2">
    <img
      src="logopc.png"
      alt="Refurbish"
      className="w-full max-h-[400px]  rounded-xl shadow-lg"
    />
  </div>
</div>


           

            {/* How It Works Section */}
            <div className="py-16 px-6 md:px-20 text-center bg-gray-50">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
                <p className="text-lg text-gray-600 mb-10">
                    We're simplifying the way you give new life to your old items. Sell with ease, buy with trust.
                </p>
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                        <h3 className="text-2xl font-bold mb-3 text-green-600">User-to-Platform Refurbishing</h3>
                        <p className="text-gray-700 mb-3">
                            List your unused or damaged electronics, furniture, or home appliances. Our field agent will verify the condition, and after refurbishment by our expert technicians, we resell the certified product on our platform.
                        </p>
                        <Link to="/seller" className="text-green-600 font-semibold hover:underline">
                            Start Selling →
                        </Link>
                    </div>
                </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-white py-16 px-6 md:px-20 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-12">Why Choose Us?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }}  whileHover={{ scale: 1.1 }}>
                    <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition">
                        <FontAwesomeIcon icon={faUserCheck} className="text-3xl text-green-600 mb-4" />
                        <h4 className="text-xl font-semibold mb-2">Verified Sellers</h4>
                        <p className="text-gray-600 text-sm">
                            Each product is inspected at the seller's location by our trusted field agents for authenticity and condition.
                        </p>
                    </div>
                    </motion.button>

                    <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} whileHover={{ scale: 1.1 }} >
                    <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition">
                        <FontAwesomeIcon icon={faTools} className="text-3xl text-yellow-600 mb-4" />
                        <h4 className="text-xl font-semibold mb-2">Skilled Refurbishment</h4>
                        <p className="text-gray-600 text-sm">
                            Refurbishment is handled by certified local technicians using high-quality parts to restore performance.
                        </p>
                    </div>
                    </motion.button>

                    <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} whileHover={{ scale: 1.1 }} >
                    <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition">
                        <FontAwesomeIcon icon={faShieldAlt} className="text-3xl text-blue-600 mb-4" />
                        <h4 className="text-xl font-semibold mb-2">Certified Quality</h4>
                        <p className="text-gray-600 text-sm">
                            All products undergo multiple tests and are graded before resale with a warranty and satisfaction guarantee.
                        </p>
                    </div>
                    </motion.button>
                    <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }}   whileHover={{ scale: 1.1 }} >
                    <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition">
                        <FontAwesomeIcon icon={faBolt} className="text-3xl text-purple-600 mb-4" />
                        <h4 className="text-xl font-semibold mb-2">Fast & Fair Pricing</h4>
                        <p className="text-gray-600 text-sm">
                            AI-powered estimates and instant payout make it easier and quicker for sellers to get the best value.
                        </p>
                    </div>
                </motion.button>
                </div>
            </div>

            {/* Product Section */}
            <div className="py-10 bg-gray-50">
                <h2 className="text-3xl font-bold text-center mb-6">Explore Refurbished Products</h2>
                <ProductList />
            </div>

            {/* Subscribe Section */}
            <SubscribeSection />
        </div>
    );
};

export default Home;
