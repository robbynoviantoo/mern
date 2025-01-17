import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token'); // Ambil token dari Local Storage

    if (!token) {
        return <Navigate to="/" replace />; // Arahkan ke login jika tidak ada token
    }

    return children;
};

export default ProtectedRoute;
