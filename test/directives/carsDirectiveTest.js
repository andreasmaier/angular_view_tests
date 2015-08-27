describe('Cars Directive', function () {
    var $httpBackend;
    var carsView;

    beforeEach(module('viewTest'));

    beforeEach(inject(function ($injector, scope) {
        $httpBackend = $injector.get('$httpBackend');
        var renderTemplate = $injector.get('renderTemplate');

        scope.scopeMessage = "Hello Test.";

        carsView = renderTemplate('<cars message="scopeMessage"></cars>', scope);
    }));

    it('shows a custom message', function () {
        expect(carsView.find('.parent-msg').text()).toBe('Hello Test.');
    });

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