const express = require('express');
const cors = require('cors');
const app = express();
const fetch = require("node-fetch");
const readline = require("readline-sync");
require('dotenv').config({path:'.././.env'});


app.use(cors());
var PORT1 = 6000;
// var PORT = 5000;
var PORT = process.env.BROKERPORT;

var TESTTOPIC = 'two';
var MES = "Heyyy f U";

var envtt = process.argv[2].split('=');
var envport = process.argv[3].split('=');

TESTTOPIC=envtt;
var message = process.argv[4];
MES = message;
PORT1=parseInt(envport[1]);
console.log(envtt[1], parseInt(envport[1]));
console.log(MES);


app.listen(PORT1, (req, res) => {
    try {
        fetch(`http://127.0.0.1:${PORT}/api/producer?testtopic=${TESTTOPIC}`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: MES }),
        }).then(data => console.log(data));
    } catch {
        return null;
    }
    console.log(`PORT NUMBER ${PORT1} HAS STARTED`);
})