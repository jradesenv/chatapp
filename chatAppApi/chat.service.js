/* global . */
module.exports = function(db){
	//definition
	var service = {};
	service.listarUsuarios = listarUsuarios;
	service.logarUsuario = logarUsuario;
	service.deslogarUsuario = deslogarUsuario;
	service.enviarMensagem = enviarMensagem;
	service.excluirMensagem = excluirMensagem;
	service.listarMensagens = listarMensagens;
	return service;
	
	//implementation
	function listarUsuarios(){
		return db.listaUsuarios;
	}
	
	function logarUsuario(nome, cor){
		var retornoValidacao = validarNovoUsuario(nome);
		if(retornoValidacao.valido){
			var usuarioAtual = new Usuario(nome, cor);
			db.listaUsuarios.push(usuarioAtual);
			return {
				usuario: usuarioAtual
			};
		} else {
			return {
				erro: retornoValidacao.erro	
			};
		}
	}
	
	function deslogarUsuario(usuario){
		for(var index in db.listaUsuarios){
			if(db.listaUsuarios[index].nome === usuario.nome){
				db.listaUsuarios.splice(index, 1);
			}
		}		
	}
	
	function validarNovoUsuario(nome){
		var retorno = {valido: true};
		if(nome.length > 0){
			for(var index in db.listaUsuarios){
				if(db.listaUsuarios[index].nome === nome){
					retorno = {
						valido: false,
						erro: "O nome utilizado já está logado."
					}
					break;
				}
			}	
		} else {
			retorno = {
				valido: false,
				erro: "Por favor, preencha o nome."
			}
		}
		return retorno;
	}
	
	function listarMensagens(){
		return db.listaMensagens;
	}
	
	function excluirMensagem(id){
		db.listaMensagens.splice(id, 1);
		return "Mensagem deletada!";
	}
	
	function enviarMensagem(usuario, mensagem){
		var retornoValidacao = validarNovaMensagem(mensagem);
		if(retornoValidacao.valido){
			var msg = new Mensagem(usuario, mensagem);
			db.listaMensagens.push(msg);
			return {
				mensagem: msg
			};	
		} else {
			return {
				erro: retornoValidacao.erro
			};
		}
	}
	
	function validarNovaMensagem(msg){
		var retorno = {valido: true};
		if(msg.length === 0){
			retorno = {
				valido: false,
				erro: "Por favor, preencha a mensagem."
			}
		}
		return retorno;
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