// Phaser.Group that contains all the notes and powerups for a song
function Chart(game) {
	Phaser.Group.call(this, game);
	this.game = game;

	//this.tempoMS = 0; // [ms] based on the bpm of the song that is currently playing
	this.chartLoadedTime = 0; // [s] time of the computer when the notes started to be created

	this.numberOfNotesHit = 0;
	this.gameState = ChartData.GAME_STATE['PAUSE'];
	
	this.music = null; // audio of the song that is currently playing
	this.errorAudio = this.game.add.audio('error');

	this.musicAlreadyPlayed = false; // Used to stop generating notes when the game is paused
	this.started = false;

	// Time to wait before the music starts, notes are already being created
	this.playMusicTimeout = this.game.player.y / ChartData.defaultNoteVelocity * 1000;

	this.volumeIsDown = false; // Used to alternate music volume when a note misses

	this.elapsedTime = 0; // Used to create a note

	this.powerups = new PowerupManager(this.game);
	//this.noteGenerator = new NoteGenerator(this.game);
}

Chart.prototype = Object.create(Phaser.Group.prototype);
Chart.prototype.constructor = Chart;

// Load a chart with the given data as a parameter and start creating notes
Chart.prototype.load = function (chart) {
	// Save important chart data
	this.music = this.game.add.audio(chart.filename);

	this.noteGenerator = new NoteGenerator(
		this.game,
		ChartData.DIFFICULTY[ChartData.currentDifficulty], // difficulty
		chart); // JSON containing the note, time to create each note and bpm

	// Start playing the music after the timeout
	this.game.time.events.add(this.playMusicTimeout, this.playMusic, this);
	
	// Save the time when the notes started being created
	this.chartLoadedTime = this.game.time.totalElapsedSeconds();
	
	// Sets the max score based on the amount of notes to be created
	ChartData.resetMaxNumberOfNotes();

	this.started = true;
	this.gameState = ChartData.GAME_STATE['PLAYING'];

	this.powerups.startCreatingPowerups();
}

// Stop music playing and powerup generation if there aren't more notes to be created
// Returns true if there are no more notes to be created, else false
Chart.prototype.checkEndOfChart = function() {
	if (this.noteGenerator.hasFinishedCreatingNotes()) {
		this.powerups.stop();
		this.music.fadeOut(this.playMusicTimeout * 2);

		// Wait 2 times the time that a note needs to reach the end of the screen to display
		// the win screen, player can still lose if there are some notes in screen
		this.game.time.events.add(this.playMusicTimeout * 2, this.showWinScreen, this);

		return true;
	}

	return false;
}

Chart.prototype.playMusic = function() {
	this.music.play();
	this.game.onPause.add(this.music.pause, this.music); // Music pauses when game is paused
	this.game.onResume.add(this.music.resume, this.music); // Music resumes when game is resumed
}

Chart.prototype.update = function() {
	if (this.started) {
		if (!this.gameHasEnded()) {
			// Update all the notes and powerups, check for collision with player
			this.noteGenerator.update();
			this.powerups.update();
			
			// Check if there are more notes to be created
			if (!this.checkEndOfChart()) {
				// If the music didn't start playing, create notes based on computer time,
				// else create notes based on music time
				if (!this.music.isPlaying && !this.musicAlreadyPlayed) {
					this.elapsedTime = (this.game.time.totalElapsedSeconds() - this.chartLoadedTime) * 1000;
				} else {
					this.musicAlreadyPlayed = true;
					this.elapsedTime = this.music.currentTime + this.playMusicTimeout
				}
				this.noteGenerator.createNoteBasedOnTimeInMiliseconds(this.elapsedTime);
			}

			if (this.game.player.life <= 0) {
				this.showLoseScreen();
			}
		} else {
			this.powerups.stop();
		}
	}	
}

Chart.prototype.gameHasEnded = function() {
	return this.gameState === ChartData.GAME_STATE.WIN || this.gameState === ChartData.GAME_STATE.LOSE;
}

Chart.prototype.debug = function() {
	this.noteGenerator.debug();
}

Chart.prototype.setVolume = function(volume) {
	this.music.volume = volume;
}

// Increase number of notes hit by 1
Chart.prototype.hitNote = function() {
	this.numberOfNotesHit++;
}

// Turn volume down for a moment when a note misses
Chart.prototype.missNote = function() {
	this.game.time.events.repeat(Phaser.Timer.SECOND / 4, 2, this.switchVolume, this);
}

// Switch music volume down and up, used when a note misses
Chart.prototype.switchVolume = function() {
	if (!this.volumeIsDown) {
		this.music.volume = 0;
		this.volumeIsDown = true;
	} else {
		this.music.volume = this.game.player.calculateLifePercentage();
		this.volumeIsDown = false;
	}
}

Chart.prototype.calculateNotesHitPercentage = function() {
	return this.numberOfNotesHit / ChartData.maxNumberOfNotes;
}

Chart.prototype.showWinScreen = function() {
	if (this.gameState === ChartData.GAME_STATE['PLAYING']) {
		this.gameState = ChartData.GAME_STATE['WIN'];
		this.game.scoreUI.displayToastsAndCenterText();
		this.game.add.audio('win').play();
		this.music.stop();

		var tostedMessage = new EndGameMessage(this.game, 'Tosted');
		tostedMessage.center();
	};
}

Chart.prototype.showLoseScreen = function() {
	if (this.gameState === ChartData.GAME_STATE['PLAYING']) {
		this.gameState = ChartData.GAME_STATE['LOSE'];
		this.callAll('changeColorToWhite'); // Change all notes currently on screen to white
		this.game.add.audio('lost').play();
		this.music.stop();

		var gameOverMessage = new EndGameMessage(this.game, 'GameOver');
		gameOverMessage.center();
	}
}

// Destroys everything related to the chart
Chart.prototype.deepDestroy = function() {
	this.music.destroy();
	this.powerups.destroy();
	this.noteGenerator.destroy();
	this.destroy();
}