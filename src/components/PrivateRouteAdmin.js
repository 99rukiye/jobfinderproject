import React from 'react';
import { Navigate } from 'react-router-dom';
import { getRoleFromToken } from '../services/authService';

const PrivateRouteAdmin = ({ children }) => {
  const token = localStorage.getItem('token');
  const role = token ? getRoleFromToken(token) : null;

  if (!token || role !== 'ADMIN') {
    return <Navigate to="/" replace />; // Giriş sayfasına yönlendir
  }

  return children;
};

export default PrivateRouteAdmin;
