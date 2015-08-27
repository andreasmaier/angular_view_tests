describe('Cars Directive', function () {
    var compile;
    var rootScope;
    var $scope;
    var $httpBackend;
    var carsView;

    beforeEach(module('viewTest'));

    beforeEach(inject(function (_$compile_, _$rootScope_, $templateCache, $injector) {
        compile = _$compile_;
        rootScope = _$rootScope_;
        $scope = rootScope.$new();

        $httpBackend = $injector.get('$httpBackend');

        //var tmp = $templateCache.get('cars.html');
        carsView = angular.element('<cars></cars>');

        compile(carsView)($scope);
        $scope.$digest();
    }));

    it('shows all the cars', function () {
        expect(carsView.find('.cars-list').length).toBe(0);

        $httpBackend.when('GET', 'http://localhost:8081/cars').respond({
            data: [
                {
                    make: 'BMW',
                    model: '4 series',
                    year: 2014
                }
            ]
        });

        carsView.find('.btn').click();

        $httpBackend.flush();

        expect(carsView.find('.cars-list').length).toBe(1);
    });

    describe('when there is an error response', function () {
        it('displays an error message', function () {
            expect(carsView.find('.error-msg').text()).toBe('');

            $httpBackend.when('GET', 'http://localhost:8081/cars').respond(401, {
                error: 'message'
            });

            carsView.find('.btn').click();

            $httpBackend.flush();
            //console.log('error: ', carsView.find('.error-msg').text());
            expect(carsView.find('.error-msg').text()).toBe('message');
        });
    });
});