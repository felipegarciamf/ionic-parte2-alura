angular.module('starter')
.controller('AgendamentoController', function($scope, $ionicPopup, DatabaseValues, CarroService, $state){



	$scope.agendamentos = [];



	DatabaseValues.setup();
	DatabaseValues.bancoDeDados.transaction(function(transacao){
		transacao.executeSql('SELECT * FROM agendamentos', [], function(transacao, resultados){
			for(var i = 0; i < resultados.rows.length; i++){
				$scope.agendamentos.push(resultados.rows[i]);
			}
		});
	})

	$scope.reenviar = function(agendamento){
		var agendamentoFinalizado = {
			params: {
				nome : agendamento.nome,
				endereco : agendamento.endereco,
				email : agendamento.email,
				carro : agendamento.modelo,
				preco : agendamento.preco
			}
		}

		CarroService.salvarPedido(agendamentoFinalizado).then(function(dados){

			DatabaseValues.setup();
			DatabaseValues.bancoDeDados.transaction(function(transacao){
				transacao.executeSql("UPDATE agendamentos SET confirmado = 'true' WHERE id = ?", [agendamento.id]);
			})

			$ionicPopup.alert({
				title: 'Cadastrado Com Sucesso',
				template : 'Deu certo' 
			}).then(function(){
				$state.go($state.current, {}, {reload: true});
			});

		}, function(erro){
			$ionicPopup.alert({
				title: 'Deu erro',
				template: 'Se fodeu'
			});

		});
	}



})