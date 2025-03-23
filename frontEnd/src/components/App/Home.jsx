import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import UserContext from "../../context/UserContext";
import SubscribeSection from "../User/SubscribeSection";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const { childToParent } = useContext(UserContext);

    const getTrendingProductDetail = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/v1/product/getTrendingProduct`
            );
            if (response) {
                setProducts(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch products", error);
        }
    };

    useEffect(() => {
        getTrendingProductDetail();
    }, []);

    const getRecommendations = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/activity/recommendations`,
                { withCredentials: true }
            );
            if (response) {
                setRecommendations(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch products", error);
        }
    };

    useEffect(() => {
        getRecommendations();
    }, []);

    return (
        <div className="w-full">
            {/* Hero Section */}
            <div className="relative w-full h-[70vh] bg-cover bg-center flex items-center justify-center text-white text-center px-6" 
                style={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1663956066898-282c7609afc9?w=1600&auto=format&fit=crop&q=80')" }}>
                <div className="bg-black bg-opacity-50 p-8 rounded-lg backdrop-blur-md">
                    <h1 className="text-5xl md:text-7xl font-extrabold drop-shadow-lg">Your One-Stop Stationery Store</h1>
                    <p className="mt-4 text-xl md:text-2xl font-light">
                        Premium writing instruments, paper products, and office supplies at your fingertips.
                    </p>
                    <Link to="/shop">
                        <button className="mt-6 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 px-8 py-4 rounded-full text-lg font-semibold flex items-center gap-3 shadow-lg transform hover:scale-105 transition-all">
                            Shop Now <FontAwesomeIcon icon={faArrowRight} />
                        </button>
                    </Link>
                </div>
            </div>

            {/* Categories Section */}
            <div className="py-16 px-8">
                <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">Shop by Category</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {[
                        { name: "Writing Instruments", img: "/assets/10b1e33d-42e9-478b-a60e-59da139d2ecc.webp" },
                        { name: "Paper Products", img: "/assets/paperProducts.webp" },
                        { name: "Desk Supplies", img: "https://images.pexels.com/photos/5088007/pexels-photo-5088007.jpeg?auto=compress&cs=tinysrgb&w=600" },
                        { name: "Filing & Storage", img: "https://images.pexels.com/photos/10567177/pexels-photo-10567177.jpeg?auto=compress&cs=tinysrgb&w=600" },
                        { name: "Reusable Products", img: "https://images.pexels.com/photos/7488492/pexels-photo-7488492.jpeg?auto=compress&cs=tinysrgb&w=600" },
                    ].map((category, index) => (
                        <Link to={`/${category.name.replace(/\s+/g, '')}`} key={index}>
                            <div className="bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden transform hover:scale-105 transition-all">
                                <img src={category.img} alt={category.name} className="w-full h-40 object-cover" />
                                <div className="p-4 text-center">
                                    <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Trending Now Section */}
            <div className="py-16 bg-gray-100 px-8">
                <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">Trending Now</h2>
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {products.map((product) => (
                        <div key={product._id} onClick={() => childToParent(product)} className="bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 hover:scale-105 transition-all border border-gray-200 p-5">
                            <Link to="/About">
                                <img src={product.ProductImage} alt={product.name} className="w-full h-44 object-contain" />
                                <h3 className="text-gray-800 font-semibold text-lg mt-3 text-center">{product.name}</h3>
                                <p className="text-teal-600 font-bold text-xl text-center mt-3">₹{product.price}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* Products Section */}
            <div className="py-16 bg-gray-100 px-8">
                <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">Products You Might Like</h2>
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {recommendations.map((product) => (
                        <div key={product._id}  onClick={()=>childToParent(product)} className="bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 hover:scale-105 transition-all border border-gray-200 p-5">
                            <Link to="/About">
                                <img src={product.ProductImage} alt={product.name} className="w-full h-44 object-contain" />
                                <h3 className="text-gray-800 font-semibold text-lg mt-3 text-center">{product.name}</h3>
                                <p className="text-teal-600 font-bold text-xl text-center mt-3">₹{product.price}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* Newsletter Signup */}
            <SubscribeSection />
        </div>
    );
};

export default Home;
