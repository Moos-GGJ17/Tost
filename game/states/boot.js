// JSON containing all the states of the game.
var States = {};

/**
 * Loads all the necessary assets before starting the game.
 */
States.Boot = {
	preload: function() {
		this.game.load.spritesheet('Loading', 'assets/images/loading.png', 800, 600);
	},

	create: function() {
    	this.state.start('Load');
	}
};
