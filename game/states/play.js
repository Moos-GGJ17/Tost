// Principal game state, waits for space input before starting to play
States.Play = {

	// Sets the game's basic configurations.
	init: function(){
		// Stop possible sprite bluring
		this.game.renderer.renderSession.roundPixels = true;
		this.game.world.setBounds(0, 0, GAME_BOUNDS.x, GAME_BOUNDS.y);

		// Circle and rectangle collisions only, Arcade physics are enough
		this.physics.startSystem(Phaser.Physics.ARCADE);

		// Game objects are updated only if this variable is true
		this.startedPlaying = false;
	},
	

	// Creates all the game objects
	create: function(){
		this.game.stage.backgroundColor = '0x000000';
		
		// Background with reduced saturation that shows when the player is losing
		this.backgroundGrayBMD = this.game.make.bitmapData();
		this.backgroundGrayBMD.load(Songs[this.game.songToLoadIndex].filename + 'Background');
		this.backgroundGrayBMD.addToWorld(0, 0);
		this.backgroundGrayBMD.shiftHSL(null, -1.0, null);

		// Colored background that loses alpha when the player is losing
		this.background = this.game.add.sprite(0, 0, Songs[this.game.songToLoadIndex].filename + 'Background');

		// Instruction UI elements
		this.game.pressSpaceAnimation = this.game.add.sprite(this.game.world.width / 2, this.game.world.height * 3 / 4, 'PressSpace');
		this.game.pressSpaceAnimation.anchor.setTo(0.5, 0.5);
		this.game.pressSpaceAnimation.scale.setTo(0.5, 0.5);
		this.game.pressSpaceAnimation.animations.add('Press');
		this.game.pressSpaceAnimation.animations.play('Press', 3, true);

		this.instrTop = this.game.add.sprite(this.game.world.width / 2, this.game.world.height / 3, 'GameplayInstr1');
		this.instrTop.anchor.setTo(0.5, 0);

		this.instrBottom = this.game.add.sprite(this.game.world.width / 2, this.game.world.height *7 / 8, 'GameplayInstr2');
		this.instrBottom.anchor.setTo(0.5, 0);
		this.instrBottom.scale.setTo(0.5, 0.5);

		// Listen to input after two seconds
		this.game.time.events.add(2 * Phaser.Timer.SECOND, this.startListeningToInput, this);
	},

	// When input is pressed, remove instruction UI elements and creates the objects used in-game
	startListeningToInput: function() {
		this.playButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.playButton.onDown.add(this.play, this);
		this.game.input.onDown.add(this.play, this);
	},

	play: function() {		
		this.game.vitalWave = new VitalWave(this.game, 0, 100); // Displays the player's life
		this.game.scoreUI = new ScoreUI(this.game); // Displays the score
		this.game.player = new Player(this.game, this.game.world.centerX / 2, this.game.world.height * 3 / 4);
		this.game.chart = new Chart(this.game);

		// Load the chart of the song selected in the song selection screen
		this.game.chart.load(Songs[this.game.songToLoadIndex]);

		// Hide/destroy instructions UI elements
		this.game.pressSpaceAnimation.alpha = 0;
		this.instrTop.destroy();
		this.instrBottom.destroy();

		// Remove unused input events
		this.playButton.onDown.remove(this.play, this);
		this.game.input.onDown.remove(this.play, this);

		this.startedPlaying = true;
	},

	// Updates all the game's objects.
	update: function(){
		if (this.startedPlaying) {
			this.game.chart.update();
			this.game.player.update();
			this.game.scoreUI.update();

			// Decrease colored background alpha based on player's life
			if (this.game.player.life < PlayerData.MAX_LIFE - 1) {
				this.background.alpha = this.game.player.life / (PlayerData.MAX_LIFE - 1);
			}
		}
	},

	// Used for debug purposes only
	render: function() {
		//this.game.player.debug();
		//this.game.chart.debug();
	},

	shutdown: function() {
		this.background.destroy();
		this.backgroundGrayBMD.destroy();
		this.game.pressSpaceAnimation.destroy();
		this.instrBottom.destroy();
		this.instrTop.destroy();
		this.game.vitalWave.deepDestroy();
		this.game.scoreUI.destroy(true);
		this.game.player.destroy();
		this.game.chart.deepDestroy();
	}
};