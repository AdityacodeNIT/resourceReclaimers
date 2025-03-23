import { useEffect, useState } from "react";
//import { fetchSellers, updateSellerRole, deleteSeller } from "../api/sellerAPI";

const ManageSellers = () => {
    const [sellers, setSellers] = useState([]);

    useEffect(() => {
        const loadSellers = async () => {
            const data = await axios;
            setSellers(data);
        };
        loadSellers();
    }, []);

    const handleRoleChange = async (id, newRole) => {
        await updateSellerRole(id, newRole);
        setSellers(sellers.map(s => s._id === id ? { ...s, role: newRole } : s));
    };

    const handleDelete = async (id) => {
        await deleteSeller(id);
        setSellers(sellers.filter((s) => s._id !== id));
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Manage Sellers</h2>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2">Name</th>
                        <th className="p-2">Role</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sellers.map((seller) => (
                        <tr key={seller._id} className="border-b">
                            <td className="p-2">{seller.name}</td>
                            <td className="p-2">{seller.role}</td>
                            <td className="p-2">
                                <select className="border p-1" value={seller.role} onChange={(e) => handleRoleChange(seller._id, e.target.value)}>
                                    <option value="seller">Seller</option>
                                    <option value="superadmin">Superadmin</option>
                                </select>
                                <button onClick={() => handleDelete(seller._id)} className="bg-red-500 text-white px-3 py-1 ml-2 rounded">
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

export default ManageSellers;
