const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = process.env.PORT || 3300;

// Middleware biar bisa baca body JSON dari POST request
app.use(express.json());

// Koneksi ke MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3309', // sesuai punya kamu
    password: 'Raehanarjun07.',
    database: 'mahasiswa'
});

// Cek koneksi database
db.connect((err) => {
    if (err) {
        console.log('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL successfully');
});
