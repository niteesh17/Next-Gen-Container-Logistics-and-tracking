const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000;

// Enable CORS
app.use(cors());

// Parse JSON request bodies
app.use(bodyParser.json());

// MySQL Connection
const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,  // Default MySQL port
    user: 'root',
    password: 'nit@2004',
    database: 'container',
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Route to fetch admin data
app.get('/values', (req, res) => {
    const query = `SELECT * FROM admin`;

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        console.log('Query Results:', results);
        res.json({ message: "Successfully queried", data: results });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
