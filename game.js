// console.log('link check');
const gameContainer = document.getElementById('gameContainer');
const canvas = document.getElementById('game');
canvas.width = gameContainer.clientWidth;
canvas.height = gameContainer.clientHeight;
const ctx = canvas.getContext('2d');
const zomb = document.getElementById('zomb');
const surv = document.getElementById('surv');
let survivor;
let zombie;
let numZombies = 0;
const zombies = [];
let runGame;
let survivors;
let zombiesInterval;
const startButton = document.getElementById('startButton');





console.log(zomb);



// EVENT LISTENERS 
window.addEventListener('DOMContentLoaded', function() {
  survivor = new Runner(400, 340, surv, 50, 50, 60);
  zombie = new Zombie(canvas.width / 2, 0, zomb, 40, 40, 800);

  // run the game loop
  startButton.addEventListener('click', function() {
  runGame = setInterval(gameLoop, 100);

  // const zombies = setInterval(zombieLoop, zombie.speed);
  
  survivors = setInterval(survivorLoop, survivor.speed);
  zombiesInterval = setInterval(zombieLoop, zombie.speed);

  

})});





// document.addEventListener('keydown', movementHandler); 
document.addEventListener('keydown', moveSurvivor); 

//SETUP FOR CANVAS RENDERING 
// 2D rendering context for canvas element
game.setAttribute('height', getComputedStyle(canvas)['height']);
game.setAttribute('width', getComputedStyle(canvas)['width']);





//ENTITIES 

class Runner {
  constructor(x, y, image, width, height, speed) {
      this.x = x;
      this.y = y;
      this.image = image;
      this.width = width;
      this.height = height;
      this.alive = true;
      this.speed = speed;

      this.render = function() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

       }

  }
};

class Zombie {
  constructor(x, y, image, width, height, speed) {
    this.x = 380;
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
      survivor.y + 10 <= canvas.height - survivor.height ? (survivor.y += 10) : null;
  } else if (e.key === 'ArrowRight') {
        survivor.x + 10 <= canvas.width - survivor.width ? (survivor.x += 10) : null;
  } else if (e.key === 'ArrowLeft') {
        survivor.x - 10 >= 0 ? (  survivor.x -= 10) : null;
  }
}

//ZOMBIE MOVEMENT LOGIC
function moveZombie(zombie) {
  const directions = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
  const randomDirection = directions[Math.floor(Math.random() * directions.length)];
  if (randomDirection === 'ArrowDown') {
    zombie.y + 15 <= canvas.height - zombie.height ? (zombie.y += 5) : null;
  } else if (randomDirection === 'ArrowRight') {
    zombie.x + 6 <= canvas.width - zombie.width ? (zombie.x += 7) : null;
  } else if (randomDirection === 'ArrowLeft') {
    zombie.x - 10 >= 0 ? (zombie.x -= 5) : null;
  }
}


//GAME Processes  GAMELOOP
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.imageSmoothingEnabled = false;
  
  for (let i = 0; i < numZombies; i++) {
    if (checkCollision(survivor, zombies[i])) {
      clearInterval(runGame);
      clearInterval(survivors);
      clearInterval(zombiesInterval);
      alert("Game Over");
      break;
    }
  }
  
  function checkCollision(obj1, obj2) {
    return (
      obj1.x + 10 < obj2.x + obj2.width &&
      obj1.x + obj1.width - 30 > obj2.x &&
      obj1.y + 10 < obj2.y + obj2.height &&
      obj1.y + obj1.height - 30 > obj2.y
    );
  }
  

    zombieLoop();
    survivor.render();
  // zombie.render();
  
}


//Seperate Game processing ==== SURVIVOR LOOP
function survivorLoop() {

  survivor.render();
}


//zombie loop function so that new zombies are pushed in at random every 10 seconds
function zombieLoop() { {
    if (Math.random() < 0.001) { // add a new zombie with a 0.001% chance to enter every 10 seconds
      zombies.push(new Zombie(canvas.width / 2, 0, zomb, 40, 40, 100));
      numZombies++;
    }
  }

  for (let i = 0; i < numZombies; i++) {
    moveZombie(zombies[i]);
    zombies[i].render();
  }
  
}
// Zombie spawn Timer
setInterval(() => {
  if (numZombies < 8) {
    zombies.push(new Zombie(canvas.width / 2, 0, zomb, 40, 40, 100));
    numZombies++;
  }
}, 10000);


