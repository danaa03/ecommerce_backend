const express = require('express');
const app = express();

app.get('/' , (req,res) => {
    res.send('Welcome to my ecommerce site!');
});

module.exports = app;
