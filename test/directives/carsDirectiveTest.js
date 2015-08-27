describe('Cars Directive', function () {
    var $httpBackend;
    var carsView;
    var renderTemplate;
    var carsService;
    var myScope;

    beforeEach(module('viewTest'));

    beforeEach(inject(function ($injector, scope) {
        $httpBackend = $injector.get('$httpBackend');
        carsService = $injector.get('carsService');
        renderTemplate = $injector.get('renderTemplate');
        myScope = scope;

        scope.scopeMessage = "Hello Test.";

        carsView = renderTemplate('<cars message="scopeMessage"></cars>', myScope);
    }));

    it('shows a custom message', function () {
        expect(carsView.find('.parent-msg').text()).toBe('Hello Test.');
    });

    it('shows a message from an injected service', function () {
        expect(carsView.find('.service-msg').text()).toBe('This is a car service message');
    });

    it('shows a message from an injected service changed by a spy', function () {
        spyOn(carsService, 'getMessage').and.returnValue('Test message');

        carsView = renderTemplate('<cars message="scopeMessage"></cars>', myScope);

        expect(carsView.find('.service-msg').text()).toBe('Test message');
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