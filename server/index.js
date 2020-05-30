const express = require('express');
const cors = require('cors');
const http = require('http');
const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT;

app.use(cors);
