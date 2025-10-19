const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/userRoutes');
const healthRoute = require('./src/routes/healthRoute');

const mongoose = require('mongoose');
mongoose.connect('mongodb://userBackOwner:P%40ssw0rd@127.0.0.1:27017/user-back?authSource=user-back');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/user', userRoutes);
app.use('/health', healthRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});