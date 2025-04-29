
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from './Header';
import NavBar from './NavBar';

const Layout = ({ requiredRole, children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }
  
  // Redirect to login if not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  // Redirect if role doesn't match
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={user.role === 'faculty' ? '/faculty/dashboard' : '/student/dashboard'} />;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <NavBar />
        <main className="flex-1 p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
