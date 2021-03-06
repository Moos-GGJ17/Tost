// JSON that contains data abount the position and color of the notes to be displayed on screen
ChartData = {};

//ChartData.NOTE_COLORS = ['Blue', 'Cyan', 'Gray', 'Purple', 'Red', 'Yellow', 'Yellow'];
ChartData.NOTE_COLORS = {
	'c': 'Blue',
	'd': 'Cyan',
	'e': 'Orange',
	'f': 'Purple',
	'g': 'Red',
	'a': 'Yellow',
	'b': 'Pink'
};

ChartData.NOTES = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];

ChartData.convertNoteToIndex = function(note) {
	switch (note) {
		case 'c': return 0;
		case 'd': return 1;
		case 'e': return 2;
		case 'f': return 3;
		case 'g': return 4;
		case 'a': return 5;
		case 'b': return 6;
	}
}

ChartData.notePositions = {};

ChartData.maxNumberOfNotes = 0;

ChartData.defaultNoteVelocity = 200; // y-velocity of the notes
ChartData.MAX_DIFFICULTY = 5;

// Calculate the y-velocity of the notes based on a given height
ChartData.calculateNoteVelocity = function(height) {
	ChartData.defaultNoteVelocity = (50 + ChartData.DIFFICULTY[ChartData.currentDifficulty] * 45) * height / 600;
}

// Calculate positions based on the given width, so the positions are evenly distributed
ChartData.calculateNotePositions = function(width) {
	for (var i = 0; i < ChartData.NOTES.length; i++) {
		ChartData.notePositions[ChartData.NOTES[i]] = width * (i + 1) / (ChartData.NOTES.length + 2);
	}
}

ChartData.resetMaxNumberOfNotes = function() {
	ChartData.maxNumberOfNotes = 0;
}

ChartData.increaseMaxNumberOfNotes = function() {
	ChartData.maxNumberOfNotes++;
}

ChartData.LIFE_GAIN_WHEN_NOTE_HIT = 0.2;
ChartData.LIFE_LOSS_WHEN_NOTE_MISS = 1;
ChartData.SCORE_TO_INCREASE_WHEN_NOTE_HIT = 1;

ChartData.GAME_STATE = {
	'WIN': 'Win',
	'LOSE': 'Lose',
	'PLAYING': 'Playing',
	'PAUSE': 'Pause'
}

// Percentage of notes hits used as a base to define the different score ranks
ChartData.SCORE_BASE = {
	'GOLD': 0.95,
	'THREE_TOASTS': 0.85,
	'TWO_TOASTS': 0.60,
	'ONE_TOAST': 0.30
}

ChartData.DIFFICULTY = {
	'EASY': 2,
	'HARD': 5
};

ChartData.currentDifficulty = 'EASY';
