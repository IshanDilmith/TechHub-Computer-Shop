const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
require('dotenv').config();
const path = require('path');


const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));
app.use(express.json());
app.use(bodyParser.json());

const pcItemRouter = require('./routes/pcItems');
app.use('/PCItemImages', express.static(path.join(__dirname, 'PCItemImages')));
app.use('/pcItems', pcItemRouter);

const itemCategoryRouter = require('./controllers/itemCategory');
app.use('/itemCategory', itemCategoryRouter);

const userRouter = require('./routes/user');
app.use('/user', userRouter);

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);


const URL = process.env.MONGODB_URL;

mongoose.connect(URL).then(() => {
    console.log('Database connected');
}).catch((error) => console.error('Error connecting to MongoDB:', error));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


