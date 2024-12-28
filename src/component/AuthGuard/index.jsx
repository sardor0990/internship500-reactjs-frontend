import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';



const AuthGuard = ({ children, to, requiredRole }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');

  // Replace with your token checking logic
  const isAuthenticated = !!localStorage.getItem('token'); // Example check

  if (!isAuthenticated) {
    // Redirect them to the login page if not authenticated
    return <Navigate to={to} state={{ from: location }} replace />;
  }

  try{
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    const userType = tokenPayload.user_type;

    if(requiredRole && userType !== requiredRole){
      return <Navigate to="/login" replace />
    }
  }catch(error){
    console.log('Error decoding token:', error);
    return <Navigate to="/login" state={{from: location}} replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
