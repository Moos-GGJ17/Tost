function Chart(game, tempo){
	Phaser.Group.call(this, game);
	this.game = game;
	this.tempo = tempo;
	this.timer = this.game.time.create(false);
	this.createRandomNotes();
	this.velocity = 50;
	this.colors = ['Blue', 'Cyan', 'Gray', 'Purple', 'Red', 'Yellow'];
	this.positions = [];
	this.notes = [];
	this.index = 0;
	for (var i = 0; i < 6; i++) {
		this.positions[i] = this.game.world.width * (i + 1) / 8;
	}
}

Chart.prototype = Object.create(Phaser.Group.prototype);
Chart.prototype.constructor = Chart;

Chart.prototype.createNote = function () {
	if (index > this.notes.length) {
		this.timer.stop();
	} else {
		var note = new Note(this.game, this.positions[this.notes[index]], 0, this.velocity, this.colors[this.notes[index]]);
		this.add(note);
		this.index++;
	}
}

Chart.prototype.load = function (chart) {
	this.tempo = 1000 * 60 / chart.bpm;
	this.notes = chart.notes;
	this.timer.loop(this.tempo, this.createNode, this);
	this.timer.start();
}

Chart.prototype.createRandomNotes = function () {
	this.timer.loop(this.tempo, this.createNote, this, Math.random() * 800, 0, 50, 'Red');
	this.timer.start();
}

Chart.prototype.update = function() {
	this.callAll('update');
}

Chart.prototype.debug = function() {
	this.callAll('debug');
}