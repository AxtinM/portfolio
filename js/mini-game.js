// Pip-Boy Mini-Game: Atomic Command
// A simple game inspired by Fallout's mini-games

document.addEventListener('DOMContentLoaded', function() {
  // Game variables
  let gameActive = false;
  let gameContainer = null;
  let score = 0;
  let lives = 3;
  let level = 1;
  let missiles = [];
  let targets = [];
  let explosions = [];
  let lastFrameTime = 0;
  let playerPosition = 50; // Percentage across the screen
  
  // Game constants
  const GAME_WIDTH = 400;
  const GAME_HEIGHT = 300;
  const PLAYER_SIZE = 20;
  const MISSILE_SPEED = 200; // pixels per second
  const TARGET_SPEED = 50; // pixels per second
  const EXPLOSION_DURATION = 500; // milliseconds
  
  // Start the mini-game
  window.startAtomicCommand = function() {
    if (gameActive) return;
    gameActive = true;
    
    // Create game container
    gameContainer = document.createElement('div');
    gameContainer.className = 'atomic-command-game';
    gameContainer.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: ${GAME_WIDTH}px;
      height: ${GAME_HEIGHT}px;
      background-color: #000;
      border: 3px solid #0f0;
      box-shadow: 0 0 20px rgba(0, 255, 0, 0.5);
      overflow: hidden;
      z-index: 9999;
      font-family: monospace;
      color: #0f0;
    `;
    
    // Add game UI
    gameContainer.innerHTML = `
      <div class="game-header" style="display: flex; justify-content: space-between; padding: 5px 10px; border-bottom: 1px solid #0f0;">
        <div>SCORE: <span id="game-score">0</span></div>
        <div>LEVEL: <span id="game-level">1</span></div>
        <div>LIVES: <span id="game-lives">3</span></div>
      </div>
      <div class="game-area" style="position: relative; height: calc(100% - 30px);">
        <div id="player" style="position: absolute; bottom: 10px; left: calc(50% - ${PLAYER_SIZE/2}px); width: ${PLAYER_SIZE}px; height: ${PLAYER_SIZE}px; background-color: #0f0;"></div>
      </div>
      <div class="game-instructions" style="position: absolute; top: 50%; left: 0; width: 100%; text-align: center; transform: translateY(-50%); font-size: 16px;">
        PRESS SPACE TO START<br>
        LEFT/RIGHT ARROWS TO MOVE<br>
        UP ARROW TO FIRE
      </div>
    `;
    
    document.body.appendChild(gameContainer);
    
    // Add event listeners
    window.addEventListener('keydown', handleKeyDown);
    
    // Start game loop when space is pressed
    const startGameHandler = function(e) {
      if (e.code === 'Space' || e.key === ' ') {
        gameContainer.querySelector('.game-instructions').style.display = 'none';
        window.removeEventListener('keydown', startGameHandler);
        startGameLoop();
      }
    };
    
    window.addEventListener('keydown', startGameHandler);
    
    // Add close button
    const closeButton = document.createElement('div');
    closeButton.style.cssText = `
      position: absolute;
      top: 5px;
      right: 5px;
      width: 20px;
      height: 20px;
      background-color: #500;
      color: #fff;
      text-align: center;
      line-height: 20px;
      cursor: pointer;
      z-index: 10000;
    `;
    closeButton.textContent = 'X';
    closeButton.addEventListener('click', endGame);
    gameContainer.appendChild(closeButton);
  };
  
  // Game loop
  function startGameLoop() {
    lastFrameTime = performance.now();
    requestAnimationFrame(gameLoop);
    
    // Spawn initial targets
    spawnTargets();
  }
  
  function gameLoop(timestamp) {
    if (!gameActive) return;
    
    const deltaTime = (timestamp - lastFrameTime) / 1000; // Convert to seconds
    lastFrameTime = timestamp;
    
    updateGame(deltaTime);
    renderGame();
    
    requestAnimationFrame(gameLoop);
  }
  
  // Game update logic
  function updateGame(deltaTime) {
    // Update missiles
    for (let i = missiles.length - 1; i >= 0; i--) {
      missiles[i].y -= MISSILE_SPEED * deltaTime;
      
      // Remove missiles that go off screen
      if (missiles[i].y < 0) {
        missiles.splice(i, 1);
      }
    }
    
    // Update targets
    for (let i = targets.length - 1; i >= 0; i--) {
      targets[i].y += TARGET_SPEED * deltaTime;
      
      // Check if target hit the ground
      if (targets[i].y > GAME_HEIGHT - 20) {
        targets.splice(i, 1);
        decrementLives();
        continue;
      }
      
      // Check for missile collisions
      for (let j = missiles.length - 1; j >= 0; j--) {
        if (checkCollision(missiles[j], targets[i])) {
          // Create explosion
          explosions.push({
            x: targets[i].x,
            y: targets[i].y,
            size: 20,
            timeLeft: EXPLOSION_DURATION
          });
          
          // Remove missile and target
          missiles.splice(j, 1);
          targets.splice(i, 1);
          
          // Increase score
          incrementScore();
          break;
        }
      }
    }
    
    // Update explosions
    for (let i = explosions.length - 1; i >= 0; i--) {
      explosions[i].timeLeft -= deltaTime * 1000;
      explosions[i].size += deltaTime * 40;
      
      if (explosions[i].timeLeft <= 0) {
        explosions.splice(i, 1);
      }
    }
    
    // Spawn new targets if needed
    if (targets.length === 0) {
      level++;
      document.getElementById('game-level').textContent = level;
      spawnTargets();
    }
  }
  
  // Render game elements
  function renderGame() {
    const gameArea = gameContainer.querySelector('.game-area');
    
    // Clear previous elements (except player)
    const elements = gameArea.querySelectorAll('.missile, .target, .explosion');
    elements.forEach(el => el.remove());
    
    // Render missiles
    missiles.forEach(missile => {
      const missileEl = document.createElement('div');
      missileEl.className = 'missile';
      missileEl.style.cssText = `
        position: absolute;
        left: ${missile.x}px;
        top: ${missile.y}px;
        width: 4px;
        height: 10px;
        background-color: #0f0;
      `;
      gameArea.appendChild(missileEl);
    });
    
    // Render targets
    targets.forEach(target => {
      const targetEl = document.createElement('div');
      targetEl.className = 'target';
      targetEl.style.cssText = `
        position: absolute;
        left: ${target.x}px;
        top: ${target.y}px;
        width: 15px;
        height: 15px;
        background-color: #f00;
        transform: rotate(45deg);
      `;
      gameArea.appendChild(targetEl);
    });
    
    // Render explosions
    explosions.forEach(explosion => {
      const explosionEl = document.createElement('div');
      explosionEl.className = 'explosion';
      explosionEl.style.cssText = `
        position: absolute;
        left: ${explosion.x - explosion.size/2}px;
        top: ${explosion.y - explosion.size/2}px;
        width: ${explosion.size}px;
        height: ${explosion.size}px;
        background-color: rgba(255, 200, 0, 0.7);
        border-radius: 50%;
        box-shadow: 0 0 10px rgba(255, 200, 0, 0.5);
      `;
      gameArea.appendChild(explosionEl);
    });
  }
  
  // Handle keyboard input
  function handleKeyDown(e) {
    if (!gameActive) return;
    
    const player = document.getElementById('player');
    
    switch (e.key) {
      case 'ArrowLeft':
        playerPosition = Math.max(0, playerPosition - 5);
        player.style.left = `calc(${playerPosition}% - ${PLAYER_SIZE/2}px)`;
        break;
      case 'ArrowRight':
        playerPosition = Math.min(100, playerPosition + 5);
        player.style.left = `calc(${playerPosition}% - ${PLAYER_SIZE/2}px)`;
        break;
      case 'ArrowUp':
        // Fire missile
        const playerRect = player.getBoundingClientRect();
        const gameAreaRect = gameContainer.querySelector('.game-area').getBoundingClientRect();
        
        missiles.push({
          x: playerRect.left - gameAreaRect.left + PLAYER_SIZE/2 - 2,
          y: playerRect.top - gameAreaRect.top
        });
        
        // Play sound
        playGameSound('fire');
        break;
    }
  }
  
  // Spawn targets
  function spawnTargets() {
    const count = Math.min(5 + level, 15);
    
    for (let i = 0; i < count; i++) {
      targets.push({
        x: Math.random() * (GAME_WIDTH - 20) + 10,
        y: -20 - Math.random() * 100
      });
    }
  }
  
  // Check collision between two objects
  function checkCollision(obj1, obj2) {
    const distance = Math.sqrt(
      Math.pow(obj1.x - obj2.x, 2) + 
      Math.pow(obj1.y - obj2.y, 2)
    );
    
    return distance < 15;
  }
  
  // Update score
  function incrementScore() {
    score += 10 * level;
    document.getElementById('game-score').textContent = score;
    playGameSound('explosion');
  }
  
  // Update lives
  function decrementLives() {
    lives--;
    document.getElementById('game-lives').textContent = lives;
    playGameSound('hit');
    
    if (lives <= 0) {
      gameOver();
    }
  }
  
  // Game over
  function gameOver() {
    gameActive = false;
    
    const gameOverMessage = document.createElement('div');
    gameOverMessage.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: rgba(0, 0, 0, 0.8);
      padding: 20px;
      text-align: center;
      color: #f00;
      font-size: 24px;
      z-index: 10001;
    `;
    gameOverMessage.innerHTML = `
      GAME OVER<br>
      SCORE: ${score}<br>
      <span style="font-size: 16px; color: #0f0;">PRESS SPACE TO RESTART</span>
    `;
    
    gameContainer.appendChild(gameOverMessage);
    
    // Restart on space
    const restartHandler = function(e) {
      if (e.code === 'Space' || e.key === ' ') {
        window.removeEventListener('keydown', restartHandler);
        gameContainer.removeChild(gameOverMessage);
        resetGame();
      }
    };
    
    window.addEventListener('keydown', restartHandler);
  }
  
  // Reset game
  function resetGame() {
    score = 0;
    lives = 3;
    level = 1;
    missiles = [];
    targets = [];
    explosions = [];
    playerPosition = 50;
    
    document.getElementById('game-score').textContent = '0';
    document.getElementById('game-lives').textContent = '3';
    document.getElementById('game-level').textContent = '1';
    
    const player = document.getElementById('player');
    player.style.left = `calc(50% - ${PLAYER_SIZE/2}px)`;
    
    gameActive = true;
    startGameLoop();
  }
  
  // End game and remove from DOM
  function endGame() {
    gameActive = false;
    window.removeEventListener('keydown', handleKeyDown);
    document.body.removeChild(gameContainer);
  }
  
  // Play game sounds
  function playGameSound(type) {
    const audio = new Audio();
    audio.volume = 0.2;
    
    switch (type) {
      case 'fire':
        audio.src = 'data:audio/wav;base64,UklGRlwOAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YTgOAAAAAAEA/v8CAP//AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
        break;
      case 'explosion':
        audio.src = 'data:audio/wav;base64,UklGRlQQAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YTAQAAACAgMEAgcDBwMHAwcDBwQGBQUGBAcDBwMHAwcDBwMHAwcDBwMHAgYCBQIEAgMCAQEBAAAAAP/+/v3+/f79/v3+/f79/v3+/f79/v3+/f79/v3+/f79/f78/fv8+/v7+vr5+Pj39/b19PTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY1tbV1NPT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDt6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejo=';
        break;
      case 'hit':
        audio.src = 'data:audio/wav;base64,UklGRpQJAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YXAJAAAAAAECAgMDAwQEBQUFBQUFBQUFBAQDAwICAQEAAAAA//7//f38/Pv7+/v6+vr6+vr6+/v7+/z8/f3+/v8AAQECAgMEBAUFBgcHCAgJCQoKCgsLCwsMDAwMDAwMCwsLCwsKCgkJCQgIBwcGBgUFBAQDAwIBAQEAAAAA//7+/f39/Pz8+/v7+/r6+vr6+vr6+vr6+vr7+/v7/Pz8/f39/v7+/v8AAAABAQECAgIDAwMEBAQEBAUFBQUFBQUFBQUFBQUEBAQEBAMDAwMCAgICAQEBAQAAAAAAAAD//////////////////////////////////////////////////////////////wAAAAEBAQICAgMDAwQEBAQFBQUFBQUFBQUFBQUEBAQEBAMDAwMCAgICAQEBAQAAAAAAAAA=';
        break;
    }
    
    audio.play();
  }
});

// Function to add the mini-game button to the portfolio
function addMiniGameButton() {
  const gameButton = document.createElement('div');
  gameButton.className = 'mini-game-button';
  gameButton.innerHTML = `
    <div class="game-icon">🎮</div>
    <div class="game-text">ATOMIC COMMAND</div>
  `;
  gameButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    left: 30px;
    background-color: rgba(0, 56, 0, 0.8);
    color: #0f0;
    padding: 12px 15px;
    border: 2px solid #0f0;
    border-radius: 8px;
    cursor: none;
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: "VT323", monospace;
    font-size: 16px;
    box-shadow: 0 0 15px rgba(0, 255, 0, 0.5);
    z-index: 999;
    transition: all 0.3s ease;
    text-transform: uppercase;
  `;
  
  gameButton.addEventListener('mouseenter', () => {
    gameButton.style.backgroundColor = '#005800';
    gameButton.style.boxShadow = '0 0 15px rgba(0, 255, 0, 0.8)';
  });
  
  gameButton.addEventListener('mouseleave', () => {
    gameButton.style.backgroundColor = '#003800';
    gameButton.style.boxShadow = '0 0 10px rgba(0, 255, 0, 0.5)';
  });
  
  gameButton.addEventListener('click', () => {
    window.startAtomicCommand();
  });
  
  document.body.appendChild(gameButton);
}

// Add the mini-game button after a delay
setTimeout(addMiniGameButton, 10000);
