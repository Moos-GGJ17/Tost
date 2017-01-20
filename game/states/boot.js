// JSON containing all the states of the game.
var States = {};

/**
 * Loads all the necessary assets before starting the game.
 */
States.Boot = {
	// Loads the assets.
	preload: function(){
		this.game.load.image('Player', 'assets/images/player.png');
	},
	// Starts the game ;)
	create: function(){
		this.state.start('Play');
	}
};
