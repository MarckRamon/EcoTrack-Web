import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import LandingPage from './LandingPage';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import ForgotPassword from './ForgotPassword';
import SetNewPassword from './SetNewPassword';
import EditProfile from './EditProfile';
import Users from './Users';
import JobOrderRequest from './JobOrderRequest';
import CollectionPoints from './CollectionPoints';
import CollectionSchedule from './CollectionSchedule';
import Trucks from './Trucks';
import AuthSynchronizer from './components/AuthSynchronizer';
import './App.css';

// Protected route component that checks authentication
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token') !== null;
  const location = useLocation();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    console.log('🔒 Access denied: Authentication required for', location.pathname);
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // If authenticated, render the children
  return children ? children : <Outlet />;
};

function App() {
  const [isInitialized, setIsInitialized] = useState(false);
  const location = useLocation();

  // Determine if current page is a public route
  const isPublicRoute = () => {
    const path = location.pathname;
    return path === '/' || 
           path === '/forgot-password' || 
           path === '/set-new-password';
  };

  // Initialize authentication on app start - but do less work on public routes
  useEffect(() => {
    const initializeAuth = async () => {
      // For public routes, no need to check token extensively
      if (isPublicRoute()) {
        setIsInitialized(true);
        return;
      }
      
      // For protected routes, check for token
      const token = localStorage.getItem('token');
      if (token) {
        console.log('🔑 Found existing authentication token');
      } else {
        console.log('⚠️ No authentication token found, user needs to log in');
      }
      setIsInitialized(true);
    };

    initializeAuth();
  }, [location.pathname]);

  if (!isInitialized) {
    return <div>Loading application...</div>;
  }

  return (
    <>
      {/* Include the AuthSynchronizer component that runs in the background */}
      <AuthSynchronizer />
      
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<AdminLogin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/set-new-password" element={<SetNewPassword />} />
        
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/profile" element={<EditProfile />} />
          <Route path="/users" element={<Users />} />
          <Route path="/job-orders" element={<JobOrderRequest />} />
          <Route path="/collection-points" element={<CollectionPoints />} />
          <Route path="/schedule" element={<CollectionSchedule />} />
          <Route path="/trucks" element={<Trucks />} />
        </Route>
        
        {/* Redirects for old /admin paths */}
        <Route path="/admin/login" element={<Navigate to="/" replace />} />
        <Route path="/admin/dashboard" element={<Navigate to="/dashboard" replace />} />
        <Route path="/admin/forgot-password" element={<Navigate to="/forgot-password" replace />} />
        <Route path="/admin/set-new-password" element={<Navigate to="/set-new-password" replace />} />
        <Route path="/admin/profile" element={<Navigate to="/profile" replace />} />
        <Route path="/admin/users" element={<Navigate to="/users" replace />} />
        <Route path="/admin/job-orders" element={<Navigate to="/job-orders" replace />} />
        <Route path="/admin/collection-points" element={<Navigate to="/collection-points" replace />} />
        <Route path="/admin/schedule" element={<Navigate to="/schedule" replace />} />
        <Route path="/admin/trucks" element={<Navigate to="/trucks" replace />} />
        
        {/* Catch all route - redirect to login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

// Wrap the App with Router to use location in the App component
function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWithRouter;
