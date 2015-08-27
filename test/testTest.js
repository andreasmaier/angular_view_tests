describe('Describing a thing', function () {
    
    var compile;
    var rootScope;

    beforeEach(module('viewTest'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        compile = _$compile_;
        rootScope = _$rootScope_;
    }));
    
    it('does something', function () {
        expect(true).toBe(false);
    });
});