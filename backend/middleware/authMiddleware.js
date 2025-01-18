const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Format: "Bearer <token>"
    
    // Jika token tidak ada
    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No token provided' });
    }

    try {
        // Verifikasi token menggunakan JWT secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Menyimpan informasi user ke objek request
        req.user = decoded; 

        // Lanjutkan ke handler berikutnya tanpa memeriksa ID lagi di parameter URL
        next(); 
    } catch (err) {
        // Penanganan error jika token tidak valid atau kadaluarsa
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token has expired' });
        }
        return res.status(403).json({ message: 'Invalid token' });
    }
};

module.exports = authenticate;
