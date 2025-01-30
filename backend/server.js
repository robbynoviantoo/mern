const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use("/api/item", todoRoutes);

// Connect to DB and Start Server
connectDB();
app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
