(function () {
  const TAMX = 600;
  const TAMY = 800;
  const FPS = 100;

  const PROB_ENEMY_SHIP = 0.7;

  let space, ship,placar,vida;
  let enemies = [];
  let beams = [];

  let pause = true;
  let interval;
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {ship.mudaDirecao(-1);
      ship.direcao = 0}
    else if (e.key === "ArrowRight") ship.mudaDirecao(+1);
    else if (e.code === "Space") beams.push(new Beam());
    else if (e.key === "p"){
      if(pause){
        interval = window.setInterval(run, 1000 / FPS);
        pause = false;
        vida.perdeVida();
      }
      else{
        window.clearInterval(interval);
        pause = true;
      }
    }
  });


  function init() {
    space = new Space();
    ship = new Ship();
    placar = new Placar();
    vida = new Vidas();
    placar.show(placar.pontos);
  }

  class Space {
    constructor() {
      this.element = document.getElementById("space");
      this.element.style.width = `${TAMX}px`;
      this.element.style.height = `${TAMY}px`;
      this.element.style.backgroundPositionY = "0px";
    }
    move() {
      this.element.style.backgroundPositionY = `${parseInt(this.element.style.backgroundPositionY) + 1}px`;
    }
  }

  class Vidas{
    constructor(){
      this.element = document.getElementById("vidas");
      this.element.style.backgroundImage = `url(assets/life.png)`;
      this.element.style.left = `${TAMX-7*15-3*35 -10}px`;
      this.qt = 3;
      this.element.style.width = `${this.qt*35}px`;
      this.element.style.height = `${27}px`;
    }

    perdeVida(){
      this.qt = this.qt - 1;
      this.element.style.width = `${this.qt*35}px`;
      console.log(this.qt);
    }
  }

  class Placar {
    constructor(){
      this.element = document.getElementById("placar");
      this.element.style.width = `${7*15}px`;
      this.element.style.height = `${30}px`;
      this.element.style.left = `${parseInt(TAMX) - 110}px`;
      this.element.style.color = `white`;
      this.element.style.overflow = "hidden";
      this.element.style.direction = "rtl";
      this.element.style.fontSize = `${30}px`;
      this.element.style.textAlign = "right";
      this.pontos = 1;
    }

    show(){

      this.element.innerHTML = "000000" + this.pontos;
    }

    addPontos(x){
      this.pontos+=x; 
    }
  }

  class Ship {
    constructor() {
      this.element = document.getElementById("ship");
      this.AssetsDirecoes = [
        "assets/playerLeft.png",
        "assets/player.png",
        "assets/playerRight.png",
      ];
      this.direcao = 1;
      this.element.src = this.AssetsDirecoes[this.direcao];
      this.element.style.bottom = "20px";
      this.element.style.left = `${parseInt(TAMX / 2) - 50}px`;
      this.element.style.zIndex = 2;
    }
    mudaDirecao(giro) {
      if (this.direcao + giro >= 0 && this.direcao + giro <= 2) {
        this.direcao += giro;
        this.element.src = this.AssetsDirecoes[this.direcao];
      }
    }
    move() {      
      if (this.direcao === 0 && this.element.style.left != '0px')
        this.element.style.left = `${parseInt(this.element.style.left) - 5}px`;
      if (this.direcao === 2 && this.element.style.left != `${TAMX-100}px`)
        this.element.style.left = `${parseInt(this.element.style.left) + 5}px`;
      space.move();
    }
  }

  class EnemyShip {
    constructor() {
      this.element = document.createElement("img");
      this.element.className = "enemy-ship";
      this.element.src = "assets/enemyShip.png";
      this.element.style.top = "0px";
      this.element.style.left = `${Math.floor(Math.random() * TAMX)}px`;
      this.coin = (Math.floor(Math.random() *10))%2;
      space.element.appendChild(this.element);
      console.log(this.element.coin);
    }
    move() {
      this.element.style.top = `${parseInt(this.element.style.top) + 2}px`;

      if(parseInt(this.element.style.left) >= TAMX-100){
        this.coin = false;
      }
      if(parseInt(this.element.style.left) <= 0){
        this.coin = true;
      }
      if(this.coin == 1){
        this.element.style.left = `${parseInt(this.element.style.left) + 1}px`;
      }
      else{
        this.element.style.left = `${parseInt(this.element.style.left) - 1}px`;
      }
      this.removeDOM();
    }

    removeDOM(){
      if(this.element.style.top == `${TAMY}px`){
        this.element.remove();
      }
    }
  }

  class Beam {
    constructor() {
      this.element = document.createElement("img");
      this.element.className = "beam";
      this.element.src = "assets/laserGreen.png";
      this.element.style.left = `${parseInt(ship.element.style.left) + 46}px`;
      this.element.style.bottom = ship.element.style.bottom;
      space.element.appendChild(this.element);
      
    }
    move() {
      console.log(this.element.style.bottom);
      this.element.style.bottom = `${parseInt(this.element.style.bottom) + 4}px`;
      this.removeDOM();
    }

    removeDOM(){
      if(this.element.style.bottom == `${780}px`){
        this.element.remove();
      }
    }
  }

  function run() {
    const random_enemy_ship = Math.random() * 100;
    if (random_enemy_ship <= PROB_ENEMY_SHIP) {
      enemies.push(new EnemyShip());
    }
    enemies.forEach((e) => e.move());
    beams.forEach((e) => e.move());
    placar.show(placar.pontos);
    ship.move();
  }

  init();
})();
