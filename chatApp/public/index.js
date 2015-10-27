(function(){
	
	angular.module("chatApp", []).run(run);
	
	function run ($window, $rootScope, $http){
		$rootScope.$watch('usuarioLogado', function(){
			if($rootScope.usuarioLogado){
				console.log("usuário logado!");
				$http.defaults.headers.common.usuario = $rootScope.usuarioLogado.nome;
			} else {
				console.log("usuário deslogado!");
				$http.defaults.headers.common.usuario = null;
			}
		});
	};	
	
}());