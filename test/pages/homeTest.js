describe('Home Page', function () {
    var homeView;
    var self;

    beforeEach(injectDependencies('scope', 'renderTemplate'));

    beforeEach(inject(function () {
        self = this;

        homeView = this.renderTemplate('home.html', this.scope);
    }));

    it('shows a custom message', function () {
        expect(homeView.find('.car-heading').text()).toEqual('Hello to the car list');
    });
});
