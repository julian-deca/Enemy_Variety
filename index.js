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
      this.enemyInterval = 500;
      this.enemyTimer = 0;
      this.enemyTypes = ["ghost", "worm", "spider"];
    }
    update(deltaTime) {
      if (this.enemyTimer > this.enemyInterval) {
        this.#addNewEnemy();
        this.enemyTimer = 0;
        this.enemies.filter((obj) => !obj.markedForDeletion);
      } else {
        this.enemyTimer += deltaTime;
      }
      this.enemies.forEach((obj) => obj.update(deltaTime));
    }
    draw() {
      this.enemies.forEach((obj) => obj.draw(ctx));
    }
    #addNewEnemy() {
      this.randomEnemy =
        this.enemyTypes[Math.round(Math.random() * this.enemyTypes.length)];
      if (this.randomEnemy == "worm") this.enemies.push(new Worm(this));
      else if (this.randomEnemy == "ghost") this.enemies.push(new Ghost(this));
      else if (this.randomEnemy == "spider")
        this.enemies.push(new Spider(this));

      /*this.enemies.sort((a, b) => {
        return a.y - b.y;
      });*/
    }
  }

  class Enemy {
    constructor(game) {
      this.game = game;

      this.markedForDeletion = false;
    }
    update(deltaTime) {
      this.x -= this.vx * deltaTime;
      if (this.x < 0 - this.width) this.markedForDeletion = true;
    }
    draw(ctx) {
      ctx.drawImage(
        this.image,
        this.spriteWidth * 0,
        0,
        this.spriteWidth,
        this.spriteHeight,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  }

  class Worm extends Enemy {
    constructor(game) {
      super(game);
      this.x = this.game.width;
      this.spriteHeight = 171;
      this.spriteWidth = 229;
      this.width = this.spriteWidth * 0.5;
      this.height = this.spriteHeight * 0.5;
      this.y = this.game.height - this.height;
      this.image = worm;
      this.vx = Math.random() * 0.1 + 0.1;
    }
  }

  class Ghost extends Enemy {
    constructor(game) {
      super(game);
      this.x = this.game.width;
      this.spriteWidth = 261;
      this.spriteHeight = 209;
      this.width = this.spriteWidth * 0.5;
      this.height = this.spriteHeight * 0.5;
      this.y = Math.random() * this.game.height * 0.6;
      this.image = ghost;
      this.vx = Math.random() * 0.2 + 0.1;
      this.angle = 0;
      this.curve = Math.random() * 3;
    }
    update(deltaTime) {
      super.update(deltaTime);
      this.y += Math.sin(this.angle) * this.curve;
      this.angle += 0.04;
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = 0.7;
      super.draw(ctx);
      ctx.restore();
    }
  }

  class Spider extends Enemy {
    constructor(game) {
      super(game);
      this.x = Math.random() * this.game.width;
      this.spriteWidth = 310;
      this.spriteHeight = 175;
      this.width = this.spriteWidth * 0.5;
      this.height = this.spriteHeight * 0.5;
      this.y = 0 - this.height;
      this.image = spider;
      this.vx = 0;
      this.vy = Math.random() * 0.1 + 0.1;
      this.maxLength = Math.random() * this.game.height;
    }
    update(deltaTime) {
      super.update(deltaTime);
      this.y += this.vy;
      if (this.y > this.maxLength) this.vy *= -1;
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
