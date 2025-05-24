require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const { generatePDF } = require('./utils/pdfGenerator');
const fs = require('fs');

const app = express();
app.use(express.json());

// Database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Search endpoint
app.post('/api/search', (req, res) => {
    const { parcel_id, plot_number, owner_name } = req.body;
    
    let query = `SELECT * FROM land_parcels WHERE `;
    const conditions = [];
    
    if (parcel_id) conditions.push(`parcel_id = '${parcel_id}'`);
    if (plot_number) conditions.push(`plot_number = '${plot_number}'`);
    if (owner_name) conditions.push(`owner_name LIKE '%${owner_name}%'`);
    
    query += conditions.join(' OR ');
    
    db.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        
        if (results.length === 0) {
            return res.status(404).send('No records found');
        }
        
        const filename = `land_record_${Date.now()}.pdf`;
        generatePDF(results[0], filename);
        
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
        
        const fileStream = fs.createReadStream(filename);
        fileStream.pipe(res);
        
        fileStream.on('end', () => {
            fs.unlinkSync(filename); // Delete file after sending
        });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    db.connect(err => {
        if (err) throw err;
        console.log('Connected to database');
    });
});