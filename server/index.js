require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();

const dbConnect = require('./Database/dbConfig');

// import dotenv from 'dotenv';
// dotenv.config();

const PORT = process.env.PORT||5000;

app.use(cors());
app.use(bodyParser.json());
app.use(router);

dbConnect.once('open', function () {           
    console.log('DB Connected');
});

dbConnect.on('error', function (err) {
    console.log('DB ERROR : ', err);
});


router.get("/", (req, res) => {
    res.send({ response: "Server is up and running." }).status(200);
});

app.listen(PORT, () => {
    console.log("Server is running on Port: " + PORT);
});


