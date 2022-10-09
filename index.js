document.addEventListener("load", () => {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  const WIDTH = (canvas.width = 500);
  const HEIGHT = (canvas.height = 800);

  class Game {
    constructor() {
      this.enemies = [];
    }
    update() {}
    draw() {}
    #addNewEnemy() {}
  }

  class Enemy {
    constructor() {}
    update() {}
    draw() {}
  }

  let lastTIme = 1;
  function animate(timeStamp) {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    const deltaTime = timeStamp - lastTIme;
    console.log(deltaTime);
    lastTIme = timeStamp;
    requestAnimationFrame(animate);
  }
  animate();
});
