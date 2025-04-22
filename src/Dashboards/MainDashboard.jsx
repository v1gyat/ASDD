import { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

// Assuming these components are already created elsewhere in your project
// import BusinessOwnerDashboard from './dashboards/BusinessOwnerDashboard';
// import ManufacturingManagerDashboard from './dashboards/ManufacturingManagerDashboard';
// import InventoryManagerDashboard from './dashboards/InventoryManagerDashboard';

// Create User Context
const UserContext = createContext(null);

// Mock User Database - Replace with your actual authentication method later
const mockUsers = [
  {
    id: "BO001",
    name: "Aryan Sharma",
    password: "admin123",
    role: "Business Owner"
  },
  {
    id: "MM101",
    name: "Ravi Patel",
    password: "floor321",
    role: "Manufacturing Manager"
  },
  {
    id: "IM202",
    name: "Priya Mehta",
    password: "inventory007",
    role: "Inventory Manager"
  }
];

// User Provider Component
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Persist user data in localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user context
const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useUser();
  const location = useLocation();
  
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return children;
};

// Login Page Component
const LoginPage = () => {
  const [userId, setUserId] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validate form
    if (!userId || !fullName || !password || !role) {
      setError('All fields are required');
      setIsLoading(false);
      return;
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Find user in mock database
    const user = mockUsers.find(u => 
      u.id === userId && 
      u.name === fullName && 
      u.password === password &&
      u.role === role
    );

    if (user) {
      // Remove password before storing user data
      const { password, ...safeUserData } = user;
      login(safeUserData);

      // Redirect based on role
      let dashboardPath = '/dashboard/';
      switch (user.role) {
        case 'Business Owner':
          dashboardPath += 'business-owner';
          break;
        case 'Manufacturing Manager':
          dashboardPath += 'manufacturing-manager';
          break;
        case 'Inventory Manager':
          dashboardPath += 'inventory-manager';
          break;
        default:
          dashboardPath += 'general';
      }
      navigate(dashboardPath);
    } else {
      setError('Invalid credentials. Please try again.');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Synergence Portal
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Smart Manufacturing Dashboard
          </p>
        </div>
        
        <div className="mt-8 bg-white py-8 px-4 shadow rounded-2xl sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div>
              <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
                User ID
              </label>
              <div className="mt-1">
                <input
                  id="userId"
                  name="userId"
                  type="text"
                  autoComplete="username"
                  required
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <div className="mt-1">
                <select
                  id="role"
                  name="role"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Select Role</option>
                  <option value="Business Owner">Business Owner</option>
                  <option value="Manufacturing Manager">Manufacturing Manager</option>
                  <option value="Inventory Manager">Inventory Manager</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  "Sign in"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Sample Dashboard Layout (If you need to wrap your existing dashboards)
const DashboardLayout = ({ children, title }) => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700">Welcome, {user?.name}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
};

// Main App Component - Connect this to your existing dashboards
const App = () => {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          {/* Replace these Route components with your actual dashboard components */}
          <Route 
            path="/dashboard/business-owner" 
            element={
              <ProtectedRoute>
                {/* Replace this with your actual BusinessOwnerDashboard component */}
                <DashboardLayout title="Business Owner Dashboard">
                  <div>Your Business Owner Dashboard Content</div>
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/dashboard/manufacturing-manager" 
            element={
              <ProtectedRoute>
                {/* Replace this with your actual ManufacturingManagerDashboard component */}
                <DashboardLayout title="Manufacturing Manager Dashboard">
                  <div>Your Manufacturing Manager Dashboard Content</div>
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/dashboard/inventory-manager" 
            element={
              <ProtectedRoute>
                {/* Replace this with your actual InventoryManagerDashboard component */}
                <DashboardLayout title="Inventory Manager Dashboard">
                  <div>Your Inventory Manager Dashboard Content</div>
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </UserProvider>
    </Router>
  );
};

export default App;