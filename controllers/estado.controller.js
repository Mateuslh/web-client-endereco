angular.module('myApp')
    .controller('EstadoController', ['$scope', 'EstadoService', 'PaisService', function ($scope, EstadoService, PaisService) {
        $scope.estados = [];
        $scope.paises = [];
        $scope.novoEstado = {};
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

        function carregarPaises() {
            PaisService.getAll()
                .then(function (data) {
                    $scope.paises = data;
                })
                .catch(function (error) {
                    exibirMensagem(error, 'danger');
                });
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

        $scope.init = function () {
            carregarPaises();
            carregarEstados();
        };

        $scope.init();

        $scope.criarEstado = function () {
            if (!$scope.novoEstado.nome || !$scope.novoEstado.pais) {
                exibirMensagem('Preencha todos os campos obrigatórios.', 'warning');
                return;
            }
            EstadoService.create($scope.novoEstado)
                .then(function () {
                    exibirMensagem('Estado criado com sucesso!', 'success');
                    carregarEstados();
                    $scope.novoEstado = {};
                })
                .catch(function (error) {
                    exibirMensagem(error, 'danger');
                });
        };

        $scope.selecionarEstado = function (estado) {
            $scope.editando = true;
            $scope.novoEstado = angular.copy(estado);
        };

        $scope.atualizarEstado = function () {
            if (!$scope.novoEstado.nome || !$scope.novoEstado.pais) {
                exibirMensagem('Preencha todos os campos obrigatórios.', 'warning');
                return;
            }
            EstadoService.update($scope.novoEstado.id, $scope.novoEstado)
                .then(function () {
                    exibirMensagem('Estado atualizado com sucesso!', 'success');
                    carregarEstados();
                    $scope.novoEstado = {};
                    $scope.editando = false;
                })
                .catch(function (error) {
                    exibirMensagem(error, 'danger');
                });
        };

        $scope.deletarEstado = function (id) {
            if (confirm('Tem certeza que deseja deletar este estado?')) {
                EstadoService.delete(id)
                    .then(function () {
                        exibirMensagem('Estado deletado com sucesso!', 'success');
                        carregarEstados();
                    })
                    .catch(function (error) {
                        exibirMensagem(error, 'danger');
                    });
            }
        };

        $scope.cancelarEdicao = function () {
            $scope.editando = false;
            $scope.novoEstado = {};
        };
    }]);
