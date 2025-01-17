// backend/routes/authRoutes.js
const express = require('express');
const { registerUser, loginUser, getUsers, getUserById } = require('../controllers/authController');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

// Endpoint Registrasi
router.post('/register', registerUser);

// Endpoint Login
router.post('/login', loginUser);

// Endpoint Mendapatkan Semua Pengguna
router.get('/users', authenticate , getUsers);

// Endpoint Mendapatkan Pengguna Berdasarkan ID
router.get('/users/:id', authenticate , getUserById);

module.exports = router;