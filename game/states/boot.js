// JSON containing all the states of the game.
var States = {};

// This state loads the loading animation only, after it has loaded properly the state changes to 'Load'
States.Boot = {
	preload: function() {
		this.game.load.spritesheet('Loading', 'assets/images/loading.jpg', 800, 600);
	},

	create: function() {
		this.state.start('Load');
	}
};

