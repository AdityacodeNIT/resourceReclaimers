import { useState,useEffect } from "react";
import axios from "axios";

const RecyclingForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [details, setDetails] = useState([]); // Holds retrieved records
  const [selectedId, setSelectedId] = useState(null); // ID of record to update
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


  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/recycle/get`,
        { withCredentials: true }
      );
      if (response.data) {
        setDetails(response.data[0]);
        console.log(response.data[0]);
        setFormData(response.data[0]); // Pre-fill form for editing
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/recycle/update/${details._id}`,
        formData,
        { withCredentials: true }
      );

      if (response.status === 200) {
        alert("Details updated successfully");
        setDetails(formData);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating data", error);
      alert("Error updating data");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/recycle/create`,
        formData,
        { withCredentials: true }
      );

      if (response.status === 201) {
        alert("Details submitted successfully");
        setDetails(response.data);
      }
    } catch (error) {
      console.error("Error submitting data", error);
      alert("Error submitting data");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      {details ? (
        !isEditing ? (
          <div>
            <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">Warehouse Details</h2>
            <div className="p-4 border border-gray-300 rounded-lg bg-gray-50">
              <h3 className="text-lg font-semibold">{details.warehouseName}</h3>
              <p>{details.address}, {details.city}, {details.state}, {details.country}</p>
              <p><strong>Admin:</strong> {details.adminName} ({details.adminEmail})</p>
              <p><strong>Waste Type:</strong> {details.wasteType}</p>
              <p><strong>Amount Received:</strong> {details.amountReceived}</p>
              <p><strong>Revenue:</strong> {details.revenueReceived} rs</p>
            </div>
            <div className="flex justify-center mt-4">
              <button onClick={handleEdit} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                Edit Details
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Waste Processing</h3>
          <input name="capacity" placeholder="Total Capacity" value={formData.capacity} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" />
          <input name="currentWasteVolume" placeholder="Current Waste Volume" value={formData.currentWasteVolume} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" />
          <input name="wasteType" placeholder="Waste Type" value={formData.wasteType} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" />
          <input name="amountReceived" placeholder="Amount Received" value={formData.amountReceived} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" />
          <input name="amountCrushed" placeholder="Amount Crushed" value={formData.amountCrushed} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" />
          <input name="amountSentToIndustry" placeholder="Amount Sent to Industry" value={formData.amountSentToIndustry} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" />
          <input name="revenueReceived" placeholder="Revenue Received in rs" value={formData.revenueReceived} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" />
        </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Admin Information</h3>
              <input name="adminName" placeholder="Admin Name" value={formData.adminName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" />
              <input name="adminContact" placeholder="Admin Contact" value={formData.adminContact} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" />
              <input name="adminEmail" placeholder="Admin Email" value={formData.adminEmail} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" />
            </div>

            <div className="col-span-2 flex justify-center mt-4">
              <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
                Update Details
              </button>
              <button onClick={() => setIsEditing(false)} className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition ml-4">
                Cancel
              </button>
            </div>
          </form>
        )
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-2">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Warehouse Information</h3>
          <input name="warehouseName" placeholder="Warehouse Name" value={formData.warehouseName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" />
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

        <div className="col-span-2 flex justify-center mt-4">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
            Submit
          </button>
          <button onClick={handleGet} className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition ml-4">
            Get Data
          </button>
        </div>
      </form>
      )}
    </div>
  );
};

export default RecyclingForm;
