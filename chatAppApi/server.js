var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();
var db = require('./chatdb')();

//===MIDDLEWARES
// parse application/x-www-form-urlencoded
 app.use(bodyParser.urlencoded({ extended: false }));
 app.use(bodyParser.json()); 
 app.use(cors()); 
 app.use(userKeepAlive);
 
 function userKeepAlive(req, res, next){
	 if(req.headers.usuario !== "null"){
		 var usuario = null;
		 for(var index in db.listaUsuarios){
			 if(db.listaUsuarios[index].nome === req.headers.usuario){
				 usuario = db.listaUsuarios[index];
				 db.listaUsuarios[index].keepAlive = new Date(); //atualiza keepAlive
				 break;
			 }
		 }
		 if(!usuario){
			 //re-cria usuário
			 console.log("recriando usuário..");
			 db.listaUsuarios.push({
				 nome: req.headers.usuario,
				 cor: "black",
				 keepAlive: new Date()
			 });
		 }
	 }
	 next();
 }
 
 setInterval(checkKeepAlives, 2000);
 
function checkKeepAlives(){
	var indexToRemove = -1;
	for(var index in db.listaUsuarios){
		var lastKeepAlive = db.listaUsuarios[index].keepAlive;
		var timeNow = new Date();
		var dif = timeNow.getTime() - lastKeepAlive.getTime()
		
		var difSeconds = dif / 1000;
		if(difSeconds > 2){
			indexToRemove = index;
			break;
		}
	}
	if(indexToRemove > -1){
		console.log("removendo usuário por inatividade.");
		db.listaUsuarios.splice(indexToRemove, 1);
	}
}

//===ROUTES
app.get('/', function(requisicao, resposta){
	resposta.send('Esta é a nossa api!!!');
});

var chatService = require('./chat.service')(db);
require('./chat.resource')(app, chatService);

var port = 3000;
app.listen(port, function(){
	console.log("servidor iniciado na porta " + port);
});