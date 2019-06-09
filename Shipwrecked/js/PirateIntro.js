// JavaScript source code
class PirateIntro extends Phaser.Scene {
    constructor() {
        super({ key: "PirateIntro" });

        this.gameOver = false;
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
        this.load.image("TortugaApproach", "assets/WelcomeToTortuga1200.jpg");

        // status icons will be on top of anything else.
        //this.load.image("singleHeart", "assets/singleHeart16.png");
        //this.load.image("blankHeart", "assets/blankHeart16.png");


        // Audio:  Needed all incase of game end while in this scene.
        //Really should have.ogg too.
        // Notes: instances allows for the given number of multiple simultainous plays of the same item.
        // so instances :4 allows 4 copies of that sound to play simultainiously or overlapping if desired.
        //this.load.audio('OceanSound', ['assets/audio/Waves.mp3']);
        //this.load.audio('JungleSound', ['assets/audio/rainforest.mp3']);
        //this.load.audio('VolcanoSound', ['assets/audio/Atomic_Bomb.mp3'], { instances: 2 });
        //this.load.audio('EarthQuakeSound', ['assets/audio/EarthQuake.mp3']);

    }// end preload



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
        console.log("from PirateIntro")
        console.log(this.sys.PirateFunctions);

        // #########################################
        //####### FOR TESTING #######################
        //################################################

        playerShip = fourMaster;
        playerShip.gold = 600;
        playerShip.iron = 10;
        playerShip.wool = 10;
        playerShip.wood = 0;
        playerShip.food = 0;

        Gold = 620;
        // #################### End for testing ####################


        this.events.on('wake', this.onWake, this);

        // Camera: set bounds to whole world size.
        this.cameras.main.setBounds(0, 0, 1000, 1000);

        // set actual camera width and height for what we see.
        //this.cameras.main.setSize(1000, 1000);
        this.cameras.main.setSize(500, 400);

        // island audios
        //this.OceanAudio = this.sound.add('OceanSound');
        //this.JungleAudio = this.sound.add('JungleSound');
        //this.VolcanoAudio = this.sound.add('VolcanoSound');
        //this.VolcanoAudio2 = this.sound.add('VolcanoSound');
        //this.EarthQuakeAudio = this.sound.add('EarthQuakeSound');


        // set island ambiance and pause so it doesn't override all the other maps
        //this.OceanAudio.volume = 0.2;
        //this.OceanAudio.play({ loop: true });
        //this.OceanAudio.pause();

        //this.JungleAudio.volume = 0.5;
        //this.JungleAudio.play({ loop: true });
        //this.JungleAudio.pause();



        /* *********************************************************************
         * *********** Main Map Setup ******************************************* 
         * *********************************************************************/


        //NOTE: add in order from bottom layer to top.

        // to only add an image someplace, you would say:
        this.add.image(400, 300, "TortugaApproach");
        //this.add.image(250, 200, "Hull");




        //  Input Events
        // note: gameobjectdown handler should be in global plug in now.
        this.input.on('gameobjectdown', this.sys.PirateFunctions.onGameObjectClicked, this);


        /* *****************************************************************************************
         * *********************  Header and Hearts ************************************************
         * ***************************************************************************************** */

       // this.sys.globalFunctions.pirateGoldTextFunction();


        /* **************************************************************
         * ********* Life heart bar  ******************************
         * *************************************************************** */
        console.log("in PirateIntro create, ship hitpoints are: " + playerShip.hitPoints);
        // this.sys.globalFunctions.updateHearts();


        /* ************************************************************
         * ***************** Dialog Box Section ***********************
         * ************************************************************ */

        // Dialog box:
        //this.dialogBox = this.sys.dialogModal;
        //this.dialogBox.init({ windowHeight: 200, windowWidth: 560, locationX: 20, locationY: 390 });
        //this.dialogBox.addTextLine(20, 20, "Welcome to Tortuga!  You have a " + playerShip.shipType + " and you were able to bring the following to port: " +
        //    "Gold: " + playerShip.gold + " Iron: " + playerShip.iron + " Wool: " + playerShip.wool + " Wood: " + playerShip.wood + " Food: " + playerShip.food  + " ." +
        //    "  Everything but the gold was sold to provide funds for this next adventure!  Your Gold total has been updated.", false);


        // ******* Intro to Tortuga Texts  **************
        this.style = { font: "20px Courier", fill: "#000", tabs: [60, 60, 60] };

        //heading
        this.text1 = this.add.text(20, 20, 'Welcome to Tortuga! ', this.style);
        this.text1 = this.add.text(350, 20, 'Current Gold: ' + Gold, this.style);
        this.text2 = this.add.text(20, 50, 'You have a ' + playerShip.shipType, this.style);
        this.text2 = this.add.text(20, 70, 'You were able to bring the following to port:', this.style);
        this.text3 = this.add.text(20, 90, 'Gold: ' + playerShip.gold, this.style);

        this.text4 = this.add.text(20, 110, 'Iron: ' + playerShip.iron, this.style);
        this.text5 = this.add.text(20, 130, 'Wool: ' + playerShip.wool, this.style);
        this.text6 = this.add.text(20, 150, 'Wood: ' + playerShip.wood, this.style);
        this.text7 = this.add.text(20, 170, 'Food: ' + playerShip.food, this.style);
        this.text8 = this.add.text(20, 190, "---------------------------------------------",
            this.style);

        this.text9 = this.add.text(20, 210, 'Everything but your ship and the gold was sold', this.style);
        this.text9 = this.add.text(20, 230, 'to provide funds for your next adventure!', this.style);
        this.text10 = this.add.text(20, 250, 'Your Gold total has been updated.', this.style);

        this.text14 = this.add.text(20, 270, "---------------------------------------------",
            this.style);


        // Continue to Tortuga!
        this.continue = this.add.text(250, 300, 'Press to Continue', {
            font: "30px Courier",
            fill: "#a00",
            border: "5px solid red"
        });
        this.continue.name = "pirateIntroContinueBtn";
        this.continue.setInteractive();



        // ########################################################################
        //###### NOTE For stand alone, this section is required. ###############
        // #### But with Shipwreck it is not. ###################################



        /* ************************************************************
         * ***************** Launch Section ***************************
         * ************************************************************ */

        //// launch the other Pirate Sailing scenes so they are available to show when needed without delay.
        //this.scene.launch("Tortuga");
        //this.scene.launch("PirateSailing");

        //// assuming DeathScene still available from Shipwrecked.
        ////this.scene.launch("DeathScene");

        ///********************************************************
        // * ******  Current Status... *****************************
        // * *****  Can put the scenes to sleep here, but they get set to awake
        // * by the system somehow.  Thus their updates keep happening.  
        // * The isSleeping call I put into the update functions is NOT triggering.
        // * put in a global to short circuit the update and it seems to work.
        // * **************************************************************** */
        //// note, data shows sleeping is not stopping update... neither is pause....
        //// and not visible.

        //// So basically, these function calls do NADA!  The sleep flags are what matters 
        //// to us and the set active and bring to top.

        //// put them to sleep.
        //this.scene.sleep("DeathScene");
        //this.scene.sleep("Tortuga");
        //this.scene.sleep("PirateSailing");


        //sleepDeath = true;
        //sleepTortuga = true;
        //sleepPirate = true;

        //this.scene.setVisible(false, "DeathScene");
        //this.scene.setVisible(false, "Tortuga");
        //this.scene.setVisible(false, "PirateSailing");


        //// bring this intro scene up for input and display.
        //this.scene.bringToTop("PirateIntro");
        //this.scene.setActive(true, "PirateIntro");
        //this.scene.setVisible(true, "PirateIntro");


    } // end create



    // ---------------------------------------------------------
    // update()
    //
    // Description: main update function for scene.  Handles 
    // player movement and end of map event at this level.  
    // Std functionality handles most everything else.
    // -----------------------------------------------------------
    update() {
        if (this.gameOver) {
            console.log("game is over??");
            return;
        }


        if (sleepPirateIntro) {
            return;
        }


    }// end update


    // ---------------------------------------------------------
    // setSleepFlag(bool)
    //
    // Description: sets our scene sleep flag to true (sleeping) or 
    // false (awake.)
    // -----------------------------------------------------------
    setSleepFlag(bSleep) {
        sleepPirateIntro = bSleep;

        if (bSleep === true) {
            // shut down this maps ambience audio
            console.log("shutting down audio in Pirate Intro.");
            //this.OceanAudio.pause();
            //this.JungleAudio.pause();
            //if (this.EarthQuakeAudio.isPlaying) {
            //    this.EarthQuakeAudio.pause();
            //}

        }

    }


    // ---------------------------------------------------------
    // onWake()
    //
    // Description: Handler for when scene wakes.  Sets the current
    // player position based on where they left the previous map
    // to provide consistency.  Std handler does everything else.
    // -----------------------------------------------------------
    onWake() {
        console.log("in Pirate Intro onWake");

        // update life and resource displays.
        //this.sys.PirateFunctions.updateHearts();
        //this.sys.PirateFunctions.updateGoldDisplay();

        console.log('attempting to resume audio in Pirate Intro.');
        // set island ambiance
        //this.OceanAudio.resume();
        //this.JungleAudio.resume();

    }


} // end class Tortuga