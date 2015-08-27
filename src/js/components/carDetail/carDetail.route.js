angular.module('viewTest').config(function ($stateProvider) {
    $stateProvider.state(
        'cars', {
            url: '/cars/:id',
            templateUrl: 'car_detail.html'
        }
    );
});