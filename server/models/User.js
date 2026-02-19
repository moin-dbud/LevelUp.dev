const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    contact: { type: String, default: '' },
    dob: { type: String, default: '' },
    bio: { type: String, default: '' },
    role: { type: String, default: 'STUDENT' },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
