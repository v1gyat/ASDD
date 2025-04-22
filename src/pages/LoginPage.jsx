import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

/**
 * LoginPage Component
 * 
 * A comprehensive login page that allows users to authenticate by entering their
 * credentials and selecting their role. Upon successful validation, the user is
 * redirected to their role-specific dashboard.
 */

const LoginPage = () => {
  // Access navigation and user context
  const navigate = useNavigate();
  const { login } = useUser();
  const sampleUsers = [
  {
    userId: 'owner001',
    fullName: 'Alice',
    password: 'owner123',
    role: 'Business Owner',
  },
  {
    userId: 'manager101',
    fullName: 'Bob Singh',
    password: 'manager123',
    role: 'Manufacturing Manager',
  },
  {
    userId: 'inv999',
    fullName: 'Carol Gupta',
    password: 'inventory123',
    role: 'Inventory Manager',
  },
];
  // Form state
  const [formData, setFormData] = useState({
    userId: '',
    fullName: '',
    password: '',
    role: ''
  });
  
  // UI state
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  /**
   * Handle input changes and update form state
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    
    // Clear error when user makes changes
    if (error) setError('');
  };
  
  /**
   * Validate form inputs
   * @returns {boolean} - Whether form is valid
   */
  const validateForm = () => {
    // Check if any field is empty
    for (const key in formData) {
      if (!formData[key]) {
        setError(`Please fill in all fields. ${key.charAt(0).toUpperCase() + key.slice(1)} is required.`);
        return false;
      }
    }
    
    // Simple password validation (min 6 characters)
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    
    return true;
  };
  
  /**
   * Handle form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Reset error state
    setError('');
    
    // Validate form
    if (!validateForm()) return;
    
    // Show loading state
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      try {
        // In a real application, this would be an API call to validate credentials
        // For this example, we'll use simulated authentication with dummy validation
        
        // Create user object from form data (excluding password)
        const user = {
          id: formData.userId,
          name: formData.fullName,
          role: formData.role.toLowerCase().replace(' ', '-'), // Convert "Business Owner" to "business-owner"
          // Add any additional user properties here
        };
        
        // Store user in global state
        login(user);
        
        // Determine redirect path based on role
        const dashboardPath = `/dashboard/${user.role}`;
        
        // Navigate to appropriate dashboard
        navigate(dashboardPath);
      } catch (err) {
        setError(err.message || 'Authentication failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }, 1000); // Simulate network delay
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md px-8 py-10 bg-white rounded-lg shadow-md">
        {/* Header and Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-steel-blue-700">Synergence Portal</h1>
          <div className="h-1 w-16 bg-amber-500 mx-auto mt-2"></div>
          <p className="text-gray-500 mt-2">Enter your credentials to access the system</p>
        </div>
        
        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* User ID Field */}
          <div>
            <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">
              User ID
            </label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              placeholder="Enter your user ID"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
          
          {/* Full Name Field */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
          
          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
          
          {/* Role Selection */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-colors"
            >
              <option value="">Select your role</option>
              <option value="Business Owner">Business Owner</option>
              <option value="Manufacturing Manager">Manufacturing Manager</option>
              <option value="Inventory Manager">Inventory Manager</option>
            </select>
          </div>
          
          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-sm bg-red-50 p-3 rounded border border-red-200">
              {error}
            </div>
          )}
          
          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isLoading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing In...
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
        
        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Synergence Portal. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default LoginPage;