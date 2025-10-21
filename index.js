require('dotenv').config({ path: './config/.env' }); // Load environment variables from config folder

const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/userRoutes');
const healthRoute = require('./src/routes/healthRoute');

const mongoose = require('mongoose');

// Encode credentials to handle special characters
const mongoUser = encodeURIComponent(process.env.MONGODB_USER);
const mongoPassword = encodeURIComponent(process.env.MONGODB_PASSWORD);
const mongoURI = `mongodb://${mongoUser}:${mongoPassword}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}?authSource=${process.env.MONGODB_DATABASE}`;

mongoose.connect(mongoURI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(cors());

app.use('/user', userRoutes);
app.use('/health', healthRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});