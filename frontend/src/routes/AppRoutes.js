// frontend/src/routes/AppRoutes.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';
import UserList from '../components/UserList';
import ProtectedRoute from '../components/ProtectedRoute';



const AppRoutes = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
                path="/users"
                element={
                    <ProtectedRoute>
                        <UserList />
                    </ProtectedRoute>
                }
            />
        </Routes>
    </Router>
);

export default AppRoutes;
