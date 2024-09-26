angular.module('myApp')
    .service('EstadoService', ['$http', '$q', function ($http, $q) {
        var baseUrl = 'http://localhost:8080/api/estado';
        var estadosCache = null;

        this.getAll = function () {
            if (estadosCache) {
                return $q.resolve(estadosCache);
            }
            return $http.get(baseUrl + '/nonpaged')
                .then(function (response) {
                    estadosCache = response.data;
                    return estadosCache;
                })
                .catch(function () {
                    return $q.reject('Erro ao carregar estados.');
                });
        };

        this.create = function (estado) {
            return $http.post(baseUrl, estado)
                .then(function (response) {
                    estadosCache = null;
                    return response.data;
                })
                .catch(function () {
                    return $q.reject('Erro ao criar estado.');
                });
        };

        this.update = function (id, estado) {
            return $http.put(baseUrl + '/' + id, estado)
                .then(function (response) {
                    estadosCache = null;
                    return response.data;
                })
                .catch(function () {
                    return $q.reject('Erro ao atualizar estado.');
                });
        };

        this.delete = function (id) {
            return $http.delete(baseUrl + '/' + id)
                .then(function () {
                    estadosCache = null;
                })
                .catch(function () {
                    return $q.reject('Erro ao deletar estado.');
                });
        };
    }]);
