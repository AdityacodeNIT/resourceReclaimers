import { useState, useEffect } from "react";
import axios from "axios";

const RecyclingForm = () => {
  const [data, setData] = useState(null);
  const [formData, setFormData] = useState({
    warehouseName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    adminName: "",
    adminContact: "",
    adminEmail: "",
    capacity: "",
    currentWasteVolume: "",
    wasteType: "",
    amountReceived: "",
    amountCrushed: "",
    amountSentToIndustry: "",
    industryName: "",
    contactPerson: "",
    phone: "",
    email: "",
    revenueReceived: "",
  });

 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/recycle/create`, formData, { withCredentials: true });

      if (response.status === 200) {
        alert("Data saved successfully");
        setData(response.data);
      }
    } catch (error) {
      console.error("Error submitting data", error);
      alert("Error submitting data");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">
        {data ? "Update Warehouse Details" : "Enter Warehouse Details"}
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-2">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Warehouse Information</h3>
          <input name="warehouseName" placeholder="Warehouse Name" value={formData.name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" />
          <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" />
          <div className="grid grid-cols-3 gap-2">
            <input name="city" placeholder="City" value={formData.city} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" />
            <input name="state" placeholder="State" value={formData.state} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" />
            <input name="zipCode" placeholder="Zip Code" value={formData.zipCode} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" />
          </div>
          <input name="country" placeholder="Country" value={formData.country} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Admin Information</h3>
          <input name="adminName" placeholder="Admin Name" value={formData.adminName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" />
          <input name="adminContact" placeholder="Admin Contact" value={formData.adminContact} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" />
          <input name="adminEmail" placeholder="Admin Email" value={formData.adminEmail} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Waste Processing</h3>
          <input name="capacity" placeholder="Total Capacity" value={formData.capacity} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" />
          <input name="currentWasteVolume" placeholder="Current Waste Volume" value={formData.currentWasteVolume} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" />
          <input name="wasteType" placeholder="Waste Type" value={formData.wasteType} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" />
          <input name="amountReceived" placeholder="Amount Received" value={formData.amountReceived} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" />
          <input name="amountCrushed" placeholder="Amount Crushed" value={formData.amountCrushed} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" />
          <input name="amountSentToIndustry" placeholder="Amount Sent to Industry" value={formData.amountSentToIndustry} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" />
        </div>

        <div className="col-span-2">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Industry Dispatch</h3>
          <input name="industryName" placeholder="Industry Name" value={formData.industryName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" />
          <input name="contactPerson" placeholder="Contact Person" value={formData.contactPerson} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" />
          <div className="grid grid-cols-2 gap-2">
            <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" />
            <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" />
          </div>
          <input name="revenueReceived" placeholder="Revenue Received" value={formData.revenueReceived} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" />
        </div>

        <div className="col-span-2 flex justify-center mt-4">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
            {data ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecyclingForm;
