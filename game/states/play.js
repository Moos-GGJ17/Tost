/**
 * Principal game state, all the fun begins here.
 */
States.Play = {
	// Sets the game's basic configurations.
	init: function(){
		this.game.renderer.renderSession.roundPixels = true;
		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.BOUNDS = {
			x: 800,
			y: 600
		};
		this.started = false;
	},
	

	// Starts the game.
	create: function(){
		// Sets the game background color
		this.game.stage.backgroundColor = '0x000000';
		var currentDate = new Date();
		if (currentDate.getHours() > 18 || currentDate.getHours() < 6) {
			this.background = this.game.add.sprite(0, 0, 'CityNight');
		} else {
			this.background = this.game.add.sprite(0, 0, 'CityDay');
		}		
		this.background.animations.add('Play');
		this.background.animations.play('Play', 5, true);
		this.background.scale.setTo(this.game.width / this.background.width, this.game.height / this.background.height);

		this.game.pressSpace = this.game.add.sprite(this.game.world.width / 2, this.game.world.height * 3 / 4, 'Space');
		this.game.pressSpace.anchor.setTo(0.5, 0.5);
		this.game.pressSpace.scale.setTo(0.5, 0.5);
		this.game.pressSpace.animations.add('Press');
		this.game.pressSpace.animations.play('Press', 3, true);

		// Sets the world bounds
		this.game.world.setBounds(0, 0, this.BOUNDS.x, this.BOUNDS.y);

		this.playButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.playButton.onDown.add(this.play, this);
		if (this.game.autoPlay) {
			this.play();
		}
	},

	play: function() {
		this.game.chart = new Chart(this.game, 2000);
		var aux = this;
		//setTimeout(function() {
			
		//}, (this.game.world.width * 3 / 4) / this.game.chart.velocity * 1000);
		//var trace = this.game.add.group();
		//this.game.playerTrace = this.game.add.sprite();
		//trace.add(this.game.playerTrace);
		this.game.player = new Player(this.game, this.BOUNDS.x / 2, this.BOUNDS.y * 3 / 4, 1000);
		this.game.vitalWave = new VitalWave(this.game, 0, 100, 7, 5, 4, '#ffffff');
		this.game.toasts = new Toasts(this.game, 0, 0, 0);
		this.game.gameOver = new GameOver(this.game, this.game.world.width / 2, this.game.height / 3);
		this.game.tosted = new Tosted(this.game);
		this.started = true;
		this.playButton.onDown.remove(this.play, this);
		//this.pressSpace.destroy();
		this.game.pressSpace.alpha = 0;
		aux.game.chart.loadWithTime(Songs.funkytown);
	},

	// Updates all the game's objects.
	update: function(){
		if (this.started) {
			this.game.player.update();
			this.game.chart.update();

			if (this.game.vitalWave.gameOver) {
				//this.state.start('GameOver', true);
				this.game.gameOver.show();
			}
		}
	},

	render: function() {
		//this.game.player.debug();
		//this.game.chart.debug();
	}
};