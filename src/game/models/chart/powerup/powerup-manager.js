// Phaser.Group object that contains all the powerups currently in game
// Also takes care of creating powerups after a certain time and handling the powerups
function PowerupManager(game) {
	Phaser.Group.call(this, game);
	this.game = game;
	this.game.add.existing(this);

	// Create a timer with a loop that generates a new powerup after 15 seconds
	this.powerupCreationTimer = this.game.time.create(false);
	this.powerupCreationTimer.loop(Phaser.Timer.SECOND * 15, this.generateRandomPowerup, this);
}

PowerupManager.prototype = Object.create(Phaser.Group.prototype);
PowerupManager.prototype.constructor = PowerupManager;

PowerupManager.prototype.generateRandomPowerup = function() {
	var type = Math.floor(Math.random() * PowerupTypes.count); // Random powerup type
	var x = Math.random() * this.game.width * 3 / 4 + this.game.width / 8; // Random x position within game threshold
	var velocity = Math.random() * 50 + ChartData.NOTE_VELOCITY - 25; // Random acceptable velocity
	var powerup; // New powerup to be created

	switch (type) {
		case 0: // Slow powerup
			powerup = PowerupFactory.createSlow(this.game, x, 0, velocity);
			break;
		case 1: // Fast powerup
			powerup = PowerupFactory.createFast(this.game, x, 0, velocity);
			break;
		default:
			console.log("Unknown type of powerup");
	}

	if (powerup) {
		this.add(powerup);
	}
}

PowerupManager.prototype.startCreatingPowerups = function() {
	this.powerupCreationTimer.start();
}

PowerupManager.prototype.update = function() {
	this.callAll('update');
}

PowerupManager.prototype.stop = function() {
	if (this.powerupCreationTimer.running) {
		this.powerupCreationTimer.stop();
	}
}
