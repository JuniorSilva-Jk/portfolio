class OverworldMap {
  constructor(config) {
    this.overworld = null;
    this.configObjects = config.configObjects; // Configuration content
    this.gameObjects = {}; // Starts empty, live object instances in the map get added here
    this.cutsceneSpaces = config.cutsceneSpaces || {};
    this.walls = config.walls || {};

    this.lowerImage = new Image();
    this.lowerImage.src = config.lowerSrc;

    this.upperImage = new Image();
    this.upperImage.src = config.upperSrc;

    this.isCutscenePlaying = false;

    this.talkingObjects = config.talkingObjects || {};
  }

  drawLowerImage(ctx, cameraPerson) {
    ctx.drawImage(
      this.lowerImage,
      utils.withGrid(10.5) - cameraPerson.x,
      utils.withGrid(6) - cameraPerson.y
    )
  }

  drawUpperImage(ctx, cameraPerson) {
    ctx.drawImage(
      this.upperImage,
      utils.withGrid(10.5) - cameraPerson.x,
      utils.withGrid(6) - cameraPerson.y
    )
  }

  isSpaceTaken(currentX, currentY, direction) {
    const {x,y} = utils.nextPosition(currentX, currentY, direction);
    if (this.walls[`${x},${y}`]) {
      return true;
    }
    // Check for objects that match
    return Object.values(this.gameObjects).find(obj => {
      if (obj.x === x && obj.y === y) { return true; }
      if (obj.intentPosition && obj.intentPosition[0] === x && obj.intentPosition[1] === y) {
        return true;
      }
      return false;
    })
  }

  mountObjects() {
    Object.keys(this.configObjects).forEach(key => {

      let config = this.configObjects[key];
      config.id = key;

      let obj;
      if (config.type === "Person") {
        obj = new Person(config);
      }
      if (config.type === "Objeto") {
        obj = new Objeto(config);
      }
      this.gameObjects[key] = obj;
      this.gameObjects[key].id = key;
      obj.mount(this);
    })
  }

  async startCutscene(events) {
    this.isCutscenePlaying = true;

    for (let i = 0; i < events.length; i++) {
      const eventHandler = new OverworldEvent({
        event: events[i],
        map: this,
      })
      //await eventHandler.init();

      const result = await eventHandler.init();
      if (result === "LOST_BATTLE") {
        break;
      }
    }

    this.isCutscenePlaying = false;
  }

  checkForActionCutscene() {
    const hero = this.gameObjects["hero"];
    const nextCoords = utils.nextPosition(hero.x, hero.y, hero.direction);
    const match = Object.values(this.gameObjects).find(object => {
      return `${object.x},${object.y}` === `${nextCoords.x},${nextCoords.y}`
    });
    if (!this.isCutscenePlaying && match && match.talking.length) {

      const relevantScenario = match.talking.find(scenario => {
        return (scenario.required || []).every(sf => {
          return playerState.storyFlags[sf]
        })
      })
      relevantScenario && this.startCutscene(relevantScenario.events)
    }
  }

  checkForFootstepCutscene() {
    const hero = this.gameObjects["hero"];
    const match = this.cutsceneSpaces[ `${hero.x},${hero.y}` ];
    if (!this.isCutscenePlaying && match) {
      this.startCutscene( match[0].events )
    }
  }
}

window.OverworldMaps = {

  Bedroom: {
    id:"Bedroom",
    lowerSrc: "./images/maps/Bedroom.png",
    upperSrc: "",
    // upperSrc: "./images/maps/New_Bedroom_Upper.png",
    configObjects: {
      hero: {
        type: "Person",
        isPlayerControlled: true,
        x: utils.withGrid(5),
        y: utils.withGrid(6),
        direction: "down",
      },
      pc: {
        type: "Objeto",
        x: utils.withGrid(13),
        y: utils.withGrid(3),
        src:"/",
        talking: [
              {
                events: [
                  {type: "textMessage", text: "Aqui estão alguns dos projetos participei do desenvolvimento e manutenção durante 4 anos como programador"},
                  { type: "computerScreen", text: " " }
                ]
              }
        ]
      },
      servidor: {
        type: "Objeto",
        x: utils.withGrid(15),
        y: utils.withGrid(3),
        src:"/",
        talking: [
              {
                events: [
                  { type: "textMessage", text: "Servidor rodando na porta 3000" }
                ]
              }
        ]
      },
      livros: {
        type: "Objeto",
        x: utils.withGrid(15),
        y: utils.withGrid(7),
        src:"/",
        talking: [
              {
                events: [
                  { type: "textMessage", text: `Este é um resumo do meu currículo com a descrição de minhas experiências nestes 4 anos como programador` },
                  { type: "textMessage", text: `Ao final deste livro sua versão completa estará disponível para download` },
                  { type: "book", text: "livros"},
                ]
              }
        ]
      },
    },
    walls: {
      // Left Wall
      [utils.asGridCoord(0, 0)]: true,
      [utils.asGridCoord(0, 1)]: true,
      [utils.asGridCoord(0, 2)]: true,
      [utils.asGridCoord(0, 3)]: true,
      [utils.asGridCoord(0, 4)]: true,
      [utils.asGridCoord(0, 5)]: true,
      [utils.asGridCoord(0, 6)]: true,
      [utils.asGridCoord(0, 7)]: true,
      [utils.asGridCoord(0, 8)]: true,
      [utils.asGridCoord(0, 9)]: true,
      // Right Wall 
      [utils.asGridCoord(16, 0)]: true,
      [utils.asGridCoord(16, 1)]: true,
      [utils.asGridCoord(16, 2)]: true,
      [utils.asGridCoord(15, 3)]: true,
      [utils.asGridCoord(16, 4)]: true,
      [utils.asGridCoord(15, 5)]: true,
      [utils.asGridCoord(15, 6)]: true,
      [utils.asGridCoord(15, 7)]: true,
      [utils.asGridCoord(15, 8)]: true,
      // Bottom Wall
      [utils.asGridCoord(1, 9)]: true,
      [utils.asGridCoord(2, 9)]: true,
      [utils.asGridCoord(3, 9)]: true,
      [utils.asGridCoord(4, 10)]: true,
      [utils.asGridCoord(5, 9)]: true,
      [utils.asGridCoord(6, 9)]: true,
      [utils.asGridCoord(7, 9)]: true,
      [utils.asGridCoord(8, 9)]: true,
      [utils.asGridCoord(9, 9)]: true,
      [utils.asGridCoord(10, 9)]: true,
      [utils.asGridCoord(11, 9)]: true,
      [utils.asGridCoord(12, 9)]: true,
      [utils.asGridCoord(13, 9)]: true,
      [utils.asGridCoord(14, 9)]: true,
      [utils.asGridCoord(15, 9)]: true,
      [utils.asGridCoord(16, 9)]: true,

      // Top Walls
      [utils.asGridCoord(1, 4)]: true,
      [utils.asGridCoord(2, 4)]: true,
      [utils.asGridCoord(3, 3)]: true,
      [utils.asGridCoord(4, 3)]: true,
      [utils.asGridCoord(5, 2)]: true,
      [utils.asGridCoord(6, 3)]: true,
      [utils.asGridCoord(7, 3)]: true,
      [utils.asGridCoord(8, 3)]: true,
      [utils.asGridCoord(9, 3)]: true,
      [utils.asGridCoord(10, 2)]: true,
      [utils.asGridCoord(11, 2)]: true,
      [utils.asGridCoord(12, 3)]: true,
      [utils.asGridCoord(13, 3)]: true,
      [utils.asGridCoord(14, 3)]: true,
    },
    cutsceneSpaces: {
      [utils.asGridCoord(4, 9)]: [
        {
          events: [
            { type: "changeMap",
              map: "Outside",
              x: utils.withGrid(8),
              y: utils.withGrid(32), 
              direction: "down"
            },
            
          ]
        }
      ],
    },
  },

  // OUTSIDE 

  Outside: {
    id: "Outside",
    lowerSrc: "./images/maps/OutSide_New.png",
    upperSrc: "./images/maps/OutSideUpper_New.png",
    configObjects: {
      hero: {
        type: "Person",
        isPlayerControlled: true,
        x: utils.withGrid(50),
        y: utils.withGrid(32),
      },
      npc1: {
        type: "Person",
        x: utils.withGrid(13),
        y: utils.withGrid(32),
        src: "./images/characters/people/seguranca.png",
        behaviorLoop: [
          { type: "stand", direction: "down", time: 600, },
          { type: "walk", direction: "right", },
          { type: "walk", direction: "right", },
          { type: "walk", direction: "right", },
          { type: "walk", direction: "right", },
          { type: "stand", direction: "down", time: 600, },
          { type: "stand", direction: "left", time: 1000, },
          { type: "stand", direction: "down", time: 600, },
          { type: "stand", direction: "right", time: 1000, },
          { type: "walk", direction: "left", },
          { type: "walk", direction: "left", },
          { type: "walk", direction: "left", },
          { type: "walk", direction: "left", },
          { type: "stand", direction: "down", time: 600, },
          { type: "stand", direction: "left", time: 1000, },
          { type: "stand", direction: "down", time: 600, },
          { type: "stand", direction: "right", time: 1000, },
        ],
        
        talking: [
          {
            events: [
              { type: "textMessage", text: "Peço desculpas, mas este local encontra-se restrito à visitação. A área está sob construção.", faceHero:"npc1" },
            ]
          }
        ]
      },
      // npc2: {
      //   type: "Person",
      //   x: utils.withGrid(8),
      //   y: utils.withGrid(35),
      //   src: "./images/characters/people/npc1.png",
      //   behaviorLoop: [
      //     { type: "stand", direction: "down", time: 3000, },
      //     { type: "walk", direction: "right"},
      //     { type: "walk", direction: "right"},
      //     { type: "walk", direction: "right"},
      //     { type: "walk", direction: "right"},
      //     { type: "walk", direction: "right"},
      //     { type: "walk", direction: "right"},
      //     { type: "walk", direction: "right"},
      //     { type: "walk", direction: "right"},
      //     { type: "walk", direction: "right"},
      //     { type: "walk", direction: "right"},
      //     { type: "walk", direction: "right"},
      //     { type: "stand", direction: "down", time: 3000, },
      //     { type: "walk", direction: "left"},
      //     { type: "walk", direction: "left"},
      //     { type: "walk", direction: "left"},
      //     { type: "walk", direction: "left"},
      //     { type: "walk", direction: "left"},
      //     { type: "walk", direction: "left"},
      //     { type: "walk", direction: "left"},
      //     { type: "walk", direction: "left"},
      //     { type: "walk", direction: "left"},
      //     { type: "walk", direction: "left"},
      //   ],
        
      //   talking: [
      //     {
      //       events: [
      //         { type: "textMessage", text: "Bom dia!", faceHero:"npc2" },
      //       ]
      //     }
      //   ]
      // },

    },
    walls: function () {
      let walls = {};
      [
        //Border Map Left
        "-1,26", "-1,27", "-1,28","-1,29", "-1,30", "-1,31", "-1,32", "-1,33", "-1,34", "-1,35", "-1,36",

        //Border Map Bottom
        "0,37", "1,37", "2,37", "3,37", "4,37", "5,37", "6,37", "7,37", "8,37", "9,37", "10,37", "11,37", "12,37", "13,37", "14,37", "15,37", "16,37", "17,37", "18,37", "19,37", "20,37", "21,37", "22,37", "23,37", "24,37", "25,37", "26,37", "27,37", "28,37", "29,37", "30,37", "31,37", "32,37", "33,37", "34,37", "35,37", "36,37", "37,37", "38,37", "39,37", "40,37", "41,37", "42,37", "43,37", "44,37", "45,37", "46,37", "47,37", "48,37", "49,37", "50,37", "51,37", "52,37", "53,37", "54,37", "55,37", "56,37", "57,37", "58,37", "59,37", "60,37", "61,37", "62,37", "63,37",

        //Border Map Right

        "59,27", "60,27", "61,27", "62,27", "63,27", "63,29", "63,30", "63,31", "63,32", "63,28", "63,33", "63,34", "63,35", "63,36",

        // Fance
        "0,26","1,26", "2,26", "3,26", "4,26", "5,26",   

        // House
        "6,26", "6,27", "6,28", "6,29", "6,30", "6,31", "7,31","7,30","8,30","9,30","9,31","10,31","11,31",

        // Building
        "12,31", "13,31", "14,31", "14,30", "14,29", "15,29", "16,29", "16,30", "16,31", "17,31", "18,31", "19,31", "20,31", "21,31", "22,31", "23,32", "24,32", "25,32", "26,32", "27,31", "28,31", "29,31", "30,31", "31,31", "32,31", "33,31", "33,30", "33,29", "33,28", 

        // Museum
        "46,25", "43,26", "44,26", "45,26", "47,26", "48,26", "49,26", "42,27", "50,27", "34,28", "35,28", "36,28", "37,28", "38,28", "39,28", "40,28", "41,28",  "42,28", "43,28", "44,28", "45,28", "47,28", "48,28", "49,28", "50,28", "51,28", "52,28", "53,28", "54,28", "55,28", "56,28", "57,28", "58,28", "43,29", "49,29", "43,30", "49,30", "43,31", "49,31", "43,32", "49,32", 

        // Other Thinks like trees, pole light etc 
        "35,30", "36,30", "35,31", "36,31", "39,30", "40,30", "39,31", "40,31", "52,30", "53,30", "52,31", "53,31", "57,30", "58,30", "57,31", "58,31", "2,28", "3,28", 

      ].forEach(coord => {
        let [x, y] = coord.split(",");
        walls[utils.asGridCoord(x, y)] = true;
      })
      return walls;
    }(),
    cutsceneSpaces: {
      [utils.asGridCoord(46,26)]: [
        {
          events: [
            { 
              type: "changeMap", 
              map: "Museum",
              x: utils.withGrid(3),
              y: utils.withGrid(18), 
              direction: "up"
             },
          ]
        }
      ],
      [utils.asGridCoord(8, 31)]: [
        {
          events: [
            { 
              type: "changeMap", 
              map: "Bedroom",
              x: utils.withGrid(4),
              y: utils.withGrid(8), 
              direction: "up"
            }
          ]
        }
      ],
      [utils.asGridCoord(15, 30)]: [
        {
          events: [
            { type: "textMessage", text: "Em contrução..." },
            { who: "hero", type: "walk",  direction: "down" },
          ]
        }
      ],
    },
  },

  // MUSEUM

  Museum: {
    id:"Museum",
    lowerSrc: "./images/maps/InsideMuseum_NEW.png",
    upperSrc: "./images/maps/InsideMuseum_Upper_NEW.png",
    configObjects: {
      hero: {
        type: "Person",
        isPlayerControlled: true,
        x: utils.withGrid(3),
        y: utils.withGrid(18),
      },
      npc1: {
        type: "Person",
        x: utils.withGrid(2),
        y: utils.withGrid(11),
        src: "./images/characters/people/npc3.png",
      },
      talkNpcTicket: {
        type: "Objeto",
        x: utils.withGrid(2),
        y: utils.withGrid(12),
        src: "/",
        talking: [
          {
            events: [
              { type: "textMessage", text: `Bem Vindo ao museu de artes blablabla!` },
              { type: "textMessage", text: `Hoje o acesso a todas as nossas exposições está liberado` },
              { type: "textMessage", text: `Tenha um ótimo passeio!` },
            ]
          }
        ]
      },
      medal: {
        type: "Objeto",
        x: utils.withGrid(14),
        y: utils.withGrid(6),
        src: "/",
        talking: [
          {
            events: [
              { type: "textMessage", text: "Esta é uma medalha de honra ao mérito pelos serviços prestados para uma das secretarias do MCTI"},
              { type: "textMessage", text: "ganhei em 2022 durante o evento da Semana Nacional de Ciência e Tecnologia do DF"},
              { type: "quadro", text: "medalha"},
            ]
          }
        ]
      },
      medall: {
        type: "Objeto",
        x: utils.withGrid(14),
        y: utils.withGrid(7),
        src: "/",
        talking: [
          {
            events: [
              { type: "textMessage", text: "Esta é uma medalha de honra ao mérito pelos serviços prestados para uma das secretarias do MCTI"},
              { type: "textMessage", text: "recebida em 2022 durante o evento da Semana Nacional de Ciência e Tecnologia do DF"},
              { type: "quadro", text: "medalha"},
            ]
          }
        ]
      },
      certificadoMetodosAgeis: {
        type: "Objeto",
        x: utils.withGrid(5),
        y: utils.withGrid(3),
        src: "/",
        talking: [
          {
            events: [
              { type: "textMessage", text: "Curso de Gerenciamento Ágil de Projetos feito em julho de 2019 pelo Ministério da Ciência, Tecnologia e Inovações"},
              { type: "quadro", text: "certAgil"},
            ]
          }
        ]
      },
      certificadoScrum: {
        type: "Objeto",
        x: utils.withGrid(7),
        y: utils.withGrid(3),
        src: "/",
        talking: [
          {
            events: [
              { type: "textMessage", text: "Certificação SCRUM tirada em agosto de 2020 pela CertiProf"},
              { type: "quadro", text: "certScrum"},
            ]
          }
        ]
      },
      fundamentosIntegridadePublica: {
        type: "Objeto",
        x: utils.withGrid(9),
        y: utils.withGrid(3),
        src: "/",
        talking: [
          {
            events: [
              { type: "textMessage", text: "Curso Fundamentos da Integridade Pública: Prevenindo a Corrupção feito em novembro de 2022 pela EV.G"},
              { type: "quadro", text: "fundamentosIntegridadePublica"},
            ]
          }
        ]
      },

      arteN1: {
        type: "Objeto",
        x: utils.withGrid(11),
        y: utils.withGrid(3),
        src: "/",
        talking: [
          {
            events: [
              { type: "textMessage", text: "Novas artes estão ainda sendo transportadas, por favor volte amanhã. "},
            ]
          }
        ]
      },

      arteN2: {
        type: "Objeto",
        x: utils.withGrid(13),
        y: utils.withGrid(3),
        src: "/",
        talking: [
          {
            events: [
              { type: "textMessage", text: "Novas artes estão ainda sendo transportadas, por favor volte amanhã. "},
            ]
          }
        ]
      },
      
      arteN3: {
        type: "Objeto",
        x: utils.withGrid(16),
        y: utils.withGrid(3),
        src: "/",
        talking: [
          {
            events: [
              { type: "textMessage", text: "Novas artes estão ainda sendo transportadas, por favor volte amanhã. "},
            ]
          }
        ]
      },
    },
    walls: function () {
      let walls = {};
      [
        //Border Map 1 Room Wall Top
        "4,3", "5,3", "6,3", "7,3", "8,3", "9,3", "10,3", "11,3", "12,3", "13,3", "14,3", "15,3", "16,3", "17,3", "18,3", 

        //Border Map 1 Room Wall Left
        "3,4", "3,5", "3,6", "3,7", "3,8", 

        //Border Map 1 Room Wall Right
        "18,3", "18,4", "18,5", "18,6", "18,7", "18,8", 

        //Border Map 1 Room Bottom
        "11,9", "12,9", "13,9", "14,9", "15,9", "16,9", "17,9", "18,9", 

        //Border Map 2 Room Wall Top
        "1,9", "2,9", "3,9", "4,9", "5,9", "6,9", "7,9", "12,15", "13,15", "14,15", "15,15", "16,15", 

        //Border Map 2 Room Left
        "0,9", "0,10", "0,11", "0,12", "0,13", "0,14", "0,15", "0,16", "0,17", "0,18", "0,19",

        //Border Map 2 Room Right
        "11,10", "11,11", "11,12", "11,13", "11,14", "11,15", 

        //Border Map 2 Room Bottom
        "1,19", "2,19", "4,19", "5,19", "6,19", "7,19", "8,19", "9,19", "10,19", "11,19", "12,19", "13,19", "14,19", "15,19", "16,19", "3,20", 

        //Border Map Right

        "7,10", "7,11", "7,12", "7,13",

        //Ticket

        "1,12", "2,12", "3,12", "4,12", "5,12", "6,12",

        // ticket turnstile
        "8,11", "8,12", "8,13", "10,11", "10,12", "10,13",    

        // Medal 
        "14,6", "14,7", "15,6", "15,7", 
       
      ].forEach(coord => {
        let [x, y] = coord.split(",");
        walls[utils.asGridCoord(x, y)] = true;
      })
      return walls;
    }(),
    cutsceneSpaces: {
      [utils.asGridCoord(3, 19)]: [
        {
          events: [
            { 
              type: "changeMap", 
              map: "Outside",
              x: utils.withGrid(46),
              y: utils.withGrid(27), 
              direction: "down" 
            },
          ]
        }
      ],
      [utils.asGridCoord(16, 16)]: [
        {
          events: [
            { type: "textMessage", text:"You can't be in there!"},
            { who: "hero", type: "walk",  direction: "left" },
          ]
        }
      ],
      [utils.asGridCoord(16, 17)]: [
        {
          events: [
            { type: "textMessage", text:"You can't be in there!"},
            { who: "hero", type: "walk",  direction: "left" },
          ]
        }
      ],
      [utils.asGridCoord(16, 18)]: [
        {
          events: [
            { type: "textMessage", text:"You can't be in there!"},
            { who: "hero", type: "walk",  direction: "left" },
          ]
        }
      ],
    },
  },

  Maptest: {
    id:"MapTeste",
    lowerSrc: "./images/maps/mapateste.png",
    upperSrc: "",
    configObjects: {
      hero: {
        type: "Person",
        isPlayerControlled: true,
        x: utils.withGrid(5),
        y: utils.withGrid(6),
      },
    }
  },
}