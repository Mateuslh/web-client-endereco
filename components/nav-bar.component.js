angular.module('myApp')
    .component('navBar', {
        templateUrl: 'views/nav-bar.html',
        controller: ['$scope', function ($scope) {
            $scope.menuVisible = false;
            $scope.toggleMenu = function () {
                $scope.menuVisible = !$scope.menuVisible;
            };
        }]
    });
