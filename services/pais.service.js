angular.module('myApp')
    .service('PaisService', ['$http', '$q', function ($http, $q) {
        var baseUrl = 'http://localhost:8080/api/pais';
        var paisesCache = null;

        this.getAll = function () {
            if (paisesCache) {
                return $q.resolve(paisesCache);
            }
            return $http.get(baseUrl + '/nonpaged')
                .then(function (response) {
                    paisesCache = response.data;
                    return paisesCache;
                })
                .catch(function () {
                    return $q.reject('Erro ao carregar países.');
                });
        };
    }]);
