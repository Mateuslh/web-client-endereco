angular.module('myApp', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/dashboard.html',
                controller: 'DashboardController'
            })
            .when('/estado', {
                templateUrl: 'views/estado.html',
                controller: 'EstadoController'
            })
            .when('/cidade', {
                templateUrl: 'views/cidade.html',
                controller: 'CidadeController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);
