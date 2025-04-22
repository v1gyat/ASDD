import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Package, Clock, Calendar, TrendingUp } from 'lucide-react';

const InsightsPage = () => {
  const [timeRange, setTimeRange] = useState('month');

  // Sample data for charts
  const salesData = [
    { name: 'Jan', sales: 4000, target: 3000 },
    { name: 'Feb', sales: 3000, target: 3000 },
    { name: 'Mar', sales: 5000, target: 3000 },
    { name: 'Apr', sales: 2780, target: 3000 },
    { name: 'May', sales: 4890, target: 3000 },
    { name: 'Jun', sales: 3390, target: 3000 },
  ];

  const topProducts = [
    { name: 'Product A', sales: 120 },
    { name: 'Product B', sales: 98 },
    { name: 'Product C', sales: 86 },
    { name: 'Product D', sales: 72 },
    { name: 'Product E', sales: 65 },
  ];

  const delayData = [
    { name: 'Jan', avgDelay: 1.2 },
    { name: 'Feb', avgDelay: 0.8 },
    { name: 'Mar', avgDelay: 1.4 },
    { name: 'Apr', avgDelay: 0.9 },
    { name: 'May', avgDelay: 0.5 },
    { name: 'Jun', avgDelay: 0.3 },
  ];

  const inventoryData = [
    { name: 'Jan', turnover: 4.2 },
    { name: 'Feb', turnover: 3.8 },
    { name: 'Mar', turnover: 5.1 },
    { name: 'Apr', turnover: 4.9 },
    { name: 'May', turnover: 5.3 },
    { name: 'Jun', turnover: 5.7 },
  ];

  const DashboardCard = ({ title, value, change, icon, color }) => (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col">
      <div className="flex justify-between items-start">
        <h3 className="text-gray-500 font-medium">{title}</h3>
        <div className={`p-2 rounded-lg bg-${color}-100`}>
          {icon}
        </div>
      </div>
      <div className="mt-4">
        <p className="text-2xl font-semibold">{value}</p>
        <div className="flex items-center mt-2">
          {change > 0 ? (
            <ArrowUpRight className="text-green-500 w-4 h-4 mr-1" />
          ) : (
            <ArrowDownRight className="text-red-500 w-4 h-4 mr-1" />
          )}
          <span className={change > 0 ? "text-green-500" : "text-red-500"}>
            {Math.abs(change)}% {change > 0 ? "increase" : "decrease"}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Insights & Reports</h1>
        
        <div className="flex space-x-2">
          <button 
            className={`px-4 py-2 rounded-md ${timeRange === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setTimeRange('week')}
          >
            Week
          </button>
          <button 
            className={`px-4 py-2 rounded-md ${timeRange === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setTimeRange('month')}
          >
            Month
          </button>
          <button 
            className={`px-4 py-2 rounded-md ${timeRange === 'year' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setTimeRange('year')}
          >
            Year
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard 
          title="Total Sales" 
          value="$24,680" 
          change={12.5} 
          icon={<TrendingUp className="text-blue-600 w-5 h-5" />} 
          color="blue" 
        />
        <DashboardCard 
          title="Products Sold" 
          value="1,245" 
          change={8.3} 
          icon={<Package className="text-purple-600 w-5 h-5" />} 
          color="purple" 
        />
        <DashboardCard 
          title="Avg. Delivery Time" 
          value="3.2 days" 
          change={-6.4} 
          icon={<Clock className="text-green-600 w-5 h-5" />} 
          color="green" 
        />
        <DashboardCard 
          title="Monthly Orders" 
          value="468" 
          change={15.2} 
          icon={<Calendar className="text-orange-600 w-5 h-5" />} 
          color="orange" 
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Sales Trends Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Sales Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#4F46E5" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="target" stroke="#9CA3AF" strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top-Selling Products */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Top-Selling Products</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProducts} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#7C3AED" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Second Row of Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Delay Tracker */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Delay Tracker (Avg. Days)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={delayData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="avgDelay" stroke="#EF4444" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Inventory Turnover Rate */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Inventory Turnover Rate</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={inventoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="turnover" stroke="#10B981" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default InsightsPage;