angular.module('viewTest').factory('renderTemplate', function (_$compile_) {
    return function(templateName, scope) {
        var compile = _$compile_;

        var view = angular.element(templateName);

        compile(view)(scope);
        scope.$digest();

        return view
    };
});