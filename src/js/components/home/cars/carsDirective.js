angular.module('viewTest').directive('cars', function () {
    return {
        restrict: 'E',
        controller: 'CarsController',
        templateUrl: 'cars.html'
    };
});