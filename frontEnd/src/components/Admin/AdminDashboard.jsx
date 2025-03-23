import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";


const AdminDashboard = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-5">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminDashboard;
