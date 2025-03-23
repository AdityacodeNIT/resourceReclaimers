import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";

const GetProduct = async () => {
  const { getProductDetail } = useContext(UserContext);

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/v1/product/getProduct`
    );
    if (response) {
      getProductDetail(response);
    }
  
  } catch (error) {
    console.error("Failed to register", error);
 
  }
  return <div></div>;
};
export default GetProduct;
