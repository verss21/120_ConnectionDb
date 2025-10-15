const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = process.env.PORT || 3300;

// Middleware biar bisa baca body JSON dari POST request
app.use(express.json());
