import React, { useState } from "react";
import Orderlist from "./Orderlist";
import Userlist from "./Userlist";
import Productlist from "./Productlist";
import { MdAdminPanelSettings } from "react-icons/md";

const AdminSection = () => {
  const [activeSection, setActiveSection] = useState(null);
  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div>
      <div className="flex justify-center items-center text-2xl m-2 p-2">
        Admin Section
        <MdAdminPanelSettings />
      </div>

      <div className="p-6 bg-gray-100 min-h-screen space-y-4">
        {/* User List Accordion Section */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection("userlist")}
            className="w-full p-4 text-left font-semibold text-blue-600 hover:bg-blue-50"
          >
            User List
          </button>
          {activeSection === "userlist" && (
            <div className="p-4 border-t">
              <Userlist />
            </div>
          )}
        </div>

        {/* Product List Accordion Section */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection("productlist")}
            className="w-full p-4 text-left font-semibold text-green-600 hover:bg-green-50"
          >
            Product List
          </button>
          {activeSection === "productlist" && (
            <div className="p-4 border-t">
              <Productlist />
            </div>
          )}
        </div>

        {/* Order List Accordion Section */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection("orderlist")}
            className="w-full p-4 text-left font-semibold text-red-600 hover:bg-red-50"
          >
            Order List
          </button>
          {activeSection === "orderlist" && (
            <div className="p-4 border-t">
              <Orderlist />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSection;
