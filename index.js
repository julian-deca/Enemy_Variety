window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  const WIDTH = (canvas.width = 500);
  const HEIGHT = (canvas.height = 800);

  class Game {
    constructor(ctx, width, height) {
      this.ctx = ctx;
      this.height = height;
      this.width = width;
      this.enemies = [];
      this.enemyInterval = 1000;
      this.enemyTimer = 0;
    }
    update(deltaTime) {
      if (this.enemyTimer > this.enemyInterval) {
        this.#addNewEnemy();
        this.enemyTimer = 0;
        this.enemies.filter((obj) => !obj.markedForDeletion);
      } else {
        this.enemyTimer += deltaTime;
      }
      this.enemies.forEach((obj) => obj.update());
    }
    draw() {
      this.enemies.forEach((obj) => obj.draw());
    }
    #addNewEnemy() {
      this.enemies.push(new Enemy(this));
    }
  }

  class Enemy {
    constructor(game) {
      this.game = game;
      this.x = this.game.width;
      this.y = Math.random() * this.game.height;
      this.width = 100;
      this.height = 100;
      this.markedForDeletion = false;
    }
    update() {
      this.x--;
      if (this.x < 0 - this.width) this.markedForDeletion = true;
    }
    draw() {
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  const game = new Game(ctx, WIDTH, HEIGHT);

  let lastTime = 1;
  function animate(timeStamp) {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    game.update(deltaTime);
    game.draw();
    requestAnimationFrame(animate);
  }
  animate(0);
});
