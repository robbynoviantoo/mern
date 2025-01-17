const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Format: "Bearer <token>"
    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Tambahkan informasi user ke objek request
        next(); // Lanjutkan ke handler berikutnya
    } catch (err) {
        res.status(403).json({ message: 'Invalid token' });
    }
};

module.exports = authenticate;
