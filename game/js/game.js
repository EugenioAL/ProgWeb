(function () {
  const TAMX = 600;
  const TAMY = 800;
  let FPS = 50;

  const PROB_ENEMY_SHIP = 0.2;
  const PROB_ENEMY_UFO = 0.3;
  const PROB_ENEMY_METEOR = 0.1;
  const PROB_ENEMY_METEORB = 0.4;

  let space, ship,placar,vida;
  let enemies = [];
  let beams = [];

  let pause = true;
  let interval;
  let gameOver = 0;


  function init() {
    space = new Space();
    ship = new Ship();
    placar = new Placar();
    vida = new Vidas();
    placar.show(placar.pontos);
    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {ship.mudaDirecao(-1);
        ship.direcao = 0}
      else if (e.key === "ArrowRight") ship.mudaDirecao(+1);
      else if (e.code === "Space") beams.push(new Beam());
      else if (e.key === "p"){
        if(pause){
          interval = window.setInterval(run, 1000 / FPS);
          pause = false;
        }
        else{
          window.clearInterval(interval);
          pause = true;
        }
      }
    });
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

  function getDistance(x1,y1,x2,y2){
    let xDistance = x2-x1;
    let yDistance = y2-y1;

    return Math.sqrt(Math.pow(xDistance,2)+ Math.pow(yDistance,2));
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
      this.raio = 37;
      this.posx = parseInt(this.element.style.left) + this.raio;
      this.posy = TAMY - parseInt(this.element.style.bottom) - this.raio;
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
        this.posx = parseInt(this.element.style.left) + this.raio;
        this.posy = TAMY - parseInt(this.element.style.bottom) - this.raio;
      if (this.direcao === 2 && this.element.style.left != `${TAMX-100}px`)
        this.element.style.left = `${parseInt(this.element.style.left) + 5}px`;
        this.posx = parseInt(this.element.style.left) + this.raio;
        this.posy = TAMY - parseInt(this.element.style.bottom) - this.raio;
      space.move();
    }
  }

  class EnemyShip {
    constructor() {
      this.element = document.createElement("img");
      this.element.className = "enemy-ship";
      this.element.src = "assets/enemyShip.png";
      this.element.style.top = `0px`;
      this.raio = 25;
      this.pontos = 50;
      this.element.style.left = `${Math.floor(Math.random() * TAMX)}px`;
      this.posx = parseInt(this.element.style.left) + this.raio;
      this.posy = parseInt(this.element.style.top) + this.raio;
      this.coin = (Math.floor(Math.random() *10))%2;
      space.element.appendChild(this.element);
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
        this.posx = parseInt(this.element.style.left) + this.raio;
        this.posy = parseInt(this.element.style.top) + this.raio;
      }
      else{
        this.element.style.left = `${parseInt(this.element.style.left) - 1}px`;
        this.posx = parseInt(this.element.style.left) + this.raio;
        this.posy = parseInt(this.element.style.top) + this.raio;
      }
      this.removeDOM();
    }

    removeDOM(){
      if(parseInt(this.element.style.top) >= 800){
        this.element.remove();
      }
    }

    colide(e){
      let hit = false;
      if(getDistance(this.posx,this.posy,e.posx,e.posy) < this.raio + e.raio){
        this.element.style.top = `900px`;
        hit = true;
      }
      if(hit){
        if(e.raio == 37){
          vida.perdeVida();
          return 1;
        }
        else if(e.raio == 6){
          placar.addPontos(this.pontos);
          return 1;
        }
      }
      return 0;
    }
  }

  class MeteorSmall {
    constructor() {
      this.element = document.createElement("img");
      this.element.className = "meteor-small";
      this.element.src = "assets/meteorSmall.png";
      this.element.style.top = "0px";
      this.raio = 21;
      this.pontos = 100;
      this.element.style.left = `${Math.floor(Math.random() * TAMX)}px`;
      this.coin = (Math.floor(Math.random() *10))%2;
      space.element.appendChild(this.element);
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
        this.posx = parseInt(this.element.style.left) + this.raio;
        this.posy = parseInt(this.element.style.top) + this.raio;
      }
      else{
        this.element.style.left = `${parseInt(this.element.style.left) - 1}px`;
        this.posx = parseInt(this.element.style.left) + this.raio;
        this.posy = parseInt(this.element.style.top) + this.raio;
      }
      this.removeDOM();
    }

    removeDOM(){
      if(this.element.style.top == `${TAMY}px`){
        this.element.remove();
      }
    }

    colide(e){
      let hit = false;
      if(getDistance(this.posx,this.posy,e.posx,e.posy) < this.raio + e.raio){
        this.element.style.top = `900px`;
        hit = true;
      }
      if(hit){
        if(e.raio == 37){
          vida.perdeVida();
          return 1;
        }
        else if(e.raio == 6){
          placar.addPontos(this.pontos);
          return 1;
        }
      }
      return 0;
    }
  }

  class MeteorBig {
    constructor() {
      this.element = document.createElement("img");
      this.element.className = "meteor-big";
      this.element.src = "assets/meteorBig.png";
      this.element.style.top = "0px";
      this.raio = 50;
      this.pontos = 10;
      this.posx = parseInt(this.element.style.left) + this.raio;
      this.posy = TAMY - parseInt(this.element.style.bottom) - this.raio;
      this.element.style.left = `${Math.floor(Math.random() * TAMX)}px`;
      this.coin = (Math.floor(Math.random() *10))%2;
      space.element.appendChild(this.element);
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
        this.posx = parseInt(this.element.style.left) + this.raio;
        this.posy = parseInt(this.element.style.top) + this.raio;
      }
      else{
        this.element.style.left = `${parseInt(this.element.style.left) - 1}px`;
        this.posx = parseInt(this.element.style.left) + this.raio;
        this.posy = parseInt(this.element.style.top) + this.raio;
      }
      this.removeDOM();
    }

    removeDOM(){
      if(this.element.style.top == `${TAMY}px`){
        this.element.remove();
        vida.perdeVida();
      }
    }

    colide(e){
      let hit = false;
      if(getDistance(this.posx,this.posy,e.posx,e.posy) < this.raio + e.raio){
        this.element.style.top = `900px`;
        hit = true;
      }
      if(hit){
        if(e.raio == 37){
          vida.perdeVida();
          return 1;
        }
        else if(e.raio == 6){
          placar.addPontos(this.pontos);
          return 1;
        }
      }
      return 0;
    }
  }

  class EnemyUFO {
    constructor() {
      this.element = document.createElement("img");
      this.element.className = "enemy-ufo";
      this.element.src = "assets/enemyUFO.png";
      this.element.style.top = "0px";
      this.raio = 45;
      this.pontos = 20;
      this.posx = parseInt(this.element.style.left) + this.raio;
      this.posy = TAMY - parseInt(this.element.style.bottom) - this.raio;
      this.element.style.left = `${Math.floor(Math.random() * TAMX)}px`;
      this.coin = (Math.floor(Math.random() *10))%2;
      space.element.appendChild(this.element);
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
        this.posx = parseInt(this.element.style.left) + this.raio;
        this.posy = parseInt(this.element.style.top) + this.raio;
      }
      else{
        this.element.style.left = `${parseInt(this.element.style.left) - 1}px`;
        this.posx = parseInt(this.element.style.left) + this.raio;
        this.posy = parseInt(this.element.style.top) + this.raio;
      }
      this.removeDOM();
    }

    removeDOM(){
      if(this.element.style.top == `${TAMY}px`){
        space.element.pop(this.element);
        this.element.remove();
      }
    }

    colide(e){
      let hit = false;
      if(getDistance(this.posx,this.posy,e.posx,e.posy) < this.raio + e.raio){
        this.element.style.top = `900px`;
        hit = true;
      }
      if(hit){
        if(e.raio == 37){
          vida.perdeVida();
          return 1;
        }
        else if(e.raio == 6){
          placar.addPontos(this.pontos);
          return 1;
        }
      }
      return 0;
    }
  }

  class Beam {
    constructor() {
      this.element = document.createElement("img");
      this.element.className = "beam";
      this.element.src = "assets/laserGreen.png";
      this.raio = 6;
      this.element.style.left = `${parseInt(ship.element.style.left) + 46}px`;
      this.posx = parseInt(ship.element.style.left) + this.raio;
      this.posy = TAMY - parseInt(ship.element.style.bottom) - this.raio;
      this.element.style.bottom = ship.element.style.bottom;
      space.element.appendChild(this.element);
      
    }
    move() {
      this.element.style.bottom = `${parseInt(this.element.style.bottom) + 4}px`;
      this.posy = TAMY - parseInt(this.element.style.bottom) - this.raio;
      this.removeDOM();
    }

    removeDOM(){
      if(this.element.style.bottom == `${780}px`){
        this.element.remove();
      }
    }

    colide(){
      let index;
      for(index = 0; index < enemies.length; index++ ){
        if(enemies[index].colide(this)){
          enemies.splice(index,1);
          this.element.style.bottom = `${780}px`;
          return 1
        }
      }
      return 0;
    }
  }

  function run() {
    const random_enemy_ship = Math.random() * 100;
    if (random_enemy_ship <= PROB_ENEMY_SHIP) {
      enemies.push(new EnemyShip());
    }
    if (random_enemy_ship <= PROB_ENEMY_UFO) {
      enemies.push(new EnemyUFO());
    }
    if (random_enemy_ship <= PROB_ENEMY_METEORB) {
      enemies.push(new MeteorBig());
    }
    if (random_enemy_ship <= PROB_ENEMY_METEOR) {
      enemies.push(new MeteorSmall());
    }
    enemies.forEach((e) => e.move());
    enemies.forEach((e) => e.colide(ship));
    beams.forEach((e) => e.move());
    beams.forEach((e) => e.colide());
    placar.show(placar.pontos);
    console.log(vida.qt);
    console.log(enemies);
    ship.move()
    if(vida.qt == 0){
      window.clearInterval(interval);
      gameOver = 1;
    }

  }

  init();
  if(gameOver == 1){
    return placar.pontos;
  }
})();
