const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname + './dist/login-app'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/login-app/'}),
);


app.listen(process.env.PORT || 8080);