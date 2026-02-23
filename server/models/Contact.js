const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    /* who submitted */
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },

    /* message details */
    subject: { type: String, required: true, trim: true },
    category: { type: String, enum: ['general', 'bug', 'feature', 'billing', 'other'], default: 'general' },
    message: { type: String, required: true },

    /* status tracking */
    status: { type: String, enum: ['open', 'in-progress', 'replied', 'closed'], default: 'open' },
    adminNote: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
