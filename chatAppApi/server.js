var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();

//===MIDDLEWARES
// parse application/x-www-form-urlencoded
 app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
 app.use(bodyParser.json());
 
 app.use(cors()); 

//===ROUTES
app.get('/', function(requisicao, resposta){
	resposta.send('Esta é a nossa api!!!');
});

var db = require('./chatdb')();
var chatService = require('./chat.service')(db);
require('./chat.resource')(app, chatService);

var port = 3000;
app.listen(port, function(){
	console.log("servidor iniciado na porta " + port);
});