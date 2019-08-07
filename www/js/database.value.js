angular.module('starter')
.value('DatabaseValues', {
	bancoDeDados : null,
	setup : function(){
		this.bancoDeDados = window.openDatabase('aluraCar', '1.0', 'Banco de Dados da Aplicação', 3000);
	}

})