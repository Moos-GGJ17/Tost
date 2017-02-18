// Contains all the objects used in the main menu/song selection screen
States.MainMenu = {
	
	// This is called before create
	init: function(){
		this.game.renderer.renderSession.roundPixels = true;
		this.game.stage.backgroundColor = '0xFEEC70';
	},
	
	// Creates all the UI objects and defines the input events
	create: function(){
		this.initializeCassette();
		this.createToaster();
		this.createInstructions();

		// Creates a key object using the SPACEBAR to control the time it's being pressed
		// and execute the corresponding action (handled in the update function)
		this.spaceButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		// Used to prevent changing song multiple times while pressing the spacebar only once
		this.spaceButton.onUp.add(this.setSongIsBeingChangedToFalse, this);
	},

	initializeCassette: function() {
		this.game.songToLoadIndex = 0;
		this.songIsBeingChanged = false; // Used to handle the input down events and prevent changing songs
										 // multiple times while holding the button down
		
		// Creates the cassette centered in the screen with the current song filename
		this.cassette = new Cassette(this.game,
			this.game.world.centerX, // x
			this.game.world.centerY * 6 / 5, // y
			this.getCurrentSongFilename());
	},

	createToaster: function() {
		this.toaster = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'Toaster');
		this.toaster.anchor.x = 0.5;
		this.toaster.anchor.y = 1;
		this.toaster.scale.setTo(0.28, 0.28);
	},

	createInstructions: function() {
		this.instr1 = this.game.add.sprite(this.game.world.centerX, 20, 'SongSelectInstr1');
		this.instr1.anchor.x = 0.5;
		this.instr1.anchor.y = 0;
		this.instr1.scale.setTo(0.7, 0.7);

		this.instr2 = this.game.add.sprite(this.game.world.centerX, this.instr1.height * 1.5, 'SongSelectInstr2');
		this.instr2.anchor.x = 0.5;
		this.instr2.anchor.y = 0;
		this.instr2.scale.setTo(0.7, 0.7);
	},

	update: function() {
		if (this.inputIsBeingHold()) {
			this.play();
		} else if (this.inputHasBeenPressed()) {
			this.changeSong();
		}
	},

	// Returns true if input has been held for more than 1 second
	inputIsBeingHold: function() {
		return (this.spaceButton.isDown && this.spaceButton.duration >= 1000) ||
			   (this.game.input.isDown && this.game.input.duration >= 1000);
	},

	inputHasBeenPressed: function() {
		return this.spaceButton.isDown || this.game.input.isDown;
	},

	getCurrentSongFilename: function() {
		return Songs[this.game.songToLoadIndex].filename;
	},

	// To prevent changing song multiple times when the input has been pressed only once
	setSongIsBeingChangedToFalse: function() {
		this.songIsBeingChanged = false;
	},

	changeSong: function() {
		if (!this.songIsBeingChanged) {
			this.songIsBeingChanged = true;

			// Circle cycling
			this.game.songToLoadIndex = (this.game.songToLoadIndex + 1) % Songs.length;
			this.cassette.hideAndSetSongFilename(this.getCurrentSongFilename());
		}
	},

	play: function() {
		this.cassette.music.stop();

		// Because the song index is changed each time the input is pressed,
		// if you hold the input down to begin playing, the song changes,
		// so it's necessary to change to the previous song before playing
		this.game.songToLoadIndex --;
		if (this.game.songToLoadIndex < 0) {
			this.game.songToLoadIndex = Songs.length - 1;
		}

		this.cassette.hideAndDestroy();
		this.state.start('Play');
	}
};
