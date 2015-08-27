var express = require('express'),
    cars = require('./cars.json');

var app = express();

app.get('/cars', function (req, res) {
    res.send({
        data: cars
    });
});

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
});