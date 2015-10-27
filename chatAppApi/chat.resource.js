module.exports = function(app, service){
	// service.listarMensagens = listarMensagens;
	app.get('/message', function(requisicao, resposta){
		resposta.send(service.listarMensagens());
	});
	
	// service.enviarMensagem = enviarMensagem;
	app.post('/message', function(requisicao, resposta){
		var msg = service.enviarMensagem(requisicao.body.usuario, requisicao.body.mensagem);
		resposta.send(msg);
	});
	
	// service.excluirMensagem = excluirMensagem;
	app.delete('/message/:id', function(requisicao, resposta){
		var msg = service.excluirMensagem(requisicao.params.id);
		resposta.send(msg);
	});
	
	// service.listarUsuarios = listarUsuarios;	
	app.get('/usuario', function(requisicao, resposta){
		var lista = service.listarUsuarios();
		resposta.send(lista);
	});
	
	// service.logarUsuario = logarUsuario;
	app.post('/usuario', function(requisicao, resposta){
		var usuario = service.logarUsuario(requisicao.body.nome, requisicao.body.cor);
		console.log("usuário '" + requisicao.body.nome + "' entrou!");
		resposta.send(usuario);
	});
	
	// service.deslogarUsuario = deslogarUsuario;
	app.post('/usuario/delete', function(requisicao, resposta){
		var retorno = service.deslogarUsuario(requisicao.body.usuario);
		console.log("usuário '" + requisicao.body.usuario.nome + "' saiu!");
		resposta.send(retorno);
	});
}