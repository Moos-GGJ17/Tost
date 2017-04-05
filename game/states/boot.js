// JSON containing all the states of the game.
var States = {};

// This state loads the loading animation only, after it has loaded properly the state changes to 'Load'
States.Boot = {
	preload: function() {
		this.game.load.spritesheet('Loading', 'assets/images/loading-2.jpg', LOADING_MEASURES.width, LOADING_MEASURES.height);
	},

	create: function() {
		this.state.start('Load', true);
	}
};

