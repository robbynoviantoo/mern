// frontend/src/components/Navbar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <nav className="bg-blue-500 text-white shadow-md">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                <h1 className="text-2xl font-bold">My App</h1>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar; // Ekspor default
