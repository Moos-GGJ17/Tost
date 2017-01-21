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

		this.game.chart = new Chart(this.game, 2000);
		this.game.chart.load({
	"name" : "Funkytown",
	"artist" : "Lipps Inc.",
	"filename": "funkytown",
	"bpm" : 122,
	"notes" : [
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		4,2,4,3,6,4,4,0,
		4,2,4,3,6,4,4,0,
		1,0,2,0,3,0,6,5,
		4,2,4,3,6,4,4,0,
		1,0,2,0,3,0,6,5,
		4,2,4,3,6,4,4,0,
		5,0,4,0,3,2,2,0,
		3,1,3,2,5,3,3,0,
		4,0,3,0,2,0,2,1,
		4,2,4,3,6,4,4,0,
		6,6,5,4,6,4,4,0
	] 
}
);
		//var trace = this.game.add.group();
		//this.game.playerTrace = this.game.add.sprite();
		//trace.add(this.game.playerTrace);
		this.game.player = new Player(this.game, this.BOUNDS.x / 2, this.BOUNDS.y * 3 / 4, 800);
	},

	// Updates all the game's objects.
	update: function(){
		this.game.player.update();
	},

	render: function() {
		//this.game.player.debug();
		//this.game.chart.debug();
	}
};