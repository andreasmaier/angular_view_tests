function injectDependencies (_) {
    var injectables = Array.prototype.slice.call(arguments);

    // angular checks for fn.length, so we must provide a useless _ arg
    function fnToInject (_) { // eslint-disable-line no-unused-vars
        var testContext = this;
        var injected = Array.prototype.slice.call(arguments, 0);

        angular.forEach(injected, function (item, index) {
            var name = fnToInject.$inject[index];
            testContext[name] = item;
        });
    }

    fnToInject.toString = function () {
        return 'function (' + injectables.join(', ') + ') { \n void 0;\n }';
    };

    return function mochaInject () {
        angular.mock.inject.call(this, fnToInject);
    };
}