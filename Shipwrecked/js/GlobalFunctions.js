var GlobalFunctionsPlugin = function(scene) {
    // the scene that owns the plugin
    this.scene = scene;
    this.systems = scene.sys;

    if (!scene.sys.settings.isBooted) {
        scene.sys.events.once('boot', this.boot, this);
    }
};
// Register this plugin with the PluginManager
GlobalFunctionsPlugin.register = function(PluginManager) {
    PluginManager.register('GlobalFunctionsPlugin', GlobalFunctionsPlugin, 'globalFunctions');
};
GlobalFunctionsPlugin.prototype = {
    boot: function() {
        var eventEmitter = this.systems.events;
        eventEmitter.on('shutdown', this.shutdown, this);
        eventEmitter.on('destroy', this.destroy, this);
    },

    //  Called when a Scene shuts down, it may then come back again later
    // (which will invoke the 'start' event) but should be considered dormant.
    shutdown: function() {


        if (this.timedEvent) this.timedEvent.remove();
        if (this.text) this.text.destroy();
    },

    // called when a Scene is destroyed by the Scene Manager
    destroy: function() {
        this.shutdown();
        this.scene = undefined;
    },
    boarPlayerCombat: function(thePlayer, boar) {



        if (playerInventory.includes("Machete")) {
            playerLife -= 1;
            hearts[playerLife] = this.add.image((20 + (playerLife * 18)), 50, 'blankHeart');
            hearts[playerLife].setScrollFactor(0);
            this.dialogBox.setText("Take that boar!  Ha!");
        } else {
            let i = 0;
            if (playerLife <= 5) {
                // all blank now.
                for (i = 0; i < 10; i++) {

                    hearts[i] = this.add.image((20 + (i * 18)), 50, 'blankHeart');
                    hearts[i].setScrollFactor(0);
                }
            } else {
                // blank the last 5.
                let index = 0;
                for (i = 0; i < 5; i++) {
                    index = playerLife - i - 1;
                    hearts[index] = this.add.image((20 + (index * 18)), 50, 'blankHeart');
                    hearts[index].setScrollFactor(0);
                    this.dialogBox.setText("Ow! Ow! OW!  That HURT!");
                }
            } // end else

            // now drop life by 5
            playerLife -= 5;
        } // end else no machete 


        boar.disableBody(true, true);
        Gold++;
        Food++;
        this.goldText.setText("Gold: " + Gold);
        this.foodText.setText("Food: " + Food);

        if (playerLife <= 0) {

            // stop movement on screen
            this.physics.pause();

            // turn player bloody red
            thePlayer.setTint(0xff0000);
            //this.playerLifeImg.setTexture("noHealth");

            // force facing
            thePlayer.anims.play("turn");

            this.gameOver = true;
            this.dialogBox.setText("Alas! You have died!");

        } // end if playerLife

    }, // end boarPlayerCombat
    goldTextFunction: function() {
        this.goldText = this.scene.add.text(20, 10, "Gold: " + Gold, { fontsize: "32px", strokeThickness: 1, stroke: "#fe0", fill: "#fe0", shadowStroke: true, shadowFill: true, shadowColor: "#000", shadowOffsetX: 1, shadowOffsetY: 1, align: "center" });
        this.goldText.setScrollFactor(0);
    },
    woodTextFunction: function() {
        this.woodText = this.scene.add.text(100, 10, "Wood: " + Wood, { fontsize: "32px", strokeThickness: 1, stroke: "#fe0", fill: "#fe0", align: "center" });
        this.woodText.setScrollFactor(0);
    },
    ropeTextFunction: function() {
        this.ropeText = this.scene.add.text(180, 10, "Rope: " + Rope, { fontsize: "32px", strokeThickness: 1, stroke: "#fe0", fill: "#fe0", align: "center" });
        this.ropeText.setScrollFactor(0);
    },
    woolTextFunction: function() {
        this.woolText = this.scene.add.text(260, 10, "Wool: " + Wool, { fontsize: "32px", strokeThickness: 1, stroke: "#fe0", fill: "#fe0", align: "center" });
        this.woolText.setScrollFactor(0);
    },
    foodTextFunction: function() {
        this.foodText = this.scene.add.text(340, 10, "Food: " + Food, { fontsize: "32px", strokeThickness: 1, stroke: "#fe0", fill: "#fe0", align: "center" });
        this.foodText.setScrollFactor(0);

    },
    makeHearts: function() {

        /* **************************************************************
         * ********* Life heart bar test ******************************
         * *************************************************************** */
        for (i = 0; i < 10; i++) {

            hearts[i] = this.add.image((20 + (i * 18)), 50, 'singleHeart');
            hearts[i].setScrollFactor(0);
        }
    }
}