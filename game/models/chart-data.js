// JSON that contains data abount the position and color of the notes to be displayed on screen
ChartData = {};

ChartData.colors = ['Blue', 'Cyan', 'Gray', 'Purple', 'Red', 'Yellow'];

ChartData.positions = [];

ChartData.maxNumberOfNotes = 0;

// Calculate positions based on the given width, so the positions are evenly distributed
ChartData.calculatePositions = function(width) {
	for (var i = 0; i < ChartData.colors.length; i++) {
		ChartData.positions[i] = width * (i + 1) / (ChartData.colors.length + 2);
	}
}

ChartData.setMaxNumberOfNotes = function(numberOfNotes) {
	ChartData.maxNumberOfNotes = numberOfNotes;
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

ChartData.SCORE_BASE = {
	'GOLD': 95,
	'THREE_TOASTS': 85,
	'TWO_TOASTS': 60,
	'ONE_TOAST': 30
}