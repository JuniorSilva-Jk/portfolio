class Overworld {
 constructor(config) {
   this.element = config.element;
   this.canvas = this.element.querySelector(".game-canvas");
   this.ctx = this.canvas.getContext("2d");
   this.map = null;
 }
 
 gameLoopStepWork(delta) {
  //Clear off the canvas
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

  //Establish the camera person
  const cameraPerson = this.map.gameObjects.hero;

  //Update all objects
  Object.values(this.map.gameObjects).forEach(object => {
    object.update({
      delta,
      arrow: this.directionInput.direction,
      map: this.map,
    })
  })

  //Draw Lower layer
  this.map.drawLowerImage(this.ctx, cameraPerson);

  //Draw Game Objects
  Object.values(this.map.gameObjects).sort((a,b) => {
    return a.y - b.y;
  }).forEach(object => {
    object.sprite.draw(this.ctx, cameraPerson);
  })

  //Draw Upper layer
  this.map.drawUpperImage(this.ctx, cameraPerson);
}

startGameLoop() {
  let previousMs;
  const step = 1 / 90;

  const stepFn = (timestampMs) => {
    // Stop here if paused
    if (this.map.isPaused) {
      return;
    }
    if (previousMs === undefined) {
      previousMs = timestampMs;
    }

    let delta = (timestampMs - previousMs) / 1000;
    while (delta >= step) {
      this.gameLoopStepWork(delta);
      delta -= step;
    }
    previousMs = timestampMs - delta * 1000; // Make sure we don't lose unprocessed (delta) time

    // Business as usual tick
    requestAnimationFrame(stepFn)
  }

  // First tick
  requestAnimationFrame(stepFn)
}

 bindActionInput() {
   new KeyPressListener("Enter", () => {
     //Is there a person here to talk to?
     this.map.checkForActionCutscene()
   })
 }

 bindHeroPositionCheck() {
   document.addEventListener("PersonWalkingComplete", e => {
     if (e.detail.whoId === "hero") {
       //Hero's position has changed
       this.map.checkForFootstepCutscene()
     }
   })
 }


 startMap(mapConfig, heroInitialState=null) {
  this.map = new OverworldMap(mapConfig);
  this.map.overworld = this;
  this.map.mountObjects();

  if (heroInitialState) {
    const {hero} = this.map.gameObjects;
    hero.x = heroInitialState.x;
    hero.y = heroInitialState.y;
    hero.direction = heroInitialState.direction;


  }
 }

async init() {

  const container = document.querySelector(".game-container");
 
  //Load the HUD
 this.hud = new Hud();
 this.hud.init(container);

 //Start the first map
 this.startMap(window.OverworldMaps.Bedroom);

 //Create controls
 this.bindActionInput();
 this.bindHeroPositionCheck();

 this.directionInput = new DirectionInput();
 this.directionInput.init();

 //Kick off the game!
 this.startGameLoop();

   this.map.startCutscene([
    
    { type: "textMessage", text: `Olá!` },
    { type: "textMessage", text: "Meu nome é Valdean Júnior, sou engenheiro de software"},
    { type: "textMessage", text: "Esté é um pequeno projeto que fiz para apresentação do meu portfólio"},
    { type: "textMessage", text: "Antes de tudo algumas observações!"},
    { type: "textMessage", text: "Para controlar o mini jr por favor utilize as setas de seu teclado, ou as teclas W A S D"},
    { who: "hero", type: "walk",  direction: "up" },
    { who: "hero", type: "walk",  direction: "right" },
    { who: "hero", type: "walk",  direction: "right" },
    { who: "hero", type: "walk",  direction: "right" },
    { who: "hero", type: "walk",  direction: "right" },
    { who: "hero", type: "walk",  direction: "right" },
    { who: "hero", type: "walk",  direction: "right" },
    { who: "hero", type: "walk",  direction: "right" },
    { who: "hero", type: "walk",  direction: "right" },
    { who: "hero", type: "walk",  direction: "up" },
    { who: "hero", type: "stand",  direction: "down" },
    { type: "textMessage", text: "As setas no chão indicam os objetos interativos..."},
    { type: "textMessage", text: "Para interagir utilize a tecla 'Enter' "},
    { who: "hero", type: "stand",  direction: "up" },
    { type: "textMessage", text: "Pressione 'Enter' "},
    
  ])



 }
}
