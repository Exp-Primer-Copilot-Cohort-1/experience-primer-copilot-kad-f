// Create web Server
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');

// db와 연결
const db = require('./db');
db.connect();

// app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// ejs setting
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Router
const indexRouter = require('./routes/index');
const commentRouter = require('./routes/comment');

app.use('/', indexRouter);
app.use('/comment', commentRouter);

// Server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
