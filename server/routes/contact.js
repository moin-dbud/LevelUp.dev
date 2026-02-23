const express = require('express');
const Contact = require('../models/Contact');
const { sendMail } = require('../utils/email');
const { contactUserTemplate, contactAdminTemplate } = require('../utils/emailTemplates');

const router = express.Router();

/* ──────────────────────────────────────────
   POST /api/contact  — submit a contact form
────────────────────────────────────────── */
router.post('/', async (req, res) => {
    try {
        const { name, email, subject, category, message, userId } = req.body;

        /* basic validation */
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ message: 'Invalid email address.' });
        }
        if (message.length < 10) {
            return res.status(400).json({ message: 'Message must be at least 10 characters.' });
        }

        /* save to DB */
        const ticket = await Contact.create({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            subject: subject.trim(),
            category: category || 'general',
            message: message.trim(),
            userId: userId || null,
        });

        /* send confirmation email to user */
        try {
            await sendMail(
                ticket.email,
                `We received your message — "${ticket.subject}"`,
                contactUserTemplate(ticket.name, ticket.subject)
            );
        } catch (_) { /* non-critical */ }

        /* send notification to admin */
        try {
            await sendMail(
                process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
                `[Contact] ${ticket.category.toUpperCase()} — ${ticket.subject}`,
                contactAdminTemplate(ticket)
            );
        } catch (_) { /* non-critical */ }

        res.status(201).json({ message: 'Message sent successfully!', ticketId: ticket._id });
    } catch (err) {
        console.error('Contact form error:', err);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

module.exports = router;
