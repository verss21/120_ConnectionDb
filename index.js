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

// Route default
app.get('/', (req, res) => {
    res.send('Hello World! Express + MySQL is running.');
});

// ============================
// GET: Ambil semua data biodata
// ============================
app.get('/biodata', (req, res) => {
    const sql = 'SELECT * FROM biodata';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Gagal mengambil data dari database' });
        } else {
            res.json(results);
        }
    });
});

// ============================
// POST: Tambah data biodata
// ============================
app.post('/biodata', (req, res) => {
    const { nama, alamat, agama } = req.body;
    if (!nama || !alamat || !agama) {
        return res.status(400).json({ error: 'Semua field (nama, alamat, agama) wajib diisi' });
    }

    const sql = 'INSERT INTO biodata (nama, alamat, agama) VALUES (?, ?, ?)';
    db.query(sql, [nama, alamat, agama], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).json({ error: 'Gagal menambahkan data ke database' });
        } else {
            res.status(201).json({ message: 'Data berhasil ditambahkan', id: result.insertId });
        }
    });
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
