(function(){
	
	angular.module("chatApp")
	.controller("chatController", ChatController);
	
	function ChatController($scope, $rootScope, chatService){
		$scope.listaMensagens = [];
		$scope.msgAtual = "";
		$scope.nomeUsuario = "";
		$scope.corSelecionada = "black";
		$scope.enviar = enviar;
		$scope.excluirMsg = excluirMsg;
		$rootScope.usuarioLogado = null;
		$scope.listaUsuarios = [];
		$scope.logar = logar;
		$scope.deslogar = deslogar;
		
		setInterval(function(){
			if($rootScope.usuarioLogado){
				atualizarListaDeUsuariosNaTela();
				atualizarMensagensNaTela();	
			}
		}, 1000);
		
		function logar(){
			chatService.logarUsuario($scope.nomeUsuario, $scope.corSelecionada, function(usuario){
				console.log(usuario);
				$rootScope.usuarioLogado = usuario;
				atualizarListaDeUsuariosNaTela();
			}, function(erro){
				alert(erro);
			});
		}
		
		function deslogar(){
			chatService.deslogarUsuario($rootScope.usuarioLogado, function(){
				$rootScope.usuarioLogado = null;
				atualizarListaDeUsuariosNaTela();
			});
		}
		
		function atualizarListaDeUsuariosNaTela(){
			chatService.listarUsuarios(function(data){
				$scope.listaUsuarios = data;
			});
		}
		
		function atualizarMensagensNaTela(){
			chatService.listarMensagens(function(data){
				$scope.listaMensagens = data;
			});
		}
		
		function enviar(){
			chatService.enviarMensagem($rootScope.usuarioLogado, $scope.msgAtual, function(){
				$scope.msgAtual = "";			
				atualizarMensagensNaTela();
			}, function(erro){
				alert(erro);
			});		
		}
		
		function excluirMsg(index){
			chatService.excluirMensagem(index, atualizarMensagensNaTela);
		}
	}
	
}());