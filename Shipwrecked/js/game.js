// our game's configuration
// note the width and height are just the viewport sizes. 
// they don't have to be the "world" sizes.  See setBounds..
let config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 1000,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },

    scene: [Shipwrecked, Shipwrecked2, Shipwrecked3, Shipwrecked4, ShipConstruction, PirateSailing]
};

console.log("in game.js");
let playerStartX = 250;
let playerStartY = 350;
// scene sleep checks
let sleep1 = false;
let sleep2 = false;
let sleep3 = false;
let sleep4 = false;
let sleepShip = false;

// player life related
let playerLife = 10;
let hearts = [];

// player inventory, gathered items and tools
let playerInventory = [];

// items
let Gold = 0;
let Wood = 0;
let Iron = 0;
let Wool = 0;
let Food = 1;

//boats
let BoatConstructor = function(pCrew, pCargo, pSpeed, pWood, pWool, pIron, pFood) {
    this.crew = pCrew;
    this.cargo = pCargo;
    this.speed = pSpeed;
    this.iron = pIron;
    this.wool = pWool;
    this.wood = pWood;
    this.food = pFood;


}


let canoe = new BoatConstructor(1, 5, 25, 0, 0, 0, 1);
let schooner = new BoatConstructor(15, 10, 40, 20, 15, 0, 15);
let twoMaster = new BoatConstructor(30, 25, 50, 40, 25, 15, 30);
let fourMaster = new BoatConstructor(50, 60, 75, 80, 45, 35, 50);

// tools  Not sure we need these since we have the inventory.
let Machete = "Machete";
let Axe = "Axe";

// create the game, and pass it the configuration
let game = new Phaser.Game(config);