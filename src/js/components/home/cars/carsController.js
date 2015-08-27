angular.module('viewTest').controller('CarsController', function ($scope, $http) {
    $scope.cars = [];
    $scope.errors = '';

    $scope.fetchClicked = function () {
        $http.get('http://localhost:8081/cars')
            .success(function (response) {
                $scope.cars = response.data;
            })
            .error(function (msg) {
                if (msg) {
                    $scope.errors = msg.error;
                }
            });
    };
});