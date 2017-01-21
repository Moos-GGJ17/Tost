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
	},
	

	// Starts the game.
	create: function(){
		// Sets the game background color
		this.game.stage.backgroundColor = '0x000000';

		// Sets the world bounds
		this.game.world.setBounds(0, 0, this.BOUNDS.x, this.BOUNDS.y);

		this.game.player = new Player(this.game, this.BOUNDS.x / 2, this.BOUNDS.y * 3 / 4, 150);
	},

	// Updates all the game's objects.
	update: function(){
		this.game.player.update();    
	},

	render: function() {
		this.game.player.debug();
	}
};