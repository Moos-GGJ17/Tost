function Chart(game, tempo){
	Phaser.Group.call(this, game);
	this.game = game;
	this.tempo = tempo;
	this.timer = this.game.time.create(false);
	this.velocity = 200;
	this.colors = ['Blue', 'Cyan', 'Gray', 'Purple', 'Red', 'Yellow'];
	this.positions = [];
	this.notes = [];
	this.startTime = 99999999;
	this.isCreatingNotes = false;
	this.music;
	this.errorAudio = this.game.add.audio('error');

	for (var i = 0; i < 6; i++) {
		this.positions[i] = this.game.world.width * (i + 1) / 8;
	}

	this.playMusicTimeout = this.game.player.y / this.velocity * 1000;

	this.powerups = new Powerups(this.game);

	this.noteToCreate = 0;
	this.currentNote = null;
}

Chart.prototype = Object.create(Phaser.Group.prototype);
Chart.prototype.constructor = Chart;

Chart.prototype.createNote = function () {
	//console.log(this.index  + '<' + this.notes.length);
	//if (this.index >= this.notes.length) {
	/*if (this.notes.length == 0) {
		this.isCreatingNotes = false;
		this.game.time.events.add(2 * Phaser.Timer.SECOND * this.game.world.height / this.velocity, this.lastNote, this);
	} else */if (!this.game.vitalWave.gameOver) {
		this.noteToCreate = this.notes.shift() - 1;
		this.currentNote = new Note(this.game, this.positions[this.noteToCreate], 0, this.velocity, this.tempo, this.colors[this.noteToCreate]);
		this.add(this.currentNote);
		//this.index++;
	}

	if (this.notes.length == 0) {
		this.isCreatingNotes = false;
		this.powerups.stop();
		this.music.fadeOut(this.playMusicTimeout * 2);
		this.game.time.events.add(this.playMusicTimeout * 2, this.lastNote, this);
	}
}

Chart.prototype.loadChart = function (chart) {
	this.tempo = 1000 * 60 / chart.bpm;
	this.notes = chart.notes;
	this.times = chart.times;
	this.music = this.game.add.audio(chart.filename);
	//this.game.time.events.repeat((this.game.world.width * 3 / 4) / this.game.chart.velocity * 1000 - 750, 1, this.playMusic, this);
	this.game.time.events.add(this.playMusicTimeout, this.playMusic, this);
	this.isCreatingNotes = true;
	this.startTime = this.game.time.totalElapsedSeconds();
	this.game.toasts.MAX_SCORE = chart.notes.length;
}

Chart.prototype.playMusic = function() {
	this.music.play();
}

Chart.prototype.update = function() {
	if (!this.game.vitalWave.gameOver && !this.game.toasts.finished) {
		this.callAll('update');
		

		if (this.isCreatingNotes) {
			this.powerups.update();
			if (!this.music.isPlaying) {
				if (this.game.time.totalElapsedSeconds() - this.startTime >= this.times[this.index] / 1000) {
					this.times.shift();
					this.createNote();
				}
			} else {
				//console.log('CurTime' + this.music.currentTime);
				//console.log('Timeout' + this.playMusicTimeout);
				//console.log('Next' + this.times[this.index]);
				//if (this.music.currentTime + this.playMusicTimeout >= this.times[this.index]) {
				if (this.music.currentTime + this.playMusicTimeout >= this.times[0]) {
					this.times.shift();
					this.createNote();
				}
			}
		}
	}
	//console.log(this.game.time.totalElapsedSeconds() - this.startTime);
	/*if (this.play) {
		if (this.game.time.totalElapsedSeconds() - this.startTime >= this.times[this.index] / 1000) {
		//if (this.music.currentTime >= this.times[this.index]) {
			this.createNote();
		}
	}*/
	
}

Chart.prototype.lastNote = function() {
	if (!this.game.vitalWave.gameOver) {
		this.game.toasts.finish();
	}
}

Chart.prototype.debug = function() {
	//this.callAll('debug');
}