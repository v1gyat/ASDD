import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import LoginPage from './pages/LoginPage';
import BusinessOwner from './Dashboards/BusinessOwner';
import './index.css';

// Placeholder components (replace with your actual components when ready)
const ManufacturingManager = () => <div>Manufacturing Manager Dashboard</div>;
const InventoryManager = () => <div>Inventory Manager Dashboard</div>;
const OrdersPage = () => <div>Orders Page</div>;
const DashboardLayout = ({ children }) => <div className="dashboard-layout">{children}</div>;

// Create root element
const root = createRoot(document.getElementById('root'));

// Create router with data loaders and protected route logic
const router = createBrowserRouter([
{
  path: "/",
    element: <LandingPage />
},
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/dashboard/business-owner",
    element: <UserProvider><ProtectedRoute allowedRoles={['business-owner']}><BusinessOwner /></ProtectedRoute></UserProvider>,
  },
  {
    path: "/dashboard/manufacturing-manager",
    element: <UserProvider><ProtectedRoute allowedRoles={['manufacturing-manager']}><ManufacturingManager /></ProtectedRoute></UserProvider>,
  },
  {
    path: "/dashboard/inventory-manager",
    element: <UserProvider><ProtectedRoute allowedRoles={['inventory-manager']}><InventoryManager /></ProtectedRoute></UserProvider>,
  },
  {
    path: "/orders",
    element: <UserProvider><ProtectedRoute><OrdersPage /></ProtectedRoute></UserProvider>,
  },
  {
    path: "*",
    loader: () => {
      // Get home page logic
      const user = JSON.parse(localStorage.getItem('user') || 'null');
      const isAuthenticated = !!user;
      
      let redirectTo = '/login';
      
      if (isAuthenticated && user?.role) {
        switch (user.role) {
          case 'business-owner':
            redirectTo = '/dashboard/business-owner';
            break;
          case 'manufacturing-manager':
            redirectTo = '/dashboard/manufacturing-manager';
            break;
          case 'inventory-manager':
            redirectTo = '/dashboard/inventory-manager';
            break;
        }
      }
      
      return { redirectTo };
    },
    element: <RedirectComponent />
  }
]);

// Protected Route Component updated for React 19
function ProtectedRoute({ children, allowedRoles }) {
  const { user, isAuthenticated } = useUser();
  
  // Use React Router 7's new navigation
  const navigate = useNavigate();
  
  React.useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
      return;
    }
    
    // Redirect if not authorized for role
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, user, allowedRoles, navigate]);
  
  // If not authenticated or not authorized, render nothing while redirecting
  if (!isAuthenticated || (allowedRoles && !allowedRoles.includes(user.role))) {
    return null;
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
  
  // Render with theme
  return (
    <div className={themeClass}>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </div>
  );
}

// Redirect component for the catch-all route
function RedirectComponent() {
  const { redirectTo } = useRouteLoaderData("*");
  const navigate = useNavigate();
  
  React.useEffect(() => {
    navigate(redirectTo, { replace: true });
  }, [redirectTo, navigate]);
  
  return null;
}

// Import necessary hooks
import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import { useUser } from './context/UserContext';
import LandingPage from './pages/LandingPage';

// Render the app with the router provider
root.render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);