describe('Cars Directive', function () {
    var carsView;
    var self;

    beforeEach(injectDependencies('scope', '$httpBackend', 'renderTemplate', 'carsService', '$state'));

    beforeEach(inject(function () {
        self = this;

        this.scope.scopeMessage = "Hello Test.";

        carsView = this.renderTemplate('<cars message="scopeMessage"></cars>', this.scope);
    }));

    it('shows a custom message', function () {
        expect(carsView.find('.parent-msg').text()).toBe('Hello Test.');
    });

    it('shows a message from an injected service', function () {
        expect(carsView.find('.service-msg').text()).toBe('This is a car service message');
    });

    it('shows a message from an injected service changed by a spy', function () {
        spyOn(this.carsService, 'getMessage').and.returnValue('Test message');

        carsView = this.renderTemplate('<cars message="scopeMessage"></cars>', this.scope);

        expect(carsView.find('.service-msg').text()).toBe('Test message');
    });

    it('shows all the cars', function () {
        expect(carsView.find('.car-item').length).toBe(0);

        clickFetchCarsButton(carsView);

        expect(carsView.find('.car-item').length).toBe(3);
    });

    describe('when a user clicks the fetch drivers button', function () {
        it('makes a request and displays the drivers', function () {
            expect(carsView.find('.driver-item').length).toBe(0);

            this.$httpBackend.when('GET', 'http://localhost:8081/drivers').respond({
                data: [
                    {
                        name: 'Pete'
                    },
                    {
                        name: 'Steph'
                    }
                ]
            });

            carsView.find('.drivers-button').click();

            this.$httpBackend.flush();

            expect(carsView.find('.driver-item:eq(0)').text()).toContain('Pete');
            expect(carsView.find('.driver-item:eq(1)').text()).toContain('Steph');
        });
    });

    describe('when there is an error response', function () {
        it('displays an error message', function () {
            expect(carsView.find('.error-msg').text()).toBe('');

            this.$httpBackend.when('GET', 'http://localhost:8081/cars').respond(401, {
                error: 'message'
            });

            carsView.find('.cars-button').click();

            this.$httpBackend.flush();
            expect(carsView.find('.error-msg').text()).toBe('message');
        });
    });

    describe('when a user clicks on a car', function () {
        it('takes the user to the car detail view', function () {
            clickFetchCarsButton(carsView);

            spyOn(this.$state, 'go');

            carsView.find('.car-item:eq(1)').click();

            expect(this.$state.go).toHaveBeenCalledWith('cars', {id: 1102});
        });
    });

    function clickFetchCarsButton(view) {
        self.$httpBackend.when('GET', 'http://localhost:8081/cars').respond({
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

        view.find('.cars-button').click();

        self.$httpBackend.flush();
    }
});