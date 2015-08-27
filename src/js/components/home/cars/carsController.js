angular.module('viewTest').controller('CarsController', function ($scope, $http) {
    $scope.cars = [];
    
    $http.get('http://localhost:8081/cars').then(
        function (response) {
            console.log('response: ', response.data);
            $scope.cars = response.data;
        },
        function (msg) {
            console.error('There was an error:', msg);
        }
    )
});