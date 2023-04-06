describe('Surviver class', function() {
    let person = new Runner(200, 200, 'white', 25, 25)


    it('should be a number for x', function() {
        expect(typeof(survivor.x)).toBe('number');  
    });

    it('should be a number for y', function() {
        expect(typeof(survivor.y)).toBe('number'); 
    });

    it('should be a string for color', function() {
        expect(typeof(survivor.color)).toBe('string'); 
    });

    it('should be a string for height', function() {
        expect(typeof(survivor.height)).toBe('number'); 
    });

    it('should be a string for width', function() {
        expect(typeof(survivor.width)).toBe('number'); 
    });

    it('should be a boolean for alive', function() {
        expect(typeof(survivor.alive)).toBe('boolean'); 
    });

});