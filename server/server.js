var express = require('express');

var app = express();

app.get('/cars', function (req, res) {
    res.send({
        data: [
            {
                make: 'BMW',
                model: '4 series',
                year: 2014
            },
            {
                make: 'BMW',
                model: '3 series',
                year: 2011
            },
            {
                make: 'BMW',
                model: '7 series',
                year: 2013
            },
            {
                make: 'Mercedes',
                model: 'C-Class',
                year: 2012
            },
            {
                make: 'Mercedes',
                model: 'S-Class',
                year: 2010
            },
            {
                make: 'Audi',
                model: 'A4',
                year: 2015
            },
            {
                make: 'Audi',
                model: 'A5',
                year: 2012
            },
            {
                make: 'Ford',
                model: 'Fusion',
                year: 2011
            }
        ]
    });
});

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
});