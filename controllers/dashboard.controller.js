angular.module('myApp')
    .controller('DashboardController', ['$scope', 'DashboardService', function ($scope, DashboardService) {
        $scope.citiesByState = [];
        $scope.mensagem = null;

        function exibirMensagem(texto, tipo) {
            $scope.mensagem = {texto: texto, tipo: tipo};
            setTimeout(function () {
                $scope.$apply(function () {
                    $scope.mensagem = null;
                });
            }, 3000);
        }

        function carregarDashboard() {
            DashboardService.getCitiesByState()
                .then(function (data) {
                    $scope.citiesByState = data;
                    renderChart();
                })
                .catch(function (error) {
                    exibirMensagem(error, 'danger');
                });
        }

        function renderChart() {
            var labels = $scope.citiesByState.map(function (item) {
                return item.estado;
            });
            var data = $scope.citiesByState.map(function (item) {
                return item.quantidadeCidade;
            });

            var ctx = document.getElementById('dashboardChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Quantidade de Cidades por Estado',
                        data: data,
                        backgroundColor: 'rgba(75, 192, 192, 0.5)'
                    }]
                },
                options: {
                    scales: {
                        y: {beginAtZero: true}
                    }
                }
            });
        }

        $scope.init = function () {
            carregarDashboard();
        };

        $scope.init();
    }]);
