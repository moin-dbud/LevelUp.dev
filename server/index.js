require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { router: authRouter } = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

/* ── Middleware ── */
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

/* ── Routes ── */
app.use('/api/auth', authRouter);

app.get('/', (_, res) => res.json({ status: 'LevelUp.dev API running ✅' }));

/* ── MongoDB connect & start ── */
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('✅ MongoDB connected');
        app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
    })
    .catch(err => {
        console.error('❌ MongoDB connection failed:', err.message);
        process.exit(1);
    });
