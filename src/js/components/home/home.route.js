angular.module('viewTest').config(function ($stateProvider) {
     $stateProvider.state(
         'home', {
             url: '/',
             templateUrl: 'home.html'
         }
     );
});