function NoteGenerator(game, tempo, notesIndexToBeCreated, notesTimeToBeCreated) {
    Phaser.Group.call(this, game);
	this.game = game;

	this.tempo = tempo; // [ms] based on the bpm of the song that is currently playing

	this.notesIndexToBeCreated = notesIndexToBeCreated; // [0 - 5]
	this.notesTimeToBeCreated = notesTimeToBeCreated; // [ms]

	// Auxiliar variables used in createNote function
	this.noteToCreateIndex = 0;
	this.noteToCreateTime = 0;
	this.currentNoteBeingCreated = null;

	this.lastNoteCreatedIndex = 3;
	this.lastNoteCreatedTime = 0;

	this.timeToChangeNote = 75; // Time needed for the player to move to the next note [ms]

	console.log("Testing note generator " + this.timeToChangeNote + " ms");
}

NoteGenerator.prototype = Object.create(Phaser.Group.prototype);
NoteGenerator.prototype.constructor = NoteGenerator;

NoteGenerator.prototype.createNoteBasedOnTimeInMiliseconds = function (currentTime) {
	if (currentTime >= this.notesTimeToBeCreated[0]) {
		this.createNote();
	}
}

// Creates the next note in the chart
NoteGenerator.prototype.createNote = function () {
	this.noteToCreateTime = this.notesTimeToBeCreated.shift(); // Remove current time from queue
	//this.notesTimeToBeCreated.shift(); // Remove current time from queue
	// Obtain the first note index in the queue
	this.noteToCreateIndex = this.notesIndexToBeCreated.shift();// - 1;
	var calculatedDistance = this.calculateAndNoteIndexDistance(this.noteToCreateIndex, this.noteToCreateTime);
	this.noteToCreateIndex = ChartData.NOTES[calculatedDistance];
	//this.notesIndexToBeCreated.shift();// - 1;
	this.currentNoteBeingCreated = new Note(this.game,
		ChartData.notePositions[this.noteToCreateIndex], // x
		0, // y
		ChartData.NOTE_VELOCITY, // velocity
		this.tempo, // tempo
		ChartData.NOTE_COLORS[this.noteToCreateIndex]); // color
	
	this.add(this.currentNoteBeingCreated); // add note to the chart group
	this.lastNoteCreatedIndex = calculatedDistance;
	this.lastNoteCreatedTime = this.noteToCreateTime;

	//this.checkEndOfChart();
}

NoteGenerator.prototype.calculateAndNoteIndexDistance = function(newNote, newNoteTime) {
	var newNoteIndex = ChartData.convertNoteToIndex(newNote) - 3;
	this.lastNoteCreatedIndex -= 3;

	var distance = newNoteIndex - this.lastNoteCreatedIndex;
	var deltaTime = (newNoteTime - this.lastNoteCreatedTime) / this.timeToChangeNote;
	while (distance != 0 && Math.abs(deltaTime / distance) < 1) {
		if (distance > 0) {
			distance--;
			newNoteIndex--;
		} else {
			distance++;
			newNoteIndex++;
		}
	}

	return newNoteIndex + 3;
}

NoteGenerator.prototype.hasFinishedCreatingNotes = function() {
	return this.notesIndexToBeCreated.length == 0;
}

NoteGenerator.prototype.update = function() {
	// Update all the notes, check for collision with player
	this.callAll('update');
}

NoteGenerator.prototype.debug = function() {
	this.callAll('debug');
}
