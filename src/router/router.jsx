import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import BusinessOwner from './Dashboards/BusinessOwner';
import { useUser } from './context/UserContext';

// Temporarily import placeholder components or uncomment your actual components
// import ManufacturingManager from '../Dashboards/ManufacturingManager';
// import InventoryManager from '../Dashboards/InventoryManager';
// import OrdersPage from '../pages/OrdersPage';
import DashboardLayout from '../components/DashboardLayout'; // Uncomment this

// Placeholder components (remove these when you have the actual components)
const ManufacturingManager = () => <div>Manufacturing Manager Dashboard</div>;
const InventoryManager = () => <div>Inventory Manager Dashboard</div>;
const OrdersPage = () => <div>Orders Page</div>;

// If DashboardLayout is not available yet, create a simple placeholder
// const DashboardLayout = ({ children }) => <div className="dashboard-layout">{children}</div>;

/**
 * Protected Route Component
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useUser();
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Redirect to login if user doesn't have the required role
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }
  
  // Apply role-specific theme class
  let themeClass = 'bg-gray-100'; // Default theme
  
  if (user.role === 'business-owner') {
    themeClass = 'bg-blue-100';
  } else if (user.role === 'manufacturing-manager') {
    themeClass = 'bg-green-100';
  } else if (user.role === 'inventory-manager') {
    themeClass = 'bg-yellow-100';
  }
  
  // Render the route's component within the DashboardLayout
  return (
    <div className={themeClass}>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </div>
  );
};

/**
 * Router Component
 */
const Router = () => {
  const { isAuthenticated, user } = useUser();
  
  // Determine where to redirect based on user role
  const getHomePage = () => {
    if (!isAuthenticated) return '/login';
    
    switch (user?.role) {
      case 'business-owner':
        return '/dashboard/business-owner';
      case 'manufacturing-manager':
        return '/dashboard/manufacturing-manager';
      case 'inventory-manager':
        return '/dashboard/inventory-manager';
      default:
        return '/login';
    }
  };
  
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      
      {/* Protected Routes with Role-Based Access */}
      <Route 
        path="/dashboard/business-owner"
        element={
          <ProtectedRoute allowedRoles={['business-owner']}>
            <BusinessOwner />
          </ProtectedRoute>
        }
      />
      
      <Route 
        path="/dashboard/manufacturing-manager"
        element={
          <ProtectedRoute allowedRoles={['manufacturing-manager']}>
            <ManufacturingManager />
          </ProtectedRoute>
        }
      />
      
      <Route 
        path="/dashboard/inventory-manager"
        element={
          <ProtectedRoute allowedRoles={['inventory-manager']}>
            <InventoryManager />
          </ProtectedRoute>
        }
      />
      
      {/* Orders Page - accessible to all authenticated users */}
      <Route 
        path="/orders"
        element={
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        }
      />
      
      {/* Default Route - Redirect to appropriate homepage based on auth status & role */}
      <Route path="*" element={<Navigate to={getHomePage()} replace />} />
    </Routes>
  );
};

export default Router;