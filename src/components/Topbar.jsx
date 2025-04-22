import React from "react";
import { Bell, Search, MessageSquare, Calendar } from "lucide-react";

const Topbar = () => {
  return (
    <div className="bg-white h-16 px-6 flex items-center justify-between shadow-sm">
      <div className="flex items-center w-96">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search orders, products..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Calendar className="text-gray-600" size={20} />
          </button>
        </div>
        <div className="relative">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <MessageSquare className="text-gray-600" size={20} />
          </button>
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            3
          </span>
        </div>
        <div className="relative">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Bell className="text-gray-600" size={20} />
          </button>
          <span className="absolute top-0 right-0 bg-indigo-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            5
          </span>
        </div>
        <div className="h-8 w-px bg-gray-300"></div>
        <div>
          <span className="text-sm font-medium text-gray-800">Today: </span>
          <span className="text-sm text-gray-600">
            {new Date().toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Topbar;