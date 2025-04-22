import React, { useState, useEffect } from "react";
import { Bell, Search, UserCircle, Sun, Moon } from "lucide-react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import OrdersPage from "../pages/OrdersPage";
import ProductsPage from "../pages/ProductsPage";
import AssignManufacturingPage from "../pages/AssignManufacturingPage";
import InsightsPage from "../pages/InsightsPage";
import SettingsPage from "../pages/SettingsPage";
import {
  ArrowUp,
  ArrowDown,
  TrendingUp,
  Package,
  Clock,
  Calendar,
  CheckCircle,
  AlertCircle,
  DollarSign
} from "lucide-react";

export default function BusinessOwner(){
  const [activeTab, setActiveTab] = useState("Orders");
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Simulate loading time
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const renderPage = () => {
    switch (activeTab) {
      case "Orders":
        return <OrdersPage />;
      case "Products":
        return <ProductsPage />;
      case "Assign Manufacturing":
        return <AssignManufacturingPage />;
      case "Insights":
        return <InsightsPage />;
      case "Settings":
        return <SettingsPage />;
      default:
        return <OrdersPage />;
    }
  };

  // Loading screen
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-indigo-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <h2 className="mt-4 text-xl font-semibold text-indigo-800">Loading ManufactureX...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100"}`}>
      {/* Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        darkMode={darkMode} 
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <Topbar darkMode={darkMode} />

        {/* Dashboard Header */}
        <div className={`px-6 py-4 ${darkMode ? "bg-gray-800" : "bg-white"} shadow-sm flex justify-between items-center`}>
          <div>
            <h1 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>
              {activeTab === "Orders" ? "Orders Dashboard" : 
               activeTab === "Products" ? "Products Dashboard" :
               activeTab === "Assign Manufacturing" ? "Manufacturing Assignment" :
               activeTab === "Insights" ? "Business Insights" : "System Settings"}
            </h1>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              {new Date().toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Quick Action Buttons */}
            <button 
              className={`px-3 py-2 rounded-lg text-sm ${darkMode ? 
                "bg-indigo-600 hover:bg-indigo-700" : 
                "bg-indigo-600 text-white hover:bg-indigo-700"}`}
            >
              Quick Reports
            </button>
            
            <button 
              className={`p-2 rounded-full ${darkMode ? 
                "bg-gray-700 hover:bg-gray-600" : 
                "bg-gray-200 hover:bg-gray-300"}`}
              onClick={toggleDarkMode}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className={`flex-1 overflow-y-auto p-6 ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
          {/* Dashboard Overview Cards (only on Orders tab) */}
          {activeTab === "Orders" && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className={`p-6 rounded-lg shadow-sm ${darkMode ? "bg-gray-800" : "bg-white"} flex items-center`}>
                <div className="rounded-full p-3 bg-green-100 text-green-600">
                  <Bell size={24} />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">New Orders</h3>
                  <p className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>25</p>
                  <div className="flex items-center text-green-500 text-sm">
                    <ArrowUp size={14} />
                    <span className="ml-1">12% from last week</span>
                  </div>
                </div>
              </div>
              
              <div className={`p-6 rounded-lg shadow-sm ${darkMode ? "bg-gray-800" : "bg-white"} flex items-center`}>
                <div className="rounded-full p-3 bg-blue-100 text-blue-600">
                  <Clock size={24} />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">Production Time</h3>
                  <p className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>3.2 days</p>
                  <div className="flex items-center text-green-500 text-sm">
                    <ArrowDown size={14} />
                    <span className="ml-1">4% improvement</span>
                  </div>
                </div>
              </div>
              
              <div className={`p-6 rounded-lg shadow-sm ${darkMode ? "bg-gray-800" : "bg-white"} flex items-center`}>
                <div className="rounded-full p-3 bg-purple-100 text-purple-600">
                  <Package size={24} />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">Inventory Health</h3>
                  <p className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>87%</p>
                  <div className="flex items-center text-green-500 text-sm">
                    <ArrowUp size={14} />
                    <span className="ml-1">3% from last month</span>
                  </div>
                </div>
              </div>
              
              <div className={`p-6 rounded-lg shadow-sm ${darkMode ? "bg-gray-800" : "bg-white"} flex items-center`}>
                <div className="rounded-full p-3 bg-amber-100 text-amber-600">
                  <DollarSign size={24} />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">Monthly Revenue</h3>
                  <p className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>$124.8K</p>
                  <div className="flex items-center text-red-500 text-sm">
                    <ArrowDown size={14} />
                    <span className="ml-1">2% from last month</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Main Page Content */}
          {renderPage()}
        </div>
        
        {/* Footer */}
        <div className={`px-6 py-3 ${darkMode ? "bg-gray-800 text-gray-400" : "bg-white text-gray-500"} border-t text-sm`}>
          <div className="flex justify-between items-center">
            <div>ManufactureX Dashboard v2.5.0</div>
            <div className="flex items-center space-x-4">
              <a href="#" className="hover:text-indigo-600">Help</a>
              <a href="#" className="hover:text-indigo-600">Support</a>
              <a href="#" className="hover:text-indigo-600">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}