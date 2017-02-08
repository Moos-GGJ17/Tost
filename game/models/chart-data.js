// JSON that contains data abount the position and color of the notes to be displayed on screen
ChartData = {};

ChartData.colors = ['Blue', 'Cyan', 'Gray', 'Purple', 'Red', 'Yellow'];

ChartData.positions = [];

// Calculate positions based on the given width, so the positions are evenly distributed
ChartData.calculatePositions = function(width) {
	for (var i = 0; i < ChartData.colors.length; i++) {
		ChartData.positions[i] = width * (i + 1) / (ChartData.colors.length + 2);
	}
}
