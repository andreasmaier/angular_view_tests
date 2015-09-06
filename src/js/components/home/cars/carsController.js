angular.module('viewTest').controller('CarsController', function ($scope, $http, carsService, $state, $resource) {
    $scope.cars = [];
    $scope.drivers = [];
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

    function getDrivers() {
        var driverResource = $resource('http://localhost:8081/drivers', {}, {
            get: {method: 'GET'}
        });

        return driverResource.get();
    }

    $scope.fetchDriversClicked = function () {
        getDrivers().$promise.then(function (data) {
            $scope.drivers = data.data;
        });
    };

    $scope.selectCar = function (car) {
        $state.go('cars', { id: car.id });
    }
});