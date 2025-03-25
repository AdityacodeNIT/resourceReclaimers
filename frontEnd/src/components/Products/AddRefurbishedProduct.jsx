import React, { useState } from "react";
import axios from "axios";

const AddRefurbishedProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Electronics",
    sellerDeclaredCondition: "New",
    originalPriceProof: null,
    productImages: [],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.name === "originalPriceProof") {
      setFormData({ ...formData, originalPriceProof: e.target.files[0] });
    } else {
      const files = Array.from(e.target.files).slice(0, 5);
      setFormData({ ...formData, productImages: [...formData.productImages, ...files] });
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      productImages: prevState.productImages.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "productImages") {
        formData.productImages.forEach((file) => {
          formDataToSend.append("productImages", file);
        });
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/refurbished/addProduct`, formDataToSend,
        {withCredentials: true},
      );
      if(response){
        alert("Product added successfully");
      }
    } catch (error) {
     console.error("there is an error", error);
    }
  };

  return (
    <div className="p-8 bg-green-100 min-h-screen flex flex-col items-center">
      <h2 className="text-2xl font-bold">Upload Your Product</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded shadow">
        <input type="text" name="name" placeholder="Product Name" onChange={handleChange} required className="w-full p-2 mb-3 border" />
       
        <textarea name="description" placeholder="Description" onChange={handleChange} required className="w-full p-2 mb-3 border"></textarea>
        <select name="category" onChange={handleChange} className="w-full p-2 mb-3 border">
          <option value="Electronics">Electronics</option>
          <option value="Furniture">Furniture</option>
          <option value="Appliances">Appliances</option>
          <option value="AutomotiveParts">Automotive Parts</option>
          <option value="HomeDecor">Home Decor</option>
        </select>
        <select name="sellerDeclaredCondition" onChange={handleChange} className="w-full p-2 mb-3 border">
          <option value="New">New</option>
          <option value="Like New">Like New</option>
          <option value="Used">Used</option>
          <option value="Damaged">Damaged</option>
        </select>
        <input type="file" name="originalPriceProof" placeholder="Upload Price Proof" onChange={handleFileChange} required className="w-full p-2 mb-3 border" />
        <input type="file" name="productImages" placeholder="Upload Product Images" onChange={handleFileChange} multiple accept="image/*" className="w-full p-2 mb-3 border" />
        
        {/* Preview Uploaded Images */}
        {formData.productImages.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {formData.productImages.map((file, index) => (
              <div key={index} className="relative w-24 h-24 border rounded overflow-hidden">
                <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-500 text-white p-1 text-xs"
                  onClick={() => handleRemoveImage(index)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        )}
        
        <button type="submit" className="w-full p-3 bg-green-500 text-white font-bold mt-3">Submit</button>
      </form>
    </div>
  );
};

export default AddRefurbishedProduct;




