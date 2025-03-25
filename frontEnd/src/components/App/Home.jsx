import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import UserContext from "../../context/UserContext";
import SubscribeSection from "../User/SubscribeSection";
import ProductList from "../Products/ProductList";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const { childToParent } = useContext(UserContext);

 

   

   

    return (
        <div className="w-full">
            {/* Hero Section */}
            <div className="relative w-full h-[70vh] bg-cover bg-center flex items-center justify-center text-white text-center px-6" 
                style={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1663956066898-282c7609afc9?w=1600&auto=format&fit=crop&q=80')" }}>
                <div className="bg-black bg-opacity-50 p-8 rounded-lg backdrop-blur-md">
                    <h1 className="text-5xl md:text-7xl font-extrabold drop-shadow-lg">Refurbish Reuse Recycle</h1>
                   
                    <Link to="/shop">
                        <button className="mt-6 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 px-8 py-4 rounded-full text-lg font-semibold flex items-center gap-3 shadow-lg transform hover:scale-105 transition-all">
                            Shop Now <FontAwesomeIcon icon={faArrowRight} />
                        </button>
                    </Link>
                </div>
            </div>

          

           

           <ProductList/>

            {/* Newsletter Signup */}
            <SubscribeSection />
        </div>
    );
};

export default Home;
