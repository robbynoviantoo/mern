import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Fungsi untuk login
export const loginUser = async (credentials) => {
    return await axios.post(`${API_URL}/auth/login`, credentials);
};

// Fungsi untuk register
export const registerUser = async (credentials) => {
    return await axios.post(`${API_URL}/auth/register`, credentials);
};


