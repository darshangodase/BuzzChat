const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const connectDB = require('./config/connectDB');
const router = require('./routes/index');
require('dotenv').config();

// Connect to the database
connectDB();

// All middlewares
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

// Express JSON middleware is used for form data submission
app.use(express.json());

// Express URL encoded middleware
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

// Use the router
app.use('/api', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});