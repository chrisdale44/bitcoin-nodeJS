var express = require("express");
var app = express();
var request = require("request");
var bodyparser = require("body-parser");
var bitcore = require("bitcore-lib");

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

function brainWallet(userInput, callback) {
    var input = new Buffer(userInput);
    var hash = bitcore.crypto.Hash.sha256(input);
    var bn = bitcore.crypto.BN.fromBuffer(hash);
    var privateKey = new bitcore.PrivateKey(bn).toWIF();
    var address = new bitcore.PrivateKey(bn).toAddress();

    request({
        url: "https://blockchain.info/address/" + address + "?format=json",
        json: true
    }, function(error, response, body) {
        var n_transations = body.n_tx;
        callback(privateKey, address, n_transations); 
    });
}

app.get("/", function(req, res) {
    res.sendFile("./index.html", { root: __dirname });
});

app.post("/wallet", function(req, res) {
    var brainsrc = req.body.brainsrc;
    
    brainWallet(brainsrc, function(privateKey, address, n_transations) {
        res.send("The Brain wallet of: " + brainsrc + 
        "<br>Address: " + address + 
        "<br>Private key: " + privateKey +
        "<br>No. of transations: " + n_transations);
    });
});

app.listen(8080, function() {
    console.log("server running on localhost:8080")
});