console.log('link check');

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
let survivor;



// EVENT LISTENERS
window.addEventListener('DOMContentLoaded', function() {
  survivor = new Runner(200, 200, 'yellow', 30, 30);


  //run the game loop
  const runGame = setInterval(gameLoop, 60);
});

// document.addEventListener('keydown', movementHandler); 
document.addEventListener('keydown', moveSurvivor); 

//SETUP FOR CANVAS RENDERING 
// 2D rendering context for canvas element
// This is used for drawing shapes, text, images, etc. 
game.setAttribute('height', getComputedStyle(game)['height']);
game.setAttribute('width', getComputedStyle(game)['width']);

//ENTITIES 

class Runner {
  constructor(x, y, color, width, height) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.width = width;
      this.height = height;
      this.alive = true;

      this.render = function() {
          ctx.fillStyle = this.color;
          ctx.fillRect(this.x, this.y, this.width, this.height);
       }

  }
};

// KEYBOARD LOGIC
function moveSurvivor(e) {
  console.log('movement :', e.key);

  if (e.key === 'ArrowUp')  {
      survivor.y >= 0 ? (survivor.y -= 10) : null;
  } else if (e.key === 'ArrowDown') {
      survivor.y + survivor.height <= game.height - survivor.height ? (survivor.y += 10) : null;
  } else if (e.key === 'ArrowRight') {
        survivor.x + 10 <= game.width -   survivor.width ? (  survivor.x += 10) : null;
  } else if (e.key === 'ArrowLeft') {
        survivor.x - 10 >= 0 ? (  survivor.x -= 10) : null;
  }
}



//GAME PROCESSES 
function gameLoop() {
  //clear the canvas
  ctx.clearRect(0, 0, game.width, game.height);
  survivor.render();
};