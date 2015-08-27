angular.module('viewTest').service('carsService', function () {
    this.getMessage = function () {
        return 'This is a car service message';
    }
});