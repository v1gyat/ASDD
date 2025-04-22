import React from "react";
import { Home, Package, Box, PieChart, Settings, List,UserCircle } from "lucide-react";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { name: "Orders", icon: <List size={20} /> },
    { name: "Products", icon: <Package size={20} /> },
    { name: "Assign Manufacturing", icon: <Box size={20} /> },
    { name: "Insights", icon: <PieChart size={20} /> },
    { name: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <div className="bg-indigo-800 text-white w-64 flex flex-col h-full shadow-lg">
      <div className="p-4 border-b border-indigo-700">
        <h1 className="text-xl font-bold flex items-center">
          <Home className="mr-2" /> ManufactureX
        </h1>
        <p className="text-indigo-300 text-sm mt-1">Business Dashboard</p>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <ul>
          {menuItems.map((item) => (
            <li key={item.name}>
              <button
                className={`w-full flex items-center px-4 py-3 text-left ${
                  activeTab === item.name
                    ? "bg-indigo-700 text-white"
                    : "text-indigo-200 hover:bg-indigo-700"
                } transition-colors`}
                onClick={() => setActiveTab(item.name)}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 border-t border-indigo-700">
        <div className="flex items-center">
          <div className="bg-indigo-600 p-2 rounded-full">
            <UserCircle size={24} />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">Business Owner</p>
            <p className="text-xs text-indigo-300">Admin Access</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;