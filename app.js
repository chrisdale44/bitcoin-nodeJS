var http = require("http");
var request = require("request");

http.createServer(function(req, res){
    request({
        url: "https://blockchain.info/stats?format=json",
        json: true
    }, function(error, response, body) {
        console.log(body);
    });
    console.log("hi I'm a new bitoin user");
    res.end("bitcoin to the moon")
}).listen(8080);