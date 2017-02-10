// Represents the 'Game Over' message showed when the player lose
function GameOver(game, x, y) {
	Phaser.Sprite.call(this, game, x, y,'GameOver');
	this.game = game;
	this.game.add.existing(this);
	
	this.initialize(x, y);
}

GameOver.prototype = Object.create(Phaser.Sprite.prototype);
GameOver.prototype.constructor = GameOver;

GameOver.prototype.initialize = function(x, y) {
	this.anchor.setTo(0.5, 0.5); // Anchor set in the middle of the sprite
	this.y = -this.height / 2; // Hide the sprite just in top of the screen

	this.createTweens(x, y);
}

GameOver.prototype.createTweens = function(x, y) {
	this.tweens = {};
	
	// Animation that moves the sprite to the given (x, y) position
	this.tweens.show = this.game.add.tween(this);
	this.tweens.show.to( { 'x': x, 'y': y }, 2000, Phaser.Easing.Linear.None, false);
	// After the animation ends, input is enabled
	this.tweens.show.onComplete.add(this.enableGoToMainMenuInput, this);
}

GameOver.prototype.show = function() {
	this.tweens.show.start();
}

GameOver.prototype.goToMainMenu = function() {
	this.game.chart.stop(); // Free memory removing chart

	// Remove spacebar and touch/click events, could be changed if UI buttons are implemented
	this.restartButton.onDown.remove(this.goToMainMenu, this);
	this.game.input.onDown.remove(this.goToMainMenu, this);
	
	// Hide 'Press Space' sprite
	this.game.pressSpace.alpha = 0;
	
	// Start menu screen state
	this.game.state.start('Intro');
}

GameOver.prototype.enableGoToMainMenuInput = function() {
	// Add spacebar and touch/click events to go to main menu
	this.restartButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	this.restartButton.onDown.add(this.goToMainMenu, this);
	this.game.input.onDown.add(this.goToMainMenu, this);
	
	// Show 'Press Space' sprite
	this.game.pressSpace.alpha = 1;
}