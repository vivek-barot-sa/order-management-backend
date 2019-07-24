const express = require('express');
const bodyparser = require('body-parser');
const api = require('./Routes/api');
const cors = require('cors');

const PORT = 9966;

const app = express();

app.use(cors());
app.use(bodyparser.json());

app.use('/api', api);

app.get('/', function(req, res) {
    res.send("Hello from server.");
});

app.listen(PORT, function() {
    console.log("Server running on localhost : " + PORT);
});