import React, { useState } from 'react';
import { Save, User, Bell, Settings as SettingsIcon, Trash2, UserPlus, Mail, Phone } from 'lucide-react';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('users');
  
  // Sample user data
  const [users, setUsers] = useState([
    { id: 1, name: 'John Smith', email: 'john@example.com', role: 'Admin', avatar: '/api/placeholder/40/40' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Manager', avatar: '/api/placeholder/40/40' },
    { id: 3, name: 'Michael Davis', email: 'michael@example.com', role: 'Manufacturing Lead', avatar: '/api/placeholder/40/40' },
  ]);
  
  // Notification preferences state
  const [notificationPrefs, setNotificationPrefs] = useState({
    orderCreated: true,
    orderStatusChanged: true,
    inventoryLow: true,
    manufacturingDelays: true,
    dailyReports: false,
    weeklyReports: true,
    monthlyReports: true,
  });
  
  // System settings state
  const [systemSettings, setSystemSettings] = useState({
    inventoryThreshold: 10,
    autoAssignManufacturing: false,
    enableDarkMode: false,
    sendReminders: true,
    orderApprovalRequired: true,
    backupFrequency: 'daily',
  });
  
  const handleNotificationChange = (key) => {
    setNotificationPrefs({
      ...notificationPrefs,
      [key]: !notificationPrefs[key]
    });
  };
  
  const handleSystemSettingChange = (key, value) => {
    setSystemSettings({
      ...systemSettings,
      [key]: value
    });
  };

  const renderUsersTab = () => (
    <div>
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-semibold">User Management</h2>
        <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md">
          <UserPlus className="w-4 h-4 mr-2" />
          Add User
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-full" src={user.avatar} alt="" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.role}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-800 mr-3">Edit</button>
                  <button className="text-red-600 hover:text-red-800">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
  const renderNotificationsTab = () => (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Notification Preferences</h2>
        <p className="text-gray-500 mt-1">Choose which notifications you'd like to receive</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-medium text-lg mb-4">Order Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">New Order Created</p>
              <p className="text-sm text-gray-500">Get notified when a new order is placed</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={notificationPrefs.orderCreated}
                onChange={() => handleNotificationChange('orderCreated')}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Order Status Changes</p>
              <p className="text-sm text-gray-500">Get notified when an order's status changes</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={notificationPrefs.orderStatusChanged}
                onChange={() => handleNotificationChange('orderStatusChanged')}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Low Inventory</p>
              <p className="text-sm text-gray-500">Get notified when inventory falls below threshold</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={notificationPrefs.inventoryLow}
                onChange={() => handleNotificationChange('inventoryLow')}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Manufacturing Delays</p>
              <p className="text-sm text-gray-500">Get notified about potential manufacturing delays</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={notificationPrefs.manufacturingDelays}
                onChange={() => handleNotificationChange('manufacturingDelays')}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
        
        <h3 className="font-medium text-lg mt-8 mb-4">Report Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Daily Reports</p>
              <p className="text-sm text-gray-500">Get daily summary reports</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={notificationPrefs.dailyReports}
                onChange={() => handleNotificationChange('dailyReports')}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Weekly Reports</p>
              <p className="text-sm text-gray-500">Get weekly summary reports</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={notificationPrefs.weeklyReports}
                onChange={() => handleNotificationChange('weeklyReports')}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Monthly Reports</p>
              <p className="text-sm text-gray-500">Get monthly summary reports</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={notificationPrefs.monthlyReports}
                onChange={() => handleNotificationChange('monthlyReports')}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
        
        <div className="mt-8">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
            <Save className="w-4 h-4 mr-2" />
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
  
  const renderSystemTab = () => (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">System Settings</h2>
        <p className="text-gray-500 mt-1">Configure system behaviors and defaults</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-medium text-lg mb-4">General Settings</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Low Inventory Threshold
                </label>
                <input 
                  type="number" 
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" 
                  value={systemSettings.inventoryThreshold}
                  onChange={(e) => handleSystemSettingChange('inventoryThreshold', parseInt(e.target.value))}
                />
                <p className="mt-1 text-sm text-gray-500">Alert when stock falls below this number</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Backup Frequency
                </label>
                <select 
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  value={systemSettings.backupFrequency}
                  onChange={(e) => handleSystemSettingChange('backupFrequency', e.target.value)}
                >
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">System Behavior</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Auto-assign Manufacturing</p>
                  <p className="text-sm text-gray-500">Automatically assign orders to manufacturing managers</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={systemSettings.autoAssignManufacturing}
                    onChange={() => handleSystemSettingChange('autoAssignManufacturing', !systemSettings.autoAssignManufacturing)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-sm text-gray-500">Use dark color scheme throughout the app</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={systemSettings.enableDarkMode}
                    onChange={() => handleSystemSettingChange('enableDarkMode', !systemSettings.enableDarkMode)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Send Reminders</p>
                  <p className="text-sm text-gray-500">Send deadline reminders to manufacturing teams</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={systemSettings.sendReminders}
                    onChange={() => handleSystemSettingChange('sendReminders', !systemSettings.sendReminders)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Require Order Approval</p>
                  <p className="text-sm text-gray-500">Orders require explicit approval before processing</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={systemSettings.orderApprovalRequired}
                    onChange={() => handleSystemSettingChange('orderApprovalRequired', !systemSettings.orderApprovalRequired)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <div className="flex border-b">
        <button 
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'users' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('users')}
        >
          <div className="flex items-center">
            <User className="w-4 h-4 mr-2" />
            User Management
          </div>
        </button>
        <button 
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'notifications' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('notifications')}
        >
          <div className="flex items-center">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </div>
        </button>
        <button 
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'system' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('system')}
        >
          <div className="flex items-center">
            <SettingsIcon className="w-4 h-4 mr-2" />
            System
          </div>
        </button>
      </div>
      
      <div className="mt-6">
        {activeTab === 'users' && renderUsersTab()}
        {activeTab === 'notifications' && renderNotificationsTab()}
        {activeTab === 'system' && renderSystemTab()}
      </div>
    </div>
  );
};

export default SettingsPage;