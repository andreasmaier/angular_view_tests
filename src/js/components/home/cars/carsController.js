angular.module('viewTest').controller('CarsController', function ($scope, $http, carsService, $state) {
    $scope.cars = [];
    $scope.errors = '';
    $scope.serviceMessage = carsService.getMessage();

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

    $scope.selectCar = function (car) {
        $state.go('cars', { id: car.id });
    }
});