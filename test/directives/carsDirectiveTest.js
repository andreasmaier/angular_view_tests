describe('Cars Directive', function () {
    var $httpBackend;
    var carsView;

    beforeEach(module('viewTest'));

    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        var renderTemplate = $injector.get('renderTemplate');

        carsView = renderTemplate('<cars></cars>');
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