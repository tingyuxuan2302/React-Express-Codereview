const express = require('express');
const path = require('path');

const app = express();

app.get('/api/getList', (req, res) => {
    var list = ["item1", "item2", "item3"];
    res.json(list);
    console.log('Sent list of items');
});

const port = 5000;

app.listen(port);
