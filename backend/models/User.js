const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: false }, // Field baru untuk nama pengguna
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String, required: false, default: 'default-profile.png' }, // Field untuk gambar profil
});

// Middleware untuk hashing password sebelum menyimpan
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model('User', UserSchema);
