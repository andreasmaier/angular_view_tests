describe('Cars Directive', function () {
    var $httpBackend;
    var carsView;
    var renderTemplate;
    var carsService;
    var scope;
    var state;

    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        carsService = $injector.get('carsService');
        renderTemplate = $injector.get('renderTemplate');
        scope = $injector.get('scope');
        state = $injector.get('$state');

        scope.scopeMessage = "Hello Test.";

        carsView = renderTemplate('<cars message="scopeMessage"></cars>', scope);
    }));

    it('shows a custom message', function () {
        expect(carsView.find('.parent-msg').text()).toBe('Hello Test.');
    });

    it('shows a message from an injected service', function () {
        expect(carsView.find('.service-msg').text()).toBe('This is a car service message');
    });

    it('shows a message from an injected service changed by a spy', function () {
        spyOn(carsService, 'getMessage').and.returnValue('Test message');

        carsView = renderTemplate('<cars message="scopeMessage"></cars>', scope);

        expect(carsView.find('.service-msg').text()).toBe('Test message');
    });

    it('shows all the cars', function () {
        expect(carsView.find('.car-item').length).toBe(0);

        clickFetchCarsButton(carsView);

        expect(carsView.find('.car-item').length).toBe(3);
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

    describe('when a user clicks on a car', function () {
        it('takes the user to the car detail view', function () {
            clickFetchCarsButton(carsView);

            spyOn(state, 'go');

            carsView.find('.car-item:eq(1)').click();

            expect(state.go).toHaveBeenCalledWith('cars', {id: 1102});
        });
    });

    function clickFetchCarsButton(view) {
        $httpBackend.when('GET', 'http://localhost:8081/cars').respond({
            data: [
                {
                    id: 123,
                    make: 'BMW',
                    model: '4 series',
                    year: 2014
                },
                {
                    id: 1102,
                    make: 'Mercedes',
                    model: 'C-Class',
                    year: 2012
                },
                {
                    id: 5395,
                    make: 'Audi',
                    model: 'A4',
                    year: 2011
                }
            ]
        });

        view.find('.btn').click();

        $httpBackend.flush();
    }
});