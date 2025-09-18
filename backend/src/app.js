require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
require('express-async-errors');

const cors = require('cors');

const authRoutes = require('./routes/auth');
const leadsRoutes = require('./routes/leads');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());
app.use(cookieParser());

// CORS - allow frontend origin to send credentials
const FRONTEND_URL = process.env.FRONTEND_URL ;
app.use(cors({
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  origin: "https://lead-management-system-silk.vercel.app/",
  credentials: true
=======
  origin: '*'
>>>>>>> Stashed changes
=======
  origin: '*'
>>>>>>> Stashed changes
}));

app.use('/api/auth', authRoutes);
app.use('/api/leads', leadsRoutes);

// fallback
app.get('/', (req, res) => res.json({ ok: true }));

app.use(errorHandler);

module.exports = app;
