// Create web server
var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
// Connect to database
var connectionString = require(path.join(__dirname, '../', '../', 'config'));
// GET comments
router.get('/api/v1/comments', function(req, res) {
  var results = [];
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }
    // SQL Query > Select Data
    var query = client.query("SELECT * FROM comments ORDER BY id ASC;");
    // Stream results back one row at a time
    query.on('row', function(row) {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});
// GET single comment by id
router.get('/api/v1/comments/:comment_id', function(req, res) {
  var results = [];
  // Grab data from the URL parameters
  var id = req.params.comment_id;
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }
    // SQL Query > Select Data
    var query = client.query("SELECT * FROM comments WHERE id=($1)", [id]);
    // Stream results back one row at a time
    query.on('row', function(row) {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});
// POST comment
router.post('/api/v1/comments', function(req, res) {
  var results = [];
  // Grab data from http request
  var data = {name: req.body.name, comment: req.body.comment, post_id: req.body.post_id};
  // Get a Postgres client from the connection pool
  pg.connect(connectionString
