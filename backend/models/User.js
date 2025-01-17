const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserScema = new mongoose.Schema({
    name: { type: String, required: false }, // Field baru
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
});

UserScema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model('User', UserScema);