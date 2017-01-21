function Chart(game, tempo){
	Phaser.Group.call(this, game);
	this.game = game;
	this.tempo = tempo;
	this.timer = this.game.time.create(false);
	//this.createRandomNotes();
	this.velocity = 200;
	this.colors = ['Blue', 'Cyan', 'Gray', 'Purple', 'Red', 'Yellow'];
	this.positions = [];
	this.notes = [];
	this.index = 0;
	this.startTime = 99999999;
	this.play = false;

	this.music;
	for (var i = 0; i < 6; i++) {
		this.positions[i] = this.game.world.width * (i + 1) / 8;
	}
}

Chart.prototype = Object.create(Phaser.Group.prototype);
Chart.prototype.constructor = Chart;

Chart.prototype.createNote = function () {
	if (this.index > this.notes.length) {
		this.timer.stop();
	} else {
		if (this.notes[this.index] > 0) {
			console.log('Creating note');
			var note = new Note(this.game, this.positions[this.notes[this.index] - 1], 0, this.velocity, this.tempo, this.colors[this.notes[this.index] - 1]);
			this.add(note);
		}
		this.index++;
	}
}

Chart.prototype.load = function (chart) {
	this.tempo = 1000 * 60 / chart.bpm;
	this.notes = chart.notes;
	this.timer.loop(this.tempo, this.createNote, this);
	this.timer.start();
	var music = this.game.add.audio(chart.filename);
	this.music = music;
	//this.music.startTime = -10000;
	//setTimeout(function() {
		this.music.play();
	//}, 1000);
}

Chart.prototype.createNoteWithTime = function () {
	if (this.index > this.notes.length) {
		//this.timer.stop();
		this.music.stop();
	} else {
		/*if (this.times[this.index] >= this.timer.ms) {
			console.log('Creating note');
			var note = new Note(this.game, this.positions[this.notes[this.index] - 1], 0, this.velocity, this.tempo, this.colors[this.notes[this.index] - 1]);
			this.add(note);
			this.index++;
		}
		//this.index++;*/
		console.log('Creating note');
		var note = new Note(this.game, this.positions[this.notes[this.index] - 1], 0, this.velocity, this.tempo, this.colors[this.notes[this.index] - 1]);
		this.add(note);
		this.index++;
		//var aux = this;
		/*setTimeout(function() {
			aux.createNoteWithTime();
		}, this.times[this.index] - this.times[this.index - 1]);*/
	}
}

Chart.prototype.loadWithTime = function (chart) {
	this.tempo = 1000 * 60 / chart.bpm;
	this.notes = chart.notes;
	this.times = chart.times;
	//this.timer.loop(1, this.createNoteWithTime, this);
	//this.timer.start();
	this.music = this.game.add.audio(chart.filename);
	this.music.play();
	this.play = true;
	this.startTime = this.game.time.totalElapsedSeconds();
	var aux = this;
	console.log(this.times[0]);
	/*setTimeout(function() {
		aux.createNoteWithTime();
	}, this.times[0] + 1800);*/
}

/*Chart.prototype.createRandomNotes = function () {
	this.timer.loop(this.tempo, this.createNote, this, Math.random() * 800, 0, 50, 'Red');
	this.timer.start();
}*/

Chart.prototype.update = function() {
	this.callAll('update');
	//console.log(this.game.time.totalElapsedSeconds() - this.startTime);
	if (this.play) {
		if (this.game.time.totalElapsedSeconds() - this.startTime >= this.times[this.index] / 1000) {
			this.createNoteWithTime();
		}
	}
}

Chart.prototype.debug = function() {
	//this.callAll('debug');
}