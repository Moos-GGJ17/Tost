// JSON containing all the states of the game.
var States = {};

/**
 * Loads all the necessary assets before starting the game.
 */
States.Boot = {
	// Loads the assets.
	preload: function(){
		this.game.load.image('Player', 'assets/images/player.png');
		this.game.load.image('NoteBlue', 'assets/images/notes/blue.png');
		this.game.load.image('NoteCyan', 'assets/images/notes/cyan.png');
		this.game.load.image('NoteGray', 'assets/images/notes/gray.png');
		this.game.load.image('NotePurple', 'assets/images/notes/purple.png');
		this.game.load.image('NoteRed', 'assets/images/notes/red.png');
		this.game.load.image('NoteYellow', 'assets/images/notes/yellow.png');
		this.game.load.image('NoteWhite', 'assets/images/notes/white.png');
	},
	// Starts the game ;)
	create: function(){
		this.state.start('Play');
	}
};
