// Loads all the assets before starting the game.
// After the server and API are implemented, this should be changed to load
// only the necessary assets.
States.Load = {
	init: function() {
		// Custom loader used to load fonts
		//this.game.load = new CustomLoader(game);
	},

	// Loads the assets.
	preload: function() {
		// Creates the loading animation
		var background = this.game.add.sprite(0, 0, 'Loading');
		background.animations.add('Loading');
		background.animations.play('Loading', 2, true);

		// Songs audio
		this.game.load.audio('PumpedUpKicks', 'assets/audio/songs/pumped-up-kicks.m4a');
		//this.game.load.audio('ibiza', 'assets/audio/songs/ibiza.mp3');
		//this.game.load.audio('sorry', 'assets/audio/songs/sorry.mp3');
		//this.game.load.audio('never', 'assets/audio/songs/never.mp3');

		// Backgrounds
		this.game.load.spritesheet('CityDay', 'assets/images/backgrounds/city-day-8.jpg', 424, 600);
		this.game.load.spritesheet('CityNight', 'assets/images/backgrounds/city-night-8.jpg', 424, 600);
		this.game.load.spritesheet('CityDayGray', 'assets/images/backgrounds/city-day-gray-8.jpg', 424, 600);
		this.game.load.spritesheet('CityNightGray', 'assets/images/backgrounds/city-night-gray-8.jpg', 424, 600);

		// Blank sprite used in some collisions
		this.game.load.image('Blank', 'assets/images/blank.png');

		// Player
		this.game.load.image('PlayerWhite', 'assets/images/player/white.png');
		this.game.load.image('PlayerBlue', 'assets/images/player/blue.png');
		this.game.load.image('PlayerCyan', 'assets/images/player/cyan.png');
		this.game.load.image('PlayerGray', 'assets/images/player/gray.png');
		this.game.load.image('PlayerPurple', 'assets/images/player/purple.png');
		this.game.load.image('PlayerRed', 'assets/images/player/red.png');
		this.game.load.image('PlayerYellow', 'assets/images/player/yellow.png');

		// Chart notes
		this.game.load.image('NoteBlue', 'assets/images/notes/blue.png');
		this.game.load.image('NoteCyan', 'assets/images/notes/cyan.png');
		this.game.load.image('NoteGray', 'assets/images/notes/gray.png');
		this.game.load.image('NotePurple', 'assets/images/notes/purple.png');
		this.game.load.image('NoteRed', 'assets/images/notes/red.png');
		this.game.load.image('NoteYellow', 'assets/images/notes/yellow.png');
		this.game.load.image('NoteWhite', 'assets/images/notes/white.png');
		this.game.load.image('NoteLight', 'assets/images/notes/light.png');

		// Powerups
		this.game.load.image('PowerupSlow', 'assets/images/powerups/slow.png');
		this.game.load.image('PowerupFast', 'assets/images/powerups/fast.png');	

		// Toasts for score
		this.game.load.image('ToastColor', 'assets/images/toast/color.png');
		this.game.load.image('ToastGold', 'assets/images/toast/gold.png');
		this.game.load.image('ToastGray', 'assets/images/toast/gray.png');

		// UI
		this.game.load.image('Toaster', 'assets/images/ui/toaster.png');
		this.game.load.image('SongSelectInstr1', 'assets/images/ui/song-selection/instructions-1.png');
		this.game.load.image('SongSelectInstr2', 'assets/images/ui/song-selection/instructions-2.png');
		this.game.load.image('GameOver', 'assets/images/ui/game-over.png');
		this.game.load.image('Tosted', 'assets/images/ui/tosted.png');
		this.game.load.image('GameplayInstr1', 'assets/images/ui/instructions.png');
		this.game.load.image('GameplayInstr2', 'assets/images/ui/instructions-space.png');
		this.game.load.spritesheet('PressSpace', 'assets/images/ui/space.png', 395, 393);

		// Songs cassettes
		this.game.load.image('PumpedUpKicksCassette', 'assets/images/songs/funkytown.png');
		//this.game.load.image('ibizaCassette', 'assets/images/songs/ibiza.png');
		//this.game.load.image('sorryCassette', 'assets/images/songs/sorry.png');
		//this.game.load.image('neverCassette', 'assets/images/songs/never.png');

		// Song backgrounds
		this.game.load.image('PumpedUpKicksBackground', 'assets/images/backgrounds/pumped-up-kicks.png');
		this.game.load.image('PumpedUpKicksBackgroundGray', 'assets/images/backgrounds/pumped-up-kicks-gray.png');

		// In-game audios
		this.game.load.audio('powerup', 'assets/audio/powerup.wav');
		this.game.load.audio('error', 'assets/audio/error.wav');
		this.game.load.audio('win', 'assets/audio/win.wav');
		this.game.load.audio('lost', 'assets/audio/lost.wav');
	},

	// Shows the main menu/song selection screen after all the assets loaded properly
	create: function(){
		this.state.start('MainMenu');
	}
};
