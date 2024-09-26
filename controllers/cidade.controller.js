angular.module('myApp')
    .controller('CidadeController', ['$scope', 'CidadeService', 'EstadoService', function ($scope, CidadeService, EstadoService) {
        $scope.cidades = [];
        $scope.estados = [];
        $scope.novoCidade = {};
        $scope.editando = false;
        $scope.mensagem = null;

        function exibirMensagem(texto, tipo) {
            $scope.mensagem = {texto: texto, tipo: tipo};
            setTimeout(function () {
                $scope.$apply(function () {
                    $scope.mensagem = null;
                });
            }, 3000);
        }

        function carregarEstados() {
            EstadoService.getAll()
                .then(function (data) {
                    $scope.estados = data;
                })
                .catch(function (error) {
                    exibirMensagem(error, 'danger');
                });
        }

        function carregarCidades() {
            CidadeService.getAll()
                .then(function (data) {
                    $scope.cidades = data;
                })
                .catch(function (error) {
                    exibirMensagem(error, 'danger');
                });
        }

        $scope.init = function () {
            carregarEstados();
            carregarCidades();
        };

        $scope.init();

        $scope.criarCidade = function () {
            if (!$scope.novoCidade.nome || !$scope.novoCidade.estado || !$scope.novoCidade.tamanho) {
                exibirMensagem('Preencha todos os campos obrigatórios.', 'warning');
                return;
            }
            CidadeService.create($scope.novoCidade)
                .then(function () {
                    exibirMensagem('Cidade criada com sucesso!', 'success');
                    carregarCidades();
                    $scope.novoCidade = {};
                })
                .catch(function (error) {
                    exibirMensagem(error, 'danger');
                });
        };

        $scope.selecionarCidade = function (cidade) {
            $scope.editando = true;
            $scope.novoCidade = angular.copy(cidade);
        };

        $scope.atualizarCidade = function () {
            if (!$scope.novoCidade.nome || !$scope.novoCidade.estado || !$scope.novoCidade.tamanho) {
                exibirMensagem('Preencha todos os campos obrigatórios.', 'warning');
                return;
            }
            CidadeService.update($scope.novoCidade.id, $scope.novoCidade)
                .then(function () {
                    exibirMensagem('Cidade atualizada com sucesso!', 'success');
                    carregarCidades();
                    $scope.novoCidade = {};
                    $scope.editando = false;
                })
                .catch(function (error) {
                    exibirMensagem(error, 'danger');
                });
        };

        $scope.deletarCidade = function (id) {
            if (confirm('Tem certeza que deseja deletar esta cidade?')) {
                CidadeService.delete(id)
                    .then(function () {
                        exibirMensagem('Cidade deletada com sucesso!', 'success');
                        carregarCidades();
                    })
                    .catch(function (error) {
                        exibirMensagem(error, 'danger');
                    });
            }
        };

        $scope.cancelarEdicao = function () {
            $scope.editando = false;
            $scope.novoCidade = {};
        };
    }]);
