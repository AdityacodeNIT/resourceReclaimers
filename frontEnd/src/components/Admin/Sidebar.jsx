import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="w-64 bg-gray-900 text-white min-h-screen p-5">
            <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
            <ul>
                <li><Link to="/admin/products" className="block p-2">Manage Products</Link></li>
                <li><Link to="/admin/sellers" className="block p-2">Manage Sellers</Link></li>
                <li><Link to="/admin/orders" className="block p-2">Manage Orders</Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;
