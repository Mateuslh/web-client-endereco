angular.module('myApp')
    .service('DashboardService', ['$http', '$q', function ($http, $q) {
        var baseUrl = 'http://localhost:8080/api/dashboard';
        var dashboardCache = null;

        this.getCitiesByState = function () {
            if (dashboardCache) {
                return $q.resolve(dashboardCache);
            }
            return $http.get(baseUrl)
                .then(function (response) {
                    dashboardCache = response.data;
                    return dashboardCache;
                })
                .catch(function () {
                    return $q.reject('Erro ao carregar dados da dashboard.');
                });
        };
    }]);
