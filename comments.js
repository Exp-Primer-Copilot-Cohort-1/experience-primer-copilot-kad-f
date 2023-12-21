// Create Web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
// Create connection to database
const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'comments'
});
// Connect to database
db.connect();
// Use body-parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// Create GET route
app.get('/comments', (req, res) => {
    // Query database
    db.query('SELECT * FROM comments', (err, rows, fields) => {
        if (err) throw err;
        res.send(rows);
    });
});
// Create POST route
app.post('/comments', (req, res) => {
    // Query database
    db.query('INSERT INTO comments SET ?', req.body, (err, result) => {
        if (err) throw err;
        res.send('Comment added to database');
    });
});
// Create DELETE route
app.delete('/comments/:id', (req, res) => {
    // Query database
    db.query('DELETE FROM comments WHERE id = ?', [req.params.id], (err, result) => {
        if (err) throw err;
        res.send('Comment deleted from database');
    });
});
// Listen on port 3000
app.listen(port, () => console.log(`Listening on port ${port}`));