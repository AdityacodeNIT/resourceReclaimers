import React, { useState } from "react";

import { MdAdminPanelSettings } from "react-icons/md";
import RefurbisheProduct from "./RefurbisheProduct";
import Orderlist from "../Orderlist";

const RefurbishedControl = () => {
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
              <RefurbisheProduct/>
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

export default RefurbishedControl;
