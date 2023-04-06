// console.log('link check');

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const zomb = document.getElementById('zomb');
// ctx.imageSmoothingEnabled = false;
let survivor;
let zombie;
console.log(zomb);



// EVENT LISTENERS
window.addEventListener('DOMContentLoaded', function() {
  survivor = new Runner(200, 200, 'white', 25, 25, 60);
  zombie = new Zombie(100, 100, zomb, 40, 40, 500);


  //run the game loop
  const runGame = setInterval(gameLoop, 60);
  const zombies = setInterval(zombieLoop, zombie.speed);
  const survivors = setInterval(surviorLoop, survivor.speed);
});

let gameStarted = false;

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.imageSmoothingEnabled = false;

  survivor.render();
  zombie.render();
}

// document.addEventListener('keydown', movementHandler); 
document.addEventListener('keydown', moveSurvivor); 

//SETUP FOR CANVAS RENDERING 
// 2D rendering context for canvas element
game.setAttribute('height', getComputedStyle(game)['height']);
game.setAttribute('width', getComputedStyle(game)['width']);

//ENTITIES 

class Runner {
  constructor(x, y, color, width, height, speed) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.width = width;
      this.height = height;
      this.alive = true;
      this.speed = speed;

      this.render = function() {
          ctx.fillStyle = this.color;
          ctx.fillRect(this.x, this.y, this.width, this.height);
       }

  }
};

class Zombie {
  constructor(x, y, image, width, height, speed) {
    this.x = x;
    this.y = 0;
    this.image = image;
    this.width = width;
    this.height = height;
    this.alive = true;
    this.speed = speed;

    this.render = function() {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

    }
  }
}


// KEYBOARD LOGIC
function moveSurvivor(e) {
  console.log('movement :', e.key);

  if (e.key === 'ArrowUp')  {
      survivor.y >= 10 ? (survivor.y -= 10) : null;
  } else if (e.key === 'ArrowDown') {
      survivor.y + 15 <= game.height - survivor.height ? (survivor.y += 10) : null;
  } else if (e.key === 'ArrowRight') {
        survivor.x + 6 <= game.width - survivor.width ? (survivor.x += 10) : null;
  } else if (e.key === 'ArrowLeft') {
        survivor.x - 10 >= 0 ? (  survivor.x -= 10) : null;
  }
}

//ZOMBIE MOVEMENT LOGIC
function moveZombie(zombie) {
  const directions = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
  const randomDirection = directions[Math.floor(Math.random() * directions.length)];
  if (randomDirection === 'ArrowUp') {
    zombie.y >= 10 ? (zombie.y -= 12) : null;
  } else if (randomDirection === 'ArrowDown') {
    zombie.y + 15 <= game.height - zombie.height ? (zombie.y += 12) : null;
  } else if (randomDirection === 'ArrowRight') {
    zombie.x + 6 <= game.width - zombie.width ? (zombie.x += 7) : null;
  } else if (randomDirection === 'ArrowLeft') {
    zombie.x - 10 >= 0 ? (zombie.x -= 7) : null;
  }
}





function surviorLoop() {
  // moveSurvivor(e);
  survivor.render();
}

function zombieLoop() {
  moveZombie(zombie);
  zombie.render();
};
