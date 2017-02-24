function NoteGenerator(game, difficulty, chart) {
    Phaser.Group.call(this, game);
	this.game = game;

	this.tempo = 1000 * 60 / chart.bpm; // [ms] based on the bpm of the song that is currently playing
	this.notesIndexToBeCreated = chart.notes.slice(); // ['c','d','e','f','g','a','b']
	this.notesTimeToBeCreated = chart.times.slice(); // [ms]

	// Auxiliar variables used in note creation
	this.noteToCreateIndex = 0;
	this.noteToCreateTime = 0;
	this.calculatedDistanceBetweenNotesBetweenNotes = 0;
	this.currentNoteBeingCreated = null;

	// Variables used to compare the next note being created
	this.lastNoteCreatedIndex = 3; // 0 - 6
 	this.lastNoteCreatedTime = 0; // [ms]

	this.timeToChangeNote = 575 - 100 * difficulty; // Time needed for the player to move to the next note [ms]
	this.noteMinDistance = 100 * (ChartData.MAX_DIFFICULTY - difficulty + 1); // Minimum distance between notes [ms]
}

NoteGenerator.prototype = Object.create(Phaser.Group.prototype);
NoteGenerator.prototype.constructor = NoteGenerator;

NoteGenerator.prototype.createNoteBasedOnTimeInMiliseconds = function (currentTime) {
	if (currentTime >= this.notesTimeToBeCreated[0]) {
		this.checkDistanceAndCreateNote();
	}
}

// If the minumum time has elapsed, calculates the distance threshold between the current and next note,
// and creates a note based on this distance
NoteGenerator.prototype.checkDistanceAndCreateNote = function() {
	this.noteToCreateTime = this.notesTimeToBeCreated.shift(); // Obtain the first note time from queue
	this.noteToCreateIndex = this.notesIndexToBeCreated.shift(); // Obtain the first note index in the queue

	if ((this.noteToCreateTime - this.lastNoteCreatedTime) > this.noteMinDistance) {
		// Calculate distance between the notes so it doesn't create notes that are too far away
		this.calculatedDistanceBetweenNotes = this.recalculateNoteIndexDistance(this.noteToCreateIndex, this.noteToCreateTime);
		this.noteToCreateIndex = ChartData.NOTES[this.calculatedDistanceBetweenNotes];

		this.createNote(this.noteToCreateIndex);

		// save new note data for next comparison
		this.lastNoteCreatedIndex = this.calculatedDistanceBetweenNotes;
		this.lastNoteCreatedTime = this.noteToCreateTime;
	}
}

// Creates the next note in the chart
NoteGenerator.prototype.createNote = function (noteIndex) {	
	ChartData.increaseMaxNumberOfNotes();

	this.currentNoteBeingCreated = new Note(this.game,
		ChartData.notePositions[noteIndex], // x
		0, // y
		ChartData.NOTE_VELOCITY, // velocity
		this.tempo, // tempo
		ChartData.NOTE_COLORS[noteIndex]); // color
	
	this.add(this.currentNoteBeingCreated); // add note to this group
}

// Checks if the 
NoteGenerator.prototype.recalculateNoteIndexDistance = function(nextNote, nextNoteTime) {
	// Used for cyclic distance calculation, so bounds are [-3  3] instead of [0  6]
	this.lastNoteCreatedIndex -= 3;
	var nextNoteIndex = ChartData.convertNoteToIndex(nextNote) - 3;

	var distance = nextNoteIndex - this.lastNoteCreatedIndex;
	var deltaTime = (nextNoteTime - this.lastNoteCreatedTime) / this.timeToChangeNote;
	while (distance != 0 && Math.abs(deltaTime / distance) < 1) { // Keep reducing the distance if the time isn't enough to reach the next note
		if (distance > 0) {
			distance--;
			nextNoteIndex--;
		} else {
			distance++;
			nextNoteIndex++;
		}
	}

	return nextNoteIndex + 3; // Used for note creation, bounds are [0  6]
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
