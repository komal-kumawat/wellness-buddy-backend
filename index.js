const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const userRoutes = require("./route/userRoutes"); 

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api/auth", userRoutes); 

const PORT = 5000;
const MONGO_URL = "mongodb+srv://komalK:komal%40123@atlascluster.fukzabb.mongodb.net/WellnessBuddy";

// Connect to MongoDB
mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DB CONNECTED successfully");
}).catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
});

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
