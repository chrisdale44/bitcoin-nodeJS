var express = require("express");
var app = express();
var request = require("request");
var bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

app.get("/", function(req, res) {
    res.sendFile("./index.html", { root: __dirname });
});

app.post("/wallet", function(req, res) {
    var brainsrc = req.body.brainsrc;
    res.send("complete ", brainsrc)
});

app.listen(8080, function() {
    console.log("server running on localhost:8080")
});