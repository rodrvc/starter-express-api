const express = require('express')
const app = express()
var hmac = require('js-crypto-hmac');
var crypto = require('crypto');
var sha256 =  require('crypto-js/sha256');
var hmacSHA256 =  require('crypto-js/hmac-sha256');
var Hex  = 'crypto-js/hash/enc-hex';


app.use(express.json())

app.get('/', function (req, res) {
    res.send('hello world')
})

app.post('/', function (req, res) {
    // console.log(json(req.body))
    const key = "x2jZoYWO4aKcxrS96ds0aaKVBI8ChpXmAUQ4N5L22kBWgxRmXIehniAhejZOrA48";
    // const hash = 'SHA-256';
    const msg = JSON.stringify(req.body);


    console.log(msg)
    const mac = req.headers['x-linkify-confirmation'];
    const signature = crypto
        .createHmac('sha256', key)
        .update(msg)
        .digest('hex')


    console.log({
        signature,
        mac 
    
    })

    if(signature == mac){
        let response = {
            status: 'accepted',
            message: 'Signature accepted',
            redirect: null,
            restart:  true,
        }
        console.log("Response 2")
        res.send(response);
        return;
    }

    console.log("Response 1")
    res.send('hello world');
})


app.listen(process.env.PORT || 3001)