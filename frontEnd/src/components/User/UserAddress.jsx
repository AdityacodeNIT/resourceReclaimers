
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserAddress = () => {
  const navigate = useNavigate();
  const [AddressData, setAddressData] = useState({
    firstName: "",
    lastName: "",
    streetAddress: "",
    landmark: "",
    city: "",
    state: "",
    country: "India", // Default to India
    postalCode: "",
    phoneNumber: "",
    alternateNumber: "",
    addressType: "HOME", // Default address type
    additionalInfo: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!AddressData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!AddressData.lastName.trim())
      newErrors.lastName = "Last name is required";
    if (!/^[0-9]{10}$/.test(AddressData.phoneNumber))
      newErrors.phoneNumber = "Enter a valid 10-digit phone number";
    if (!/^[0-9]{6}$/.test(AddressData.postalCode))
      newErrors.postalCode = "Enter a valid 6-digit postal code";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    setAddressData({
      ...AddressData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/address/addAddress`,
        AddressData,
        { withCredentials: true }
      );

      if (response.status === 201) {
        navigate("/BuyProduct");
      }
    } catch (error) {
      console.log("Issue in Adding the Addresses:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Address</h2>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={AddressData.firstName}
              onChange={handleInputChange}
              className={`border-2 ${
                errors.firstName ? "border-red-600" : "border-gray-300"
              } w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.firstName && (
              <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={AddressData.lastName}
              onChange={handleInputChange}
              className={`border-2 ${
                errors.lastName ? "border-red-600" : "border-gray-300"
              } w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.lastName && (
              <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>
          <input
            type="text"
            name="streetAddress"
            placeholder="Street Address"
            value={AddressData.streetAddress}
            onChange={handleInputChange}
            className="border-2 border-gray-300 w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="landmark"
            placeholder="Landmark (optional)"
            value={AddressData.landmark}
            onChange={handleInputChange}
            className="border-2 border-gray-300 w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={AddressData.city}
            onChange={handleInputChange}
            className="border-2 border-gray-300 w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={AddressData.state}
            onChange={handleInputChange}
            className="border-2 border-gray-300 w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={AddressData.country}
            onChange={handleInputChange}
            className="border-2 border-gray-300 w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div>
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={AddressData.postalCode}
              onChange={handleInputChange}
              className={`border-2 ${
                errors.postalCode ? "border-red-600" : "border-gray-300"
              } w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.postalCode && (
              <p className="text-red-600 text-sm mt-1">{errors.postalCode}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={AddressData.phoneNumber}
              onChange={handleInputChange}
              className={`border-2 ${
                errors.phoneNumber ? "border-red-600" : "border-gray-300"
              } w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.phoneNumber && (
              <p className="text-red-600 text-sm mt-1">{errors.phoneNumber}</p>
            )}
          </div>
          <input
            type="text"
            name="alternateNumber"
            placeholder="Alternate Number"
            value={AddressData.alternateNumber}
            onChange={handleInputChange}
            className="border-2 border-gray-300 w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="additionalInfo"
            placeholder="Additional Information (optional)"
            value={AddressData.additionalInfo}
            onChange={handleInputChange}
            className="border-2 border-gray-300 w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="addressType"
                value="HOME"
                checked={AddressData.addressType === "HOME"}
                onChange={handleInputChange}
                className="mr-2"
              />
              Home
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="addressType"
                value="WORK"
                checked={AddressData.addressType === "WORK"}
                onChange={handleInputChange}
                className="mr-2"
              />
              Work
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="addressType"
                value="OTHER"
                checked={AddressData.addressType === "OTHER"}
                onChange={handleInputChange}
                className="mr-2"
              />
              Other
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md mt-4 hover:bg-blue-700 transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserAddress;
