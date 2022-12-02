const express = require('express');
const cors = require('cors');
const app = express();
const fetch = require("node-fetch");
require('dotenv').config({path:'.././.env'});


var PORT = 8888

var TESTTOPIC = 'two'
var envtt = process.argv[2].split('=');
var envport = process.argv[3].split('=');
var from_beg = false;
if (process.argv.length == 5 && process.argv[4] == '--from-beginning') {
    from_beg = true;
}
// console.log(envtt[1], parseInt(envport[1]));
PORT = parseInt(envport[1]);
TESTTOPIC = envtt;
app.get('/message', (req, res) => {
    const mess = req.query.mess;
    console.log(mess);
    res.send('received')
})

function fetchdet(){
    const BROKERPORT=process.env.BROKERPORT;

    try {
        fetch(`http://127.0.0.1:${BROKERPORT}/portmessage?portnum=${PORT}&testtopic=${TESTTOPIC}&allflag=${from_beg}`)
            .then(res=>res.json())
            .then(data => {
                data.map((row,index)=>{
                    console.log(row.message);
                })

            }
            )
            .catch((err)=>{
                fetchdet();
            })
    } catch {
        fetchdet();
        return null;
    }

}


app.listen(PORT, (req, res) => {
    fetchdet();
    console.log(`PORT NUMBER ${PORT} HAS STARTED`);
})