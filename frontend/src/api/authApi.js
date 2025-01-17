// frontend/src/api/authApi.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/auth';

// Fungsi untuk login
export const loginUser = async (credentials) => {
    return await axios.post(`${API_URL}/login`, credentials);
};

// Fungsi untuk register
export const registerUser = async (credentials) => {
    return await axios.post(`${API_URL}/register`, credentials);
};

export const userList = async () => {
    const token = localStorage.getItem('token'); // Ambil token dari Local Storage
    return await axios.get(`${API_URL}/users`, {
        headers: {
            Authorization: `Bearer ${token}`, // Tambahkan token ke header
        },
    });
};

export const getUser = async (id) => {
    const token = localStorage.getItem('token'); // Ambil token dari Local Storage
    return await axios.get(`${API_URL}/users/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`, // Tambahkan token ke header
        },
    });
    
};

export const updateUser = async (id, userData) => {
    const token = localStorage.getItem('token'); // Ambil token dari Local Storage
    return await axios.put(`${API_URL}/users/${id}`, userData, {
        headers: {
            Authorization: `Bearer ${token}`, // Tambahkan token ke header
        },
    });
};

export const deleteUser = async (id) => {
    const token = localStorage.getItem('token');
    return await axios.delete(`${API_URL}/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

