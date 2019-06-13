/* eslint-disable indent */

class PirateSailing extends Phaser.Scene {
        constructor() {
                super({ key: "PirateSailing" });

                this.gameOver = false;
                this.hunterStartTime = Date.now();
                this.hunterSpawnTime = 60000; // one hunter every min.
            } // end constructor



        // ---------------------------------------------------------
        //  preload()
        //
        // Description: main preload function for scene.  Not strictly
        // required by the framework.  Handles initial loading of images
        // (assets).  Also sets the framewidth and height for sprites
        // when they are loaded. Provides variable names for each image
        // or sprite loaded in.
        // -----------------------------------------------------------
        preload() {

                // plugins:
                this.load.plugin('DialogModalPlugin', './js/dialog_plugin.js');
                this.load.plugin('PirateFunctionsPlugin', './js/PirateFunctionsPlugin.js');

                // main images
                this.load.image("island2", "assets/island1.png");
                this.load.image("island3", "assets/island2.png");
                this.load.image("island1", "assets/island3.png");
                this.load.image("island4", "assets/island4.png");
                this.load.image("island5", "assets/island5.png");
                this.load.image("portIMG", "assets/tempPort.png");

                this.load.image("bigWater", "assets/ocean.jpg");

                this.load.spritesheet("ship", "assets/pirateShip.png", { frameWidth: 80, frameHeight: 95 });

                this.load.image("singleShip", "assets/singleShip.png");

                this.load.image("waypoint", "assets/waypoint.png");


                // // status icons will be on top of anything else.
                // this.load.image("singleHeart", "assets/singleHeart16.png");
                // this.load.image("blankHeart", "assets/blankHeart16.png");


            } // end preload





        // ---------------------------------------------------------
        // create()
        //
        // Description: main create function for scene.  Handles 
        // initial creation of all scene objects and player sprite.
        // Sets interaction types etc.
        // -----------------------------------------------------------
        create() {

                // plugins:
                this.sys.install('DialogModalPlugin');
                console.log(this.sys.dialogModal);

                this.sys.install('PirateFunctionsPlugin');
                console.log("from PirateSailing")
                console.log(this.sys.PirateFunctions);


                this.events.on('wake', this.onWake, this);

                // Camera: set bounds to whole world size.
                this.cameras.main.setBounds(0, 0, 1000, 1000);

                // set actual camera width and height for what we see.
                //this.cameras.main.setSize(1000, 1000);
                this.cameras.main.setSize(500, 400);


                /* *********************************************************************
                 * *********** Main Map Setup ******************************************* 
                 * *********************************************************************/

                // this.location = [{ x: 210, y: 130 }, { x: 825, y: 175 }, { x: 480, y: 420 }, { x: 155, y: 835 }, { x: 840, y: 890 }];




                // to only add an image someplace, you would say:
                this.add.image(500, 500, "bigWater");
                this.add.image(500, 500, "singleShip");


                // islands group
                this.islands = this.physics.add.staticGroup();
                this.port = this.physics.add.group();
                let newChild = "";

                newChild = this.islands.create(50, 50, "island1");
                newChild.name = "island";

                newChild = this.port.create(210, 130, "portIMG")
                newChild.name = "port";



                newChild = this.islands.create(920, 60, "island2");
                newChild.name = "island";

                newChild = this.port.create(825, 175, "portIMG")
                newChild.name = "port";

                newChild = this.islands.create(500, 500, "island3");
                newChild.name = "island";

                newChild = this.port.create(480, 420, "portIMG")
                newChild.name = "port";


                newChild = this.islands.create(50, 925, "island4");
                newChild.name = "island";

                newChild = this.port.create(155, 835, "portIMG")
                newChild.name = "port";

                newChild = this.islands.create(940, 950, "island5");
                newChild.name = "island";

                newChild = this.port.create(840, 890, "portIMG")
                newChild.name = "port";


                this.add.image(500, 500, "singleShip");

                this.waypoint = this.physics.add.group();
                this.waypoint.create(300, 300, "waypoint");
                this.waypoint.create(700, 300, "waypoint");
                //  Input Events
                this.cursors = this.input.keyboard.createCursorKeys();

                // note: bring in PirateFunctions..
                this.input.on('gameobjectdown', this.sys.PirateFunctions.onGameObjectClicked, this);


                /* *********************************************************************
                 * *********** Player (Pirate Ship) Setup ***************************** 
                 * *********************************************************************/

                // make player (pirate ship)
                this.player = this.physics.add.sprite(300, 100, "ship");
                this.player.setScale(0.4);

                this.cameras.main.startFollow(this.player);


                this.anims.create({
                    key: "shipDown",
                    frames: [{ key: "ship", frame: 1 }],
                    frameRate: 16

                });

                this.anims.create({
                    key: "shipUp",
                    frames: [{ key: "ship", frame: 13 }],
                    frameRate: 16,

                });

                this.anims.create({
                    key: "shipleft",
                    frames: [{ key: "ship", frame: 5 }],
                    frameRate: 16,

                });

                // this.anims.create({
                //     key: "shipturn",
                //     frames: [{ key: "ship", frame: 9 }],
                //     frameRate: 16
                // });

                this.anims.create({
                    key: "shipright",
                    frames: [{ key: "ship", frame: 9 }],
                    frameRate: 16,

                });




                /* *****************************************************************************************
                 * *********************  Cargo and Hunter ships ******************************************
                 * ***************************************************************************************** */


                // cargo ships group
                this.cargoShips = this.physics.add.group();
                //{
                //    key: "cargoShip",
                //    repeat: 6,
                //    setXY: { x: 150, y: 50, stepX: 150, stepY: 150 }
                //});

                //let newChild = "";

                //       newChild = this.cargoShips.create(i, j, "cargoShipImg");
                //        newChild.name = "cargoShip";



                // Pirate Hunters group
                //this.pirateHunters = this.physics.add.group();





                /* *****************************************************************************************
                 * *********************  Header and Hearts ************************************************
                 * ***************************************************************************************** */

                this.sys.PirateFunctions.sailingTextFunction();



                /* ************************************************************
                 * ************** Colliders Section ***************************
                 * ************************************************************ */

                // collide with world:
                this.player.setCollideWorldBounds(true);

                //this.cargoShips.children.iterate(function (child) {
                //    child.setCollideWorldBounds(true);
                //});

                //this.pirateHunters.children.iterate(function (child) {
                //    child.setCollideWorldBounds(true);
                //});


                //  Collide the everything for the most part.  
                //this.physics.add.collider(this.player, this.cargoShips);
                //this.physics.add.collider(this.player, this.pirateHunters);
                this.physics.add.collider(this.player, this.islands);
                //this.physics.add.collider(this.pirateHunter, this.islands);
                //this.physics.add.collider(this.cargoShip, this.islands);


                //  Checks to see if the player overlaps with any of the Pirate Hunters, if he does call the pirate hunter combat function
                //this.physics.add.overlap(this.player, this.pirateHunters, this.sys.PirateFunctions.PirateHunterCombat, null, this);

                //  Checks to see if the player overlaps with any of the Pirate Hunters, if he does call the pirate hunter combat function
                // this.physics.add.overlap(this.player, this.cargoShips, this.sys.PirateFunctions.cargoShipCombat, null, this);


                setInterval(this.createCargoShip, 2000, this);
            } // end create



        // ---------------------------------------------------------
        // update()
        //
        // Description: main update function for scene.  Handles 
        // player movement and end of map event at this level.  
        // Std functionality handles most everything else.
        // -----------------------------------------------------------
        update() {
                //console.log("in update shipConstruction");
                if (this.gameOver) {
                    console.log("game is over??");
                    return;
                }


                if (sleepPirate) {
                    return;
                }


                //############testing#####################
                playerShip.speed = 300;
                //##################################
                if (this.cursors.left.isDown) {
                    this.player.setVelocityX(-playerShip.speed);
                    this.player.anims.play("shipleft", true);
                } else if (this.cursors.right.isDown) {
                    this.player.setVelocityX(playerShip.speed);
                    this.player.anims.play("shipright", true);
                } else if (this.cursors.up.isDown) {
                    this.player.setVelocityY(-playerShip.speed);
                    this.player.anims.play("shipUp", true);
                } else if (this.cursors.down.isDown) {
                    this.player.setVelocityY(playerShip.speed);
                    this.player.anims.play("shipDown", true);
                } else {
                    this.player.setVelocityX(0);
                    this.player.setVelocityY(0);
                    //this.player.anims.play("shipturn");
                }

                //var alreadyCreated = false;
                // var currentdate = new Date();
                // if (currentdate.getMilliseconds() % 500 === 0 && currentdate.setSeconds() % 5 === 0) {
                //     this.createCargoShip();
                //     console.log(currentdate.getMilliseconds());

                //     //alreadyCreated = true;

                // }
                // if (currentdate.getSeconds() % 2) {
                //     alreadyCreated = false
                // }

                this.checkForHunterSpawn();
                this.checkForCargoShipSpawn();

                this.checkForHunterAttack();

                // colider for cargoship and port
                this.physics.add.overlap(this.port, this.cargoShips, this.destroyCargoShip, null, this);
                this.physics.add.overlap(this.waypoint, this.cargoShips, this.wayPoint, null, this);

            } // end update

        destroyCargoShip(port, ship) {
            ship.destroy();
        }
        createCargoShip(theScene) {
            //this.scene.load.image("singleShips", "assets/singleShip.png");
            console.log("making a ship");
            this.newFrom = getRandomNumber();
            do {
                this.newTo = getRandomNumber();
            } while (this.newFrom == this.newTo);
            this.cargoShip = new CargoShipConstructor(this.newFrom, this.newTo);
            let myShip = "";


            let location = [{ x: 210, y: 130 }, { x: 825, y: 175 }, { x: 480, y: 420 }, { x: 155, y: 835 }, { x: 840, y: 890 }];
            // this.ship = this.scene.physics.add.group();
            // newChild = this.ship.create(50, 50, "island1");
            // newChild.name = "ship";
            let changeY = 0;
            let changeX = 0
            if (this.cargoShip.from === 2) {
                changeX = -80
                changeY = -30;

            } else if (this.cargoShip.from < 3) {
                changeY = 70;

            } else {
                changeY = -70;
            }
            myShip = theScene.cargoShips.create(location[this.cargoShip.from - 1].x + changeX, location[this.cargoShip.from - 1].y + changeY, "singleShip");
            myShip.to = this.cargoShip.to;
            myShip.from = this.cargoShip.from;

            myShip.name = "cargoShipName";
            myShip.hitWaypoint = false;
            //myShip.setVelocityX(10);
            //console.log(this.cargoShip.to)
            console.log(`From: ${myShip.from}    To:${myShip.to}`)
            if ((myShip.to === 2 && myShip.from === 4) || (myShip.to === 4 && myShip.from === 2) || (myShip.to === 3 && myShip.from === 4) || (myShip.to === 4 && myShip.from === 3)) {

                theScene.physics.accelerateTo(myShip, 300, 300, 10);
                //console.log("going to left way point");
            } else if ((myShip.to === 5 && myShip.from === 1) || (myShip.to === 1 && myShip.from === 5) || (myShip.to === 3 && myShip.from === 5) || (myShip.to === 5 && myShip.from === 3)) {
                //console.log("going to right way point");
                theScene.physics.accelerateTo(myShip, 700, 300, 10);
                // } else if (myShip.to === 3) {
                //     if (myShip.from === 5) {
                //         // console.log("going to right way point");
                //         theScene.physics.accelerateTo(myShip, 700, 300, 10);
                //     } else if (myShip.from === 4) {
                //         theScene.physics.accelerateTo(myShip, 300, 300, 10);
                //         //console.log("going to left way point");
                //     }

            } else {
                theScene.physics.accelerateTo(myShip, location[this.cargoShip.to - 1].x, location[this.cargoShip.to - 1].y, 10);
            }

        }
        wayPoint(waypoint, ship) {
            let location = [{ x: 210, y: 130 }, { x: 825, y: 175 }, { x: 480, y: 420 }, { x: 155, y: 835 }, { x: 840, y: 890 }];

            if (!(ship.from === 1 && ship.to === 3) && !(ship.from === 3 && ship.to === 1) && !(ship.from === 2 && ship.to === 3) && !(ship.from === 3 && ship.to === 2)) {
                if (ship.hitWaypoint === false) {
                    ship.setVelocityX(0);
                    ship.setVelocityY(0);
                    this.physics.accelerateTo(ship, location[ship.to - 1].x, location[ship.to - 1].y, 10);

                    //ship.destroy()
                    //.log("hit waypoint, headed to" + ship.to);
                    ship.hitWaypoint = true;
                }
            }


        }

        // ---------------------------------------------------------
        // checkForHunterSpawn()
        //
        // Description: checks to see if enough time as elapse to 
        // cause another Pirate Hunter to spawn.  If so, it spawns
        // the hunter in a random location.
        // -----------------------------------------------------------
        checkForHunterSpawn() {
                // let currentTime = Date.now();

                // if ((currentTime - this.hunterStartTime) >= this.hunterSpawnTime) {
                //     // spawn hunter!
                //     let locX = Math.random() * 1000;
                //     let locY = Math.random() * 1000;

                //     let newChild = "";

                //     // newChild = this.pirateHunters.create(500, 500, "pirateHunterImg");
                //     // newChild.name = "pirateHunter";

                //     // reset timer.
                //     this.hunterStartTime = Date.now();
                // }// end if time to spawn hunter.

            } // end check for hunter spawn.



        // ---------------------------------------------------------
        // checkForHunterAttack()
        //
        // Description: checks to see if a player is too close to a Hunter.  
        // If so, HunterAttack timer starts and Hunter Attack flag set.
        // If the Attack Flag is set, and timer is over 2 seconds (2000), 
        // then calls HunterAttack().  
        // If the player is not in range of a Hunter, then Attack Flag is set
        // to false and timer cleared. 
        // -----------------------------------------------------------
        checkForHunterAttack() {
                // let currentTime = Date.now();

                // if ((currentTime - this.hunterStartTime) >= this.hunterSpawnTime) {
                //     // spawn hunter!
                //     let locX = Math.random() * 1000;
                //     let locY = Math.random() * 1000;

                //     let newChild = "";

                //     newChild = this.pirateHunters.create(500, 500, "pirateHunterImg");
                //     newChild.name = "pirateHunter";

                //     // reset timer.
                //     this.hunterStartTime = Date.now();
                // }// end if time to spawn hunter.

            } // end check for hunter spawn.



        // ---------------------------------------------------------
        // checkForCargoShipSpawn()
        //
        // Description: checks each island to see if enough time has 
        // elapse to cause another cargo ship to spawn.  If so, it spawns
        // a cargo ship just outside that island's port with another Island
        // destination.
        // -----------------------------------------------------------
        checkForCargoShipSpawn() {

                // if (
                //     (Math.abs((this.player.x - hunter.x)) <= 150) &&
                //     (Math.abs((this.player.y - hunter.y)) <= 150)
                // ) {

                //let currentTime = Date.now();

                //if ((currentTime - hunterStartTime) >= this.hunterSpawnTime) {
                //    // spawn hunter!
                //    let locX = Math.random() * 1000;
                //    let locY = Math.random() * 1000;

                //    let newChild = "";

                //    newChild = this.pirateHunters.create(500, 500, "pirateHunterImg");
                //    newChild.name = "pirateHunter";

                //    // restt timer.
                //    hunterStartTime = Date.now();
                //}// end if time to spawn hunter.

            } // end checkForCargoShipSpawn

        // CargoShipConstructor(from, to) {
        //         this.from = from;
        //         this.to = to;

        //     }
        // getRandomNumber() {
        //     return (Math.floor(Math.random() * 5)) + 1;
        // }






        // ---------------------------------------------------------
        // setSleepFlag(bool)
        //
        // Description: sets our scene sleep flag to true (sleeping) or 
        // false (awake.)
        // -----------------------------------------------------------
        setSleepFlag(bSleep) {
            sleepPirate = bSleep;
        }


        // ---------------------------------------------------------
        // onWake()
        //
        // Description: Handler for when scene wakes.  Sets the current
        // player position based on where they left the previous map
        // to provide consistency.  Std handler does everything else.
        // -----------------------------------------------------------
        onWake() {
            console.log("in PirateSailing onWake");

            // update life and resource displays.
            //this.sys.PirateFunctions.updateHearts();
            //this.sys.PirateFunctions.updateSailingDisplay();

        }


    } // end class PirateSailing
function
getRandomNumber() {
    return (Math.floor(Math.random() * 5)) + 1;
}

function CargoShipConstructor(from, to) {
    this.from = from;
    this.to = to;

}