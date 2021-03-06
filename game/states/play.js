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
		let backgroundGrayBMD = this.game.make.bitmapData();
		//this.backgroundGrayBMD.load(Songs[this.game.songToLoadIndex].filename + 'Background');
		backgroundGrayBMD.load('YellowBackground1');
		backgroundGrayBMD.shiftHSL(null, -1.0, null);
		//this.backgroundGrayBMD.addToWorld(0, 0);
		this.backgroundGray = this.game.add.sprite(0, 0, backgroundGrayBMD);

		// Colored background that loses alpha when the player is losing
		//this.background = this.game.add.sprite(0, 0, Songs[this.game.songToLoadIndex].filename + 'Background');
		this.background = this.game.add.sprite(0, 0, 'YellowBackground1');
		const backgroundScaleMeasure = this.game.world.height / this.background.height;
		this.background.scale.setTo(backgroundScaleMeasure, backgroundScaleMeasure);
		this.backgroundGray.scale.setTo(backgroundScaleMeasure, backgroundScaleMeasure);

		// Purple gradient
		this.purpleGradient = this.game.add.sprite(0, 0, 'PurpleGradientLeft');
		const purpleGradientScaleMeasure = this.game.world.height / this.purpleGradient.height;
		this.purpleGradient.scale.setTo(1, purpleGradientScaleMeasure);

		// Instruction UI elements
		this.game.touchScreenAnimation = this.game.add.sprite(this.game.world.width / 2, this.game.world.height * 3 / 4, 'TouchScreen');
		this.game.touchScreenAnimation.anchor.setTo(0.5, 0.5);
		//this.game.touchScreenAnimation.scale.setTo(0.5, 0.5);
		this.game.touchScreenAnimation.animations.add('Touch');
		this.game.touchScreenAnimation.animations.play('Touch', 10, true);

		this.instrText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "TOUCH THE SCREEN\nTO CHANGE THE\nDIRECTION", TextStyles.M);
		this.instrText.fill = TextColors.WHITE;
		this.instrText.anchor.set(0.5);

		//this.instrTop = this.game.add.sprite(this.game.world.width / 2, this.game.world.height / 3, 'GameplayInstr1');
		//this.instrTop.anchor.setTo(0.5, 0);

		//this.instrBottom = this.game.add.sprite(this.game.world.width / 2, this.game.world.height *7 / 8, 'GameplayInstr2');
		//this.instrBottom.anchor.setTo(0.5, 0);
		//this.instrBottom.scale.setTo(0.5, 0.5);

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
		//this.backgroundGray.addToWorld(0, 0);
		//this.game.world.bringToTop(this.background);
		//this.background = this.game.add.sprite(0, 0, Songs[this.game.songToLoadIndex].filename + 'Background');
		ChartData.calculateNoteVelocity(this.game.world.height);
		PlayerData.calculateHorizontalVelocity(this.game.world.width);

		this.purpleGradient.destroy();
		this.purpleGradient = this.game.add.sprite(0, this.game.world.height, 'PurpleGradientBottom');
		const purpleGradientScaleMeasure = this.game.world.width / this.purpleGradient.width;
		this.purpleGradient.scale.setTo(purpleGradientScaleMeasure, 1);
		this.purpleGradient.anchor.set(0, 1);
		this.game.player = new Player(this.game, this.game.world.centerX / 2, this.game.world.height * 3 / 4);
		this.game.chart = new Chart(this.game);
		this.game.scoreUI = new ScoreUI(this.game); // Displays the score
		this.game.vitalWave = new VitalWave(this.game, this.game.world.centerX, 25); // Displays the player's life

		// Load the chart of the song selected in the song selection screen
		this.game.chart.load(Songs[this.game.songToLoadIndex]);

		// Hide/destroy instructions UI elements
		this.game.touchScreenAnimation.alpha = 0;
		this.instrText.destroy();
		//this.purpleGradient.destroy();
		//this.instrTop.destroy();
		//this.instrBottom.destroy();

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
				let opacity = this.game.player.life / (PlayerData.MAX_LIFE - 1);
				this.background.alpha = opacity;
				this.purpleGradient.alpha = opacity;
			}

			// Remove purple gradient if player won
			if (this.game.chart.gameState === ChartData.GAME_STATE['WIN'] ||
				this.game.chart.gameState === ChartData.GAME_STATE['LOSE']) {
				this.purpleGradient.alpha = 0;
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
		this.backgroundGray.destroy();
		this.purpleGradient.destroy();
		this.game.touchScreenAnimation.destroy();
		this.instrText.destroy();
		//this.instrBottom.destroy();
		//this.instrTop.destroy();
		this.game.vitalWave.deepDestroy();
		this.game.scoreUI.deepDestroy();
		this.game.player.destroy();
		this.game.chart.deepDestroy();

		this.game.touchScreenAnimation = null;
		this.game.vitalWave = null;
		this.game.scoreUI = null;
		this.game.player = null;
		this.game.chart = null;
	}
};
