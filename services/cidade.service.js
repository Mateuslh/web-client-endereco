angular.module('myApp')
    .service('CidadeService', ['$http', '$q', function ($http, $q) {
        var baseUrl = 'http://localhost:8080/api/cidade';
        var cidadesCache = null;

        this.getAll = function () {
            if (cidadesCache) {
                return $q.resolve(cidadesCache);
            }
            return $http.get(baseUrl + '/nonpaged')
                .then(function (response) {
                    cidadesCache = response.data;
                    return cidadesCache;
                })
                .catch(function () {
                    return $q.reject('Erro ao carregar cidades.');
                });
        };

        this.create = function (cidade) {
            return $http.post(baseUrl, cidade)
                .then(function (response) {
                    cidadesCache = null;
                    return response.data;
                })
                .catch(function () {
                    return $q.reject('Erro ao criar cidade.');
                });
        };

        this.update = function (id, cidade) {
            return $http.put(baseUrl + '/' + id, cidade)
                .then(function (response) {
                    cidadesCache = null;
                    return response.data;
                })
                .catch(function () {
                    return $q.reject('Erro ao atualizar cidade.');
                });
        };

        this.delete = function (id) {
            return $http.delete(baseUrl + '/' + id)
                .then(function () {
                    cidadesCache = null;
                })
                .catch(function () {
                    return $q.reject('Erro ao deletar cidade.');
                });
        };
    }]);