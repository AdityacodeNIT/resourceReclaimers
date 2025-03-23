import axios from "axios";
import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useNavigate } from "react-router-dom";

const allPossibleAttributes = [
  "length", "breadth", "height", "weight",
  "memory", "batteryLife", "screenSize", "connectivity",
  "inkColor", "refillable"
];

const AddProduct = () => {
  const [ProductData, setProductData] = useState({
    name: "", price: "", description: "", Category: "", stocks: "", ProductImage: null
  });

  const [message, setMessage] = useState("");
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [selectedAttribute, setSelectedAttribute] = useState("");

  const genAI = new GoogleGenerativeAI(`${import.meta.env.API_KEY}`);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const navigate = useNavigate();

  const fetchAIResponse = async (prompt) => {
    try {
      const response = await model.generateContent(prompt);
      return await response.response.text();
    } catch (error) {
      console.error("Gemini API error:", error);
      return "";
    }
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setProductData({ ...ProductData, [name]: value });

    // Generate AI description if name is provided and description is empty
    if (name === "name" ) {
      const descriptionPrompt = `Generate a concise and engaging product description for a "${value}" in an e-commerce store. Provide plain text of at least 150 words.`;

      const generatedDescription = await fetchAIResponse(descriptionPrompt);

      setProductData((prev) => ({
        ...prev,
        description: generatedDescription.trim(),
      }));
    }
  };

  const handleFileChange = (e) => {
    setProductData({ ...ProductData, ProductImage: e.target.files[0] });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.keys(ProductData).forEach((key) => {
        if (ProductData[key] && (selectedAttributes.includes(key) || ["name", "price", "Category", "description", "stocks", "ProductImage"].includes(key))) {
          formDataToSend.append(key, ProductData[key]);
        }
      });

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/product/addProduct`,
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setMessage("Product added successfully!");
      setProductData({ name: "", price: "", description: "", Category: "", stocks: "", ProductImage: null });
      setSelectedAttributes([]);
    } catch (error) {
      console.error("Error adding product:", error);
      setMessage("Failed to add product.");
    }
  };

  const handleAttributeChange = (e) => {
    setSelectedAttribute(e.target.value);
  };

  const addManualAttribute = () => {
    if (selectedAttribute && !selectedAttributes.includes(selectedAttribute)) {
      setSelectedAttributes([...selectedAttributes, selectedAttribute]);
    }
    setSelectedAttribute("");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Add New Product</h2>
      {message && <p className="text-green-600 font-semibold">{message}</p>}
      <form onSubmit={handleFormSubmit}>
        <input type="text" name="name" placeholder="Enter product name" value={ProductData.name} onChange={handleInputChange} className="mt-3 border-2 border-cyan-600 w-full p-3 rounded-md" />
        <input type="text" name="price" placeholder="Enter product price" value={ProductData.price} onChange={handleInputChange} className="mt-3 border-2 border-cyan-600 w-full p-3 rounded-md" />
        <input type="text" name="stocks" placeholder="Enter stocks" value={ProductData.stocks} onChange={handleInputChange} className="mt-3 border-2 border-cyan-600 w-full p-3 rounded-md" />
        
        {/* Category Selection */}
        <select name="Category" value={ProductData.Category} onChange={handleInputChange} className="mt-3 border-2 border-cyan-600 w-full p-3 rounded-md">
          <option value="">Select Category</option>
          <option value="Writing">Writing</option>
          <option value="Paper">Paper</option>
          <option value="DeskSupplies">Desk Supplies</option>
          <option value="Filing">Filing</option>
          <option value="Reusable">Reusable</option>
          <option value="TechStationery">Tech Stationery</option>
        </select>

        {/* Manual Attribute Selection */}
        <div className="mt-3 flex flex-wrap gap-3 p-4">
          <select value={selectedAttribute} onChange={handleAttributeChange} className="border-2 border-cyan-600 p-2 rounded-md">
            <option value="">Select an Attribute</option>
            {allPossibleAttributes.map((attr) => (
              <option key={attr} value={attr}>{attr}</option>
            ))}
          </select>
          <button type="button" onClick={addManualAttribute} className="bg-blue-500 text-white px-3 py-1 rounded-md">Add</button>
        </div>

        {/* Show Selected Attributes in Three Columns */}
        <div className="mt-3 grid grid-cols-3 gap-3">
          {selectedAttributes.map((attr) => (
            <input key={attr} type="text" name={attr} placeholder={`Enter ${attr}`} value={ProductData[attr] || ""} onChange={handleInputChange} className="border-2 border-cyan-600 p-3 rounded-md w-full" />
          ))}
        </div>

        <input type="file" name="ProductImage" onChange={handleFileChange} className="mt-3 border-2 border-cyan-600 w-full p-3 rounded-md" />

        {/* AI-Generated or Manual Product Description */}
        <textarea name="description" placeholder="Generated product description" value={ProductData.description} onChange={handleInputChange} className="mt-3 border-2 border-cyan-600 w-full p-3 rounded-md bg-white" rows="4"></textarea>

        <button type="submit" className="mt-5 bg-cyan-600 text-white p-3 rounded-md w-full">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
