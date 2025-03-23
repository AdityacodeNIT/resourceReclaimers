import React, { useEffect, useState } from "react";
import axios from "axios";

const Userlist = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/users/userList`,
          { withCredentials: true }
        );
        setUserData(response.data);
        console.log(response.data);
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
        `${import.meta.env.VITE_API_URL}/api/v1/users/deleteUser/${id}`,
        { withCredentials: true }
      );

      // Remove deleted item from state
      setUserData(userData.filter((user) => user._id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const promoteUser = async (id,newrole) => {
    const confirmDelete = window.confirm("Are you sure you want to update this user's role?");
    if (!confirmDelete) return;
    try {
     const response= await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/users/updateUserPost/${id}`,
        {role:newrole},
        { withCredentials: true }
      );
      console.log(response.data.user.role);

      // Remove deleted item from state
    
      setUserData((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, role: response.data.user.role } : user
        )
      );
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
      <h1 className="text-3xl font-bold text-center mb-8">User List</h1>
      <table className="w-full text-left table-auto border-collapse">
        <thead>
          <tr>
            <th className="border-b-2 p-2">Username</th>
            <th className="border-b-2 p-2">Full Name</th>
            <th className="border-b-2 p-2">Email</th>
            <th className="border-b-2 p-2">role</th>
            <th className="border-b-2 p-2">Action</th>

          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user._id} className="hover:bg-gray-100">

           
              <td className="border-b p-2">{user.username}</td>
              <td className="border-b p-2">{user.fullName}</td>
              <td className="border-b p-2">{user.email}</td>
              {/* <td 
  className={`border-b p-2 ${
    user.role === "superadmin" ? "text-white font-bold bg-blue-400 rounded-lg" : "text-gray-700"
  }`}
>
  {user.role}
</td> */}

<td className="border-b p-2">
                {user.role === "superadmin" ? (
                  <span className="text-white font-bold bg-blue-400 rounded-lg border-b p-2">
                    {user.role}
                  </span>
                ) : (
                  <select
                    value={user.role}
                    onChange={(e) => promoteUser(user._id, e.target.value)}
                    className="text-gray-700 border-b p-2"
                  >
                    <option value="customer">customer</option>
                    <option value="admin">admin</option>
                    <option value="seller">seller</option>
                    <option value="superadmin">superadmin</option>


                  </select>
                )}
              </td>




              <td className="border-b p-2">
             {user.role !== "superadmin" && (
    <button 
      onClick={() => deleteData(user._id)} 
      className="bg-red-500 text-white px-3 py-1 ml-2 rounded"
    >
      Delete
    </button>
  )}

              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Userlist;
