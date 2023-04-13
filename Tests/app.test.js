
describe('Runner class', function() {
    class Runner {
        constructor(x, y, image, width, height, speed) {
          this.x = x;
          this.y = y;
          this.image = image;
          this.width = width;
          this.height = height;
          this.alive = true;
          this.speed = speed;
      
          this.render = function () {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      
          }
      
        }
      };
      
    let alive = new Runner(200, 200, 'green', 50, 50, 50)


    it('should be a number for x', function() {
        expect(typeof(alive.x)).toBe('number');  
    });

    it('should be a number for y', function() {
        expect(typeof(alive.y)).toBe('number'); 
    });

    it('should be a string for color', function() {
        expect(typeof(alive.image)).toBe('string'); 
    });

    it('should be a string for height', function() {
        expect(typeof(alive.height)).toBe('number'); 
    });

    it('should be a string for width', function() {
        expect(typeof(alive.width)).toBe('number'); 
    });

    it('should be a boolean for alive', function() {
        expect(typeof(alive.alive)).toBe('boolean'); 
    });

});

describe('Zombie class', function() {
    class Zombie {
        constructor(x, y, image, width, height, speed) {
          this.x = x;
          this.y = y;
          this.image = image;
          this.width = width;
          this.height = height;
          this.alive = true;
          this.speed = speed;
      
          this.render = function () {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      
          }
      
        }
      };
      
    let dead = new Zombie(200, 200, 'green', 50, 50, 50)


    it('should be a number for x', function() {
        expect(typeof(dead.x)).toBe('number');  
    });

    it('should be a number for y', function() {
        expect(typeof(dead.y)).toBe('number'); 
    });

    it('should be a string for color', function() {
        expect(typeof(dead.image)).toBe('string'); 
    });

    it('should be a string for height', function() {
        expect(typeof(dead.height)).toBe('number'); 
    });

    it('should be a string for width', function() {
        expect(typeof(dead.width)).toBe('number'); 
    });

    it('should be a boolean for alive', function() {
        expect(typeof(dead.alive)).toBe('boolean'); 
    });

});