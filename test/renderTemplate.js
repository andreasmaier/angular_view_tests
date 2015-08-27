angular.module('viewTest').factory('renderTemplate', function (_$compile_, _$rootScope_) {
    return function(templateName) {
        var compile = _$compile_;
        var $scope = _$rootScope_.$new();

        var view = angular.element(templateName);

        compile(view)($scope);
        $scope.$digest();

        return view
    }
});