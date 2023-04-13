// console.log('link check');
// GLOBAL DOM / VARIABLES
const gameContainer = document.getElementById('gameContainer');
const canvas = document.getElementById('game');
canvas.width = gameContainer.clientWidth;
canvas.height = gameContainer.clientHeight;
const ctx = canvas.getContext('2d');
const zomb = document.getElementById('zomb');
const surv = document.getElementById('surv');
const startButton = document.getElementById('startButton');
const timerDisplay = document.getElementById('timer');
const rulesButton = document.getElementById('rulesButton');
const rulesModal = document.getElementById('rulesModal');
const closeButton = document.getElementById('closeButton');
let survivor;
let zombie;
// let zombie2;
let zombie2;
let numZombies = 0;
let numZombies2 = 0;
const zombies = [];
// const zombies2 = [];
let runGame;
let survivors;
let zombiesInterval;
let countdown = 60;
let timer;


// EVENT LISTENERS 
window.addEventListener('DOMContentLoaded', function () {
  // survivor = new Runner(400, 340, surv, 50, 50, 100);
   

  // Start Button Event Listener
  startButton.addEventListener('click', function () {
    runGame = setInterval(gameLoop, 80);
    survivor = new Runner(550, 400, surv, 50, 50, 10);
    timer = setInterval(updateTimer, 1000);
    // survivors = setInterval(survivorLoop, survivor.speed);
    // zombiesInterval = setInterval(numZombies, zombie.speed);
    // zombiesInterval2 = setInterval(zombieLoop2, zombie2.speed);
    // zombie = new Zombie(200, 0, zomb, 40, 40, zombie.speed);
    // zombie2 = new Zombie2(0, 200, zomb, 40, 40, 1200);
    
  })

}

);

//rules Event listener
rulesButton.addEventListener('click', () => {
  rulesModal.style.display = 'block';
});
//close rules box
closeButton.addEventListener('click', () => {
  rulesModal.style.display = 'none';
});




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

    this.render = function () {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

    }

  }
};

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
}

// class Zombie2 {
//   constructor(x, y, image, width, height, speed) {
//     this.x = x;
//     this.y = y;
//     this.image = image;
//     this.width = width;
//     this.height = height;
//     this.alive = true;
//     this.speed = speed;

//     this.render = function () {
//       ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

//     }
//   }
// }




// KEYBOARD LOGIC
function moveSurvivor(e) {
  console.log('movement :', e.key);

  if (e.key === 'ArrowUp') {
    survivor.y >= 10 ? (survivor.y -= 10) : null;
  } else if (e.key === 'ArrowDown') {
    survivor.y + 10 <= canvas.height - survivor.height ? (survivor.y += 10) : null;
  } else if (e.key === 'ArrowRight') {
    survivor.x + 10 <= canvas.width - survivor.width ? (survivor.x += 10) : null;
  } else if (e.key === 'ArrowLeft') {
    survivor.x - 10 >= 0 ? (survivor.x -= 10) : null;
  }
}

//ZOMBIE MOVEMENT LOGIC
function moveZombie(zombie) {
  const directions = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
  const randomDirection = directions[Math.floor(Math.random() * directions.length)];
  if (randomDirection === 'ArrowDown') {
    zombie.y + 15 <= canvas.height - zombie.height ? (zombie.y += 8) : null;
  } else if (randomDirection === 'ArrowRight') {
    zombie.x + 6 <= canvas.width - zombie.width ? (zombie.x += 7) : null;
  } else if (randomDirection === 'ArrowLeft') {
    zombie.x - 10 >= 0 ? (zombie.x -= 7) : null;
  } else if (randomDirection === 'ArrowUp') {
    zombie.y - 10 >= 0 ? (zombie.y -= 2) : null;

  }
}



//GAME Processes  
//GAMELOOP and collision detection
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
 
//collision Detection
  function checkCollision(obj1, obj2) {
    return (
      obj1.x + 20 < obj2.x + obj2.width &&
      obj1.x + obj1.width - 40 > obj2.x &&
      obj1.y + 10 < obj2.y + obj2.height &&
      obj1.y + obj1.height - 25 > obj2.y
    );
  }
  
  zombieLoop();
  survivor.render();

}



//zombie loop function 
function zombieLoop() {
  ctx.imageSmoothingEnabled = false;
  

    if (Math.random() < 0.0015) { // zombie is randomly generated with a 0.0015% chance every time the function is called.
      numZombies++;
    }

  for (let i = 0; i < numZombies; i++) {
    moveZombie(zombies[i]);
    zombies[i].render();
  }
}

// Zombie spawn Timer that runs ever 300 milliseconds and pushes a new Zombie to an array
setInterval(() => {
  if (numZombies < 400) {
    zombies.push(new Zombie(canvas.width / 2, 0, zomb, 40, 40, 1200));
    zombies.push(new Zombie(0, 300, zomb, 40, 40, 1200));
    zombies.push(new Zombie(0, 100, zomb, 40, 40, 1200));
    zombies.push(new Zombie(100, 0, zomb, 40, 40, 1200));
    zombies.push(new Zombie(880, 0, zomb, 40, 40, 1200));
    zombies.push(new Zombie(850, 0, zomb, 40, 40, 1200));
    zombies.push(new Zombie(800, 0, zomb, 40, 40, 1200));
    zombies.push(new Zombie(300, 0, zomb, 40, 40, 1200));
    zombies.push(new Zombie(500, 0, zomb, 40, 40, 1200));
    zombies.push(new Zombie(400, 0, zomb, 40, 40, 1200));
    zombies.push(new Zombie(960, 0, zomb, 40, 40, 1200));
    zombies.push(new Zombie(1060, 0, zomb, 40, 40, 1200));
    zombies.push(new Zombie(1000, 0, zomb, 40, 40, 1200));
    zombies.push(new Zombie(800, 0, zomb, 40, 40, 1200));
    zombies.push(new Zombie(1000, 0, zomb, 40, 40, 1200));
    zombies.push(new Zombie(880, 0, zomb, 40, 40, 1200));
    zombies.push(new Zombie(300, 0, zomb, 40, 40, 1200));
    zombies.push(new Zombie(160, 0, zomb, 40, 40, 1200));
    zombies.push(new Zombie(500, 0, zomb, 40, 40, 1200));
    zombies.push(new Zombie(700, 0, zomb, 40, 40, 1200));
    zombies.push(new Zombie(260, 0, zomb, 40, 40, 1200));
    zombies.push(new Zombie(560, 0, zomb, 40, 40, 1200));
    zombies.push(new Zombie(1000, 0, zomb, 40, 40, 1200));
    zombies.push(new Zombie(125, 0, zomb, 40, 40, 1200));
    zombies.push(new Zombie(0, 150, zomb, 40, 40, 1200));
    zombies.push(new Zombie(0, 300, zomb, 40, 40, 1200));




    numZombies++;
  }
 
}, 300);

//Timer Function for countdown and Win display
function updateTimer() {
  countdown -= 1;
  const minutes = Math.floor(countdown / 90);
  const seconds = countdown % 90;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  timerDisplay.textContent = formattedTime;

  
  if (countdown === 0) {
    clearInterval(timer);
    const winMessage = document.createElement('div');
    winMessage.textContent = 'YOU WIN';
    winMessage.style.position = 'absolute';
    winMessage.style.top = '50%';
    winMessage.style.left = '50%';
    winMessage.style.transform = 'translate(-50%, -50%)';
    winMessage.style.fontSize = '48px';
    gameContainer.appendChild(winMessage);
  }
}



