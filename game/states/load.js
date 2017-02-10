/**
 * Loads all the necessary assets before starting the game.
 */
States.Load = {
	init: function() {
		this.game.load = new CustomLoader(game);
	},

	// Loads the assets.
	preload: function(){
		var background = this.game.add.sprite(0, 0, 'Loading');
		background.animations.add('Loading');
		background.animations.play('Loading', 2, true);

		this.game.load.audio('funkytown', 'assets/audio/songs/funkytown.mp3');
		this.game.load.audio('ibiza', 'assets/audio/songs/ibiza.mp3');
		this.game.load.audio('sorry', 'assets/audio/songs/sorry.mp3');
		this.game.load.audio('never', 'assets/audio/songs/never.mp3');

		this.game.load.spritesheet('CityDay', 'assets/images/backgrounds/city-day-8.jpg', 424, 600);
		this.game.load.spritesheet('CityNight', 'assets/images/backgrounds/city-night-8.jpg', 424, 600);
		this.game.load.spritesheet('CityDayGray', 'assets/images/backgrounds/city-day-gray-8.jpg', 424, 600);
		this.game.load.spritesheet('CityNightGray', 'assets/images/backgrounds/city-night-gray-8.jpg', 424, 600);

		this.game.load.image('Logo', 'assets/images/intro.png');
		this.game.load.image('Instr1', 'assets/images/ui/intro1.png');
		this.game.load.image('Instr2', 'assets/images/ui/intro2.png');

		this.game.load.image('Blank', 'assets/images/blank.png');

		this.game.load.image('PlayerWhite', 'assets/images/player/white.png');
		this.game.load.image('PlayerBlue', 'assets/images/player/blue.png');
		this.game.load.image('PlayerCyan', 'assets/images/player/cyan.png');
		this.game.load.image('PlayerGray', 'assets/images/player/gray.png');
		this.game.load.image('PlayerPurple', 'assets/images/player/purple.png');
		this.game.load.image('PlayerRed', 'assets/images/player/red.png');
		this.game.load.image('PlayerYellow', 'assets/images/player/yellow.png');

		this.game.load.image('NoteBlue', 'assets/images/notes/blue.png');
		this.game.load.image('NoteCyan', 'assets/images/notes/cyan.png');
		this.game.load.image('NoteGray', 'assets/images/notes/gray.png');
		this.game.load.image('NotePurple', 'assets/images/notes/purple.png');
		this.game.load.image('NoteRed', 'assets/images/notes/red.png');
		this.game.load.image('NoteYellow', 'assets/images/notes/yellow.png');
		this.game.load.image('NoteWhite', 'assets/images/notes/white.png');
		this.game.load.image('NoteLight', 'assets/images/notes/light.png');

		this.game.load.image('PowerupSlow', 'assets/images/powerups/slow.png');
		this.game.load.image('PowerupFast', 'assets/images/powerups/fast.png');	

		this.game.load.image('ToastColor', 'assets/images/toast/color.png');
		this.game.load.image('ToastGold', 'assets/images/toast/gold.png');
		this.game.load.image('ToastGray', 'assets/images/toast/gray.png');

		this.game.load.image('GameOver', 'assets/images/ui/game-over.png');
		this.game.load.image('Tosted', 'assets/images/ui/tosted.png');
		this.game.load.image('Instructions', 'assets/images/ui/instructions.png');
		this.game.load.image('InstructionsSpace', 'assets/images/ui/instructions-space.png');
		this.game.load.spritesheet('Space', 'assets/images/ui/space.png', 395, 393);

		this.game.load.image('funkytownCassette', 'assets/images/songs/funkytown.png');
		this.game.load.image('ibizaCassette', 'assets/images/songs/ibiza.png');
		this.game.load.image('sorryCassette', 'assets/images/songs/sorry.png');
		this.game.load.image('neverCassette', 'assets/images/songs/never.png');

		this.game.load.audio('powerup', 'assets/audio/powerup.wav');
		this.game.load.audio('error', 'assets/audio/error.wav');
		this.game.load.audio('win', 'assets/audio/win.wav');
		this.game.load.audio('lost', 'assets/audio/lost.wav');

		//this.game.load.webfont('8bit', '8-BIT WONDER');
	},
	// Starts the game ;)
	create: function(){
		this.state.start('Intro');
		//this.state.start('Play');
	}
};