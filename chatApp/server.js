var express = require('express'),
    app = express(),
    server = require('http').createServer(app);

var appPort = parseInt(process.env.PORT) || 9000;

app.use(express.static(__dirname + '/public'));

server.listen(appPort, function() {
    console.log('Express server listening on port ' + appPort);
});