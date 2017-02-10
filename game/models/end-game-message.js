// Represents a message showed when the game ends
// Has an animation that moves the sprite to the center of the screen
// Enables input to return to the main menu screen
function EndGameMessage(game, spriteKey) {
	Phaser.Sprite.call(this, game, game.world.width / 2, 0, spriteKey);
	this.game = game;
	this.game.add.existing(this);
	
	this.initialize();
}

EndGameMessage.prototype = Object.create(Phaser.Sprite.prototype);
EndGameMessage.prototype.constructor = EndGameMessage;

EndGameMessage.prototype.initialize = function() {
	this.anchor.setTo(0.5, 0.5); // Anchor set in the middle of the sprite
	this.y = -this.height; // Hide the sprite just in top of the screen

	this.createTweens();
}

EndGameMessage.prototype.createTweens = function() {
	this.tweens = {};
	
	// Animation that moves the sprite to the center of the screen
	this.tweens.center = this.game.add.tween(this);
	this.tweens.center.to( { x : this.game.world.width / 2, y : this.game.world.height / 3}, 500, Phaser.Easing.Linear.None, false);
	// After the animation ends, input is enabled
	this.tweens.center.onComplete.add(this.enableGoToMainMenuInput, this);
}

EndGameMessage.prototype.center = function() {
	this.tweens.center.start();
}

EndGameMessage.prototype.goToMainMenu = function() {
	this.game.chart.stop(); // Free memory removing chart

	// Remove spacebar and touch/click events, could be changed if UI buttons are implemented
	this.restartButton.onDown.remove(this.goToMainMenu, this);
	this.game.input.onDown.remove(this.goToMainMenu, this);
	
	// Hide 'Press Space' sprite
	this.game.pressSpace.alpha = 0;
	
	// Start menu screen state
	this.game.state.start('Intro');
}

EndGameMessage.prototype.enableGoToMainMenuInput = function() {
	// Add spacebar and touch/click events to go to main menu
	this.restartButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	this.restartButton.onDown.add(this.goToMainMenu, this);
	this.game.input.onDown.add(this.goToMainMenu, this);
	
	// Show 'Press Space' sprite
	this.game.pressSpace.alpha = 1;
}