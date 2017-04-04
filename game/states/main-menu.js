// Contains all the objects used in the main menu/song selection screen
States.MainMenu = {
	
	// This is called before create
	init: function(){
		this.game.renderer.renderSession.roundPixels = true;
		this.game.stage.backgroundColor = '0xFEEC70';
	},
	
	// Creates all the UI objects and defines the input events
	create: function(){
		//this.initializeCassette();
		//this.createToaster();
		//this.createInstructions();

		this.game.songSelector = new SongSelector(this.game, Songs);
		this.game.hasSelectedSong = false;
		this.game.hasSelectedDifficulty = false;
		//this.difficultySelector = new DifficultySelector(this.game);

		// Creates a key object using the SPACEBAR to control the time it's being pressed
		// and execute the corresponding action (handled in the update function)
		//this.spaceButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	},

	/*initializeCassette: function() {
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
	},*/

	update: function() {
		// handle song selection and changing only if difficulty selector is hidden
		/*if (this.difficultySelector.alpha === 0) {
			if (this.inputIsBeingHold()) {
				this.selectDifficulty();
			} else if (this.inputHasBeenPressed()) {
				this.changeSong();
			} else {
				this.setSongIsBeingChangedToFalse();
			}
		}*/
		this.game.songSelector.update();
		if (this.game.hasSelectedSong && this.game.hasSelectedDifficulty) {
			this.play();
		}

		/*if (this.difficultySelector.hasSelectedDifficulty) { // start game when a difficulty has been selected
			this.play();
		}*/
	},

	// Returns true if input has been held for more than 1 second
	/*inputIsBeingHold: function() {
		return (this.spaceButton.isDown && this.spaceButton.duration >= 1000) ||
			   (this.game.input.activePointer.isDown && this.game.input.activePointer.duration >= 1000); // touch-click
	},

	inputHasBeenPressed: function() {
		return this.spaceButton.isDown || this.game.input.activePointer.isDown; // space || touch-click 
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
	},*/

	selectDifficulty: function() {
		// Because the song index is changed each time the input is pressed,
		// if you hold the input down to begin playing, the song changes,
		// so it's necessary to change to the previous song before playing
		/*this.game.songToLoadIndex --;
		if (this.game.songToLoadIndex < 0) {
			this.game.songToLoadIndex = Songs.length - 1;
		}

		this.difficultySelector.show();		*/
	},

	play: function() {
		//this.cassette.music.stop();
		//this.cassette.hideAndDestroy();
		this.state.start('Play');
	},

	shutdown: function() {
		/*if (this.cassette) {
			this.cassette.finishedHideAndDestroy();
		}
		this.toaster.destroy();
		this.instr1.destroy();
		this.instr2.destroy();*/
		this.game.songSelector.deepDestroy(true);
		//this.difficultySelector.destroy(true);
	}
};
