var express = require("express");
var app = express();
var request = require("request");

request({
    url: "https://blockchain.info/stats?format=json",
    json: true
}, function(error, response, body) {
    btcPrice = body.market_price_usd
});

app.get("/", function(req, res) {
    res.send("bitcoin to the moon: $" + btcPrice);
});

app.listen(8080, function() {
    console.log("server running")
});