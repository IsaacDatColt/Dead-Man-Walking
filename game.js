// GLOBAL DOM / VARIABLES
const gameContainer = document.getElementById('gameContainer');
const canvas = document.getElementById('game');
canvas.width = gameContainer.clientWidth;
canvas.height = gameContainer.clientHeight;
const ctx = canvas.getContext('2d');
const zomb = document.getElementById('zomb');
const surv = document.getElementById('surv');
let survivor;
const zombies = [];
let runGame;
let countdown = 60;
let timer;

window.onload = function () {
  // EVENT LISTENERS 
  document.getElementById('startButton').addEventListener('click', startGame);
  document.getElementById('rulesButton').addEventListener('click', () => {
    document.getElementById('rulesModal').style.display = 'block';
  });
  document.getElementById('closeButton').addEventListener('click', () => {
    document.getElementById('rulesModal').style.display = 'none';
  });
  document.addEventListener('keydown', moveSurvivor);

  // Initialize the game
  initializeGame();
};

function initializeGame() {
  // Game setup code here, if needed
}

let zombieSpawnInterval;

function startGame() {
  if (runGame) clearInterval(runGame);
  if (timer) clearInterval(timer);
  if (zombieSpawnInterval) clearInterval(zombieSpawnInterval);

  runGame = setInterval(gameLoop, 80);
  survivor = new Runner(550, 400, surv, 50, 50, 10);
  timer = setInterval(updateTimer, 1000);
  zombieSpawnInterval = setInterval(spawnZombies, 10000);
}

class Runner {
  constructor(x, y, image, width, height, speed) {
    this.x = x;
    this.y = y;
    this.image = image;
    this.width = width;
    this.height = height;
    this.speed = speed;
  }

  render() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

class Zombie extends Runner {
  constructor(x, y, image, width, height, speed, type) {
    super(x, y, image, width, height, speed);
    this.type = type;
  }
}


function moveSurvivor(e) {
  if (!survivor) return;

  const moveAmount = 10;
  switch (e.key) {
    case 'ArrowUp':
      survivor.y = Math.max(0, survivor.y - moveAmount);
      break;
    case 'ArrowDown':
      survivor.y = Math.min(canvas.height - survivor.height, survivor.y + moveAmount);
      break;
    case 'ArrowLeft':
      survivor.x = Math.max(0, survivor.x - moveAmount);
      break;
    case 'ArrowRight':
      survivor.x = Math.min(canvas.width - survivor.width, survivor.x + moveAmount);
      break;
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (zombies.some(zombie => checkCollision(survivor, zombie))) {
    endGame();
    return;
  }

  for (let zombie of zombies) {
    moveZombie(zombie);
    zombie.render();
  }

  survivor.render();
}

function moveZombie(zombie) {
  if (zombie.type === 'follower') {
    const deltaX = survivor.x - zombie.x;
    const deltaY = survivor.y - zombie.y;
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

    if (distance > 0) {
      const moveSpeedX = (deltaX / distance) * zombie.speed;
      const moveSpeedY = (deltaY / distance) * zombie.speed;

      zombie.x += moveSpeedX;
      zombie.y += moveSpeedY;
    }
  } else if (zombie.type === 'wanderer') {
    // Logic to make the zombie trend downward with some randomness
    let deviation = (Math.random() - 0.5) * Math.PI / 4; // Deviation up to +/- 45 degrees
    let trendingDownwardAngle = Math.PI / 2 + deviation;

    zombie.x += Math.cos(trendingDownwardAngle) * zombie.speed;
    zombie.y += Math.sin(trendingDownwardAngle) * (0.5 * zombie.speed); // Make them move 1.5 times faster downwards

    // Ensure zombies don't wander off the canvas
    zombie.x = Math.min(canvas.width, Math.max(0, zombie.x));
    zombie.y = Math.min(canvas.height, Math.max(0, zombie.y));
  }
}



function checkCollision(obj1, obj2) {
  const obj1Left = obj1.x + obj1.width * 0.2;
  const obj1Right = obj1.x + obj1.width * 0.5;
  const obj1Top = obj1.y + obj1.height * 0.2;
  const obj1Bottom = obj1.y + obj1.height * 0.5;

  const obj2Left = obj2.x + obj2.width * 0.2;
  const obj2Right = obj2.x + obj2.width * 0.8;
  const obj2Top = obj2.y + obj2.height * 0.2;
  const obj2Bottom = obj2.y + obj2.height * 0.8;

  return (
    obj1Left < obj2Right &&
    obj1Right > obj2Left &&
    obj1Top < obj2Bottom &&
    obj1Bottom > obj2Top
  );
}



function spawnZombies() {
  const maxZombies = 400;
  if (zombies.length < maxZombies) {
    // Zombies spawn from anywhere along the top
    let x = Math.random() * canvas.width;
    let y = 0;

    const zombieType = Math.random() < 0.5 ? 'follower' : 'wanderer';

    zombies.push(new Zombie(x, y, zomb, 40, 40, 3, zombieType));
  }
}



setInterval(spawnZombies, 1000);



function updateTimer() {
  countdown--;

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;
  document.getElementById('timer').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  if (countdown === 0) endGame(true);
}

function endGame(win = false) {
  clearInterval(runGame);
  clearInterval(timer);
  clearInterval(zombieSpawnInterval);

  zombies.length = 0;

  if (win) {
    alert("You Win!");
  } else {
    alert("Game Over!");
  }

}
