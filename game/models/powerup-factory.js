// Global variable utilized to create powerups
// Additional functions for each type of powerup are added via composition using Object.assign
var PowerupFactory = {};

PowerupFactory.createSlow = function(game, x, y, velocity) {
	var powerup = new Powerup(game, x, y, velocity, "Slow");
	Object.assign(powerup, PowerupTypes.slow);
	return powerup;
}

PowerupFactory.createFast = function(game, x, y, velocity) {
	var powerup = new Powerup(game, x, y, velocity, "Fast");
	Object.assign(powerup, PowerupTypes.fast);
	return powerup;
}