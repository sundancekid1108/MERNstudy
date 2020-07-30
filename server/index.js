//require('dotenv').config();
import dotenv from 'dotenv';
dotenv.config();

const express = require('express');
const router = require('./route');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();

const dbConnect = require('./Database/dbConfig');

// import dotenv from 'dotenv';
// dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan('combined'));
app.use(router);

//Database Connect
dbConnect();

app.listen(PORT, () => {
  console.log('Server is running on Port: ' + PORT);
});
