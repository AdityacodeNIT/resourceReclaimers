import { useEffect, useState } from "react";
import axios from "axios";

const RecyclingList = ({ onEdit, refreshData }) => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/recycling`);
        setRecords(res.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchRecords();
  }, [refreshData]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/recycling/${id}`);
      refreshData();
    } catch (error) {
      console.error("Error deleting data", error);
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Recycling Records</h2>
      <ul>
        {records.map((record) => (
          <li key={record._id} className="p-2 border-b flex justify-between">
            <span>{record.warehouse.name} - {record.wasteProcessing.wasteType}</span>
            <div>
              <button onClick={() => onEdit(record)} className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">Edit</button>
              <button onClick={() => handleDelete(record._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecyclingList;
