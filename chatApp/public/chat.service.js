(function(){
	
	angular.module("chatApp")
	.factory("chatService", ChatService);
	
	function ChatService($timeout, $http){
		var _db = {};
		_db.listaMensagens = [];
		_db.listaUsuarios = [];
		_db.msgAtual = "";
		
		var urls = {};
		urls.base = "http://localhost:3000/";
		urls.listarMensagens = urls.base + "message";
		urls.listarUsuarios = urls.base + "usuario";
		urls.logarUsuario = urls.base + "usuario";
		urls.deslogarUsuario = urls.base + "usuario/delete";
		urls.enviarMensagem = urls.base + "message";
		urls.excluirMensagem = urls.base + "message";
		
		var service = {};
		service.listarUsuarios = listarUsuarios;
		service.logarUsuario = logarUsuario;
		service.deslogarUsuario = deslogarUsuario;
		service.enviarMensagem = enviarMensagem;
		service.excluirMensagem = excluirMensagem;
		service.listarMensagens = listarMensagens;
		service._db = _db;
		return service;
		
		function logarUsuario(nome, cor, callback, failCallback){
			$http.post(urls.logarUsuario, {nome: nome, cor: cor}).then(function(response){
				console.log("data", response.data);
				if(response.data.erro){
					failCallback(response.data.erro);
				} else {
					callback(response.data.usuario);
				}
			});
		}
		
		function deslogarUsuario(usuario, callback){
			$http.post(urls.deslogarUsuario, {usuario: usuario}).then(function(response){
				callback(response.data.usuario);
			});
		}
		
		function listarUsuarios(callback){
			$http.get(urls.listarUsuarios).then(function(response){
				callback(response.data);
			});
		}
		
		function listarMensagens(callback){
			$http.get(urls.listarMensagens).then(function(response){
				callback(response.data);
			});
		}
		
		function enviarMensagem(usuario, mensagem, callBack, failCallback){
			$http.post(urls.enviarMensagem, {usuario: usuario, mensagem: mensagem}).then(function(response){
				if(response.data.erro){
					failCallback(response.data.erro);
				} else {
					callBack(response.data.mensagem);
				}
			});
		}
		
		function excluirMensagem(id, callBack){
			$http.delete(urls.excluirMensagem + "/" + id).then(function(response){
				callBack(response.data);
			});
		}
		
		function Usuario(nome, cor){
			this.nome = nome;
			this.cor = cor;
		}
				
		function Mensagem(usuario, msg){
			this.usuario = usuario;
			this.msg = msg;
		}		
	}
	
}());