// JSON containing all the states of the game.
var States = {};

/**
 * Loads all the necessary assets before starting the game.
 */
States.Boot = {
	// Loads the assets.
	preload: function(){
		//this.game.load.image('Player', 'assets/images/player.png');
		this.game.load.image('Blank', 'assets/images/blank.png');

		this.game.load.image('WaveWhite', 'assets/images/wave/white.png');
		this.game.load.image('WaveBlue', 'assets/images/wave/blue.png');
		this.game.load.image('WaveCyan', 'assets/images/wave/cyan.png');
		this.game.load.image('WaveGray', 'assets/images/wave/gray.png');
		this.game.load.image('WavePurple', 'assets/images/wave/purple.png');
		this.game.load.image('WaveRed', 'assets/images/wave/red.png');
		this.game.load.image('WaveYellow', 'assets/images/wave/yellow.png');

		this.game.load.image('NoteBlue', 'assets/images/notes/blue.png');
		this.game.load.image('NoteCyan', 'assets/images/notes/cyan.png');
		this.game.load.image('NoteGray', 'assets/images/notes/gray.png');
		this.game.load.image('NotePurple', 'assets/images/notes/purple.png');
		this.game.load.image('NoteRed', 'assets/images/notes/red.png');
		this.game.load.image('NoteYellow', 'assets/images/notes/yellow.png');
		this.game.load.image('NoteWhite', 'assets/images/notes/white.png');
		this.game.load.image('NoteLight', 'assets/images/notes/light.png');

		this.game.load.image('ToastColor', 'assets/images/toast/color.png');
		this.game.load.image('ToastGold', 'assets/images/toast/gold.png');
		this.game.load.image('ToastGray', 'assets/images/toast/gray.png');

		this.game.load.image('GameOver', 'assets/images/ui/game-over.png');
		this.game.load.image('Tosted', 'assets/images/ui/tosted.png');
		this.game.load.image('Space', 'assets/images/ui/space.png');

		this.game.load.spritesheet('City', 'assets/images/backgrounds/city.jpg', 424, 600);

		this.game.load.audio('funkytown', 'assets/audio/songs/funkytown.mp3');
		this.game.load.audio('ibiza', 'assets/audio/songs/ibiza.mp3');
	},
	// Starts the game ;)
	create: function(){
		this.state.start('Play');
	}
};
