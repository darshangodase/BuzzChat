const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/connectDB');
const router = require('./routes/index');
const { app, server } = require('./socket/index');

require('dotenv').config();

// Connect to the database
connectDB();

// All middlewares
app.use(cors({
    origin:'https://buzzchatapp.netlify.app',
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
server.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});