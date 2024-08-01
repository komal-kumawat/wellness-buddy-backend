const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const userRoutes = require('./route/userRoutes'); 

dotenv.config();
const app = express();

// Update CORS configuration
app.use(cors({
    origin: 'http://127.0.0.1:5500/practiceProject' // Replace with your actual frontend URL if different
}));

app.use(bodyParser.json());
app.use('/api/auth', userRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('DB CONNECTED successfully');
}).catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
});

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
