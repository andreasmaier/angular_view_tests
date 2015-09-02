angular.module('viewTest').factory('renderTemplate', function (_$compile_, $templateCache) {
    function createView(templateName) {
        if(/\.html/.test(templateName)) {
            var template = $templateCache.get(templateName);
            return angular.element(template);
        }
        else {
            return angular.element(templateName);
        }
    }

    return function(templateName, scope) {
        var compile = _$compile_;

        var view = createView(templateName);

        compile(view)(scope);
        scope.$digest();

        return view
    };
});