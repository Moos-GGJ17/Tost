function Chart(game, tempo){
	Phaser.Group.call(this, game);
	this.game = game;
	this.tempo = tempo;
	this.timer = this.game.time.create(false);
	this.createRandomNotes();
	this.colors = ['Blue', 'Cyan', 'Gray', 'Purple', 'Red', 'Yellow']
}

Chart.prototype = Object.create(Phaser.Group.prototype);
Chart.prototype.constructor = Chart;

Chart.prototype.createNote = function (x, y, velocity, color) {
	var note = new Note(this.game, Math.random() * 800, y, velocity, this.colors[Math.floor(Math.random() * 6)]);
	this.add(note);
	console.log('Note created');
	console.log(note);
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