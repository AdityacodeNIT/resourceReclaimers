import React, { useEffect, useState } from "react";
import axios from "axios";

const Productlist = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/product/manageProduct`,
          { withCredentials: true }
        );

        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const deleteData = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/v1/product/deleteProduct/${id}`,
        { withCredentials: true }
      );

      // Remove deleted item from state
      setUserData(userData.filter((user) => user._id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Product List</h1>
      <table className="w-full text-left table-auto border-collapse">
        <thead>
          <tr>
            <th className="border-b-2 p-2">Product Name</th>
            <th className="border-b-2 p-2">Price</th>
            <th className="border-b-2 p-2">Category</th>
            <th className="border-b-2 p-2">Stocks</th>
            <th className="border-b-2 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user._id} className="hover:bg-gray-100">
              <td className="border-b p-2">{user.name}</td>
              <td className="border-b p-2">{user.price}</td>
              <td className="border-b p-2">{user.Category}</td>
              <td className="border-b p-2">{user.stocks}</td>
              <td className="border-b p-2">
                <button
                  className="px-4 py-1 text-white bg-red-500 rounded hover:bg-red-700"
                  onClick={() => deleteData(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Productlist;
