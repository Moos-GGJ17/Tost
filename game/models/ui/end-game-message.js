// Represents a message showed when the game ends
// Has an animation that moves the sprite to the center of the screen
// Enables input to return to the main menu screen
function EndGameMessage(game, spriteKey) {
	Phaser.Sprite.call(this, game, game.world.width / 2, 0, spriteKey);
	this.game = game;
	this.game.add.existing(this);
	
	this.initializeGradient();
	this.initialize();
}

EndGameMessage.prototype = Object.create(Phaser.Sprite.prototype);
EndGameMessage.prototype.constructor = EndGameMessage;

EndGameMessage.prototype.initializeGradient = function() {
	let purpleGradient = this.game.add.sprite(0, 0, 'PurpleGradientLeft');
    const purpleGradientScaleMeasure = this.game.world.height / purpleGradient.height;
    purpleGradient.scale.setTo(1, purpleGradientScaleMeasure);
}

EndGameMessage.prototype.initialize = function() {
	this.anchor.setTo(0.5, 0.5); // Anchor set in the middle of the sprite
	this.y = -this.height; // Hide the sprite just in top of the screen
	
	const scaleMeasure = (this.game.world.width * 3 / 4) / this.width;
	this.scale.setTo(scaleMeasure, scaleMeasure);
	this.game.world.bringToTop(this);

	this.createTweens();
}

EndGameMessage.prototype.createTweens = function() {
	this.tweens = {};
	
	// Animation that moves the sprite to the center of the screen
	this.tweens.center = this.game.add.tween(this);
	this.tweens.center.to( { x : this.game.world.width / 2, y : this.game.world.height / 3}, 500, Phaser.Easing.Linear.None, false);
	// After the animation ends, input is enabled
	this.tweens.center.onComplete.add(this.waitAndEnableInput, this);
}

EndGameMessage.prototype.center = function() {
	this.tweens.center.start();
}

EndGameMessage.prototype.goToMainMenu = function() {
	this.game.chart.deepDestroy(); // Free memory removing chart

	// Remove spacebar and touch/click events, could be changed if UI buttons are implemented
	this.restartButton.onDown.remove(this.goToMainMenu, this);
	this.game.input.onDown.remove(this.goToMainMenu, this);
	
	// Hide 'Press Space' sprite
	this.game.touchScreenAnimation.alpha = 0;
	
	// Start menu screen state
	this.game.state.start('MainMenu', true);
}

EndGameMessage.prototype.waitAndEnableInput = function() {
	this.game.time.events.add(2 * Phaser.Timer.SECOND, this.enableGoToMainMenuInput, this);
}

EndGameMessage.prototype.enableGoToMainMenuInput = function() {
	// Add spacebar and touch/click events to go to main menu
	this.restartButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	this.restartButton.onDown.add(this.goToMainMenu, this);
	this.game.input.onDown.add(this.goToMainMenu, this);
	
	// Show 'Press Space' sprite
	this.game.world.bringToTop(this.game.touchScreenAnimation);
	this.game.touchScreenAnimation.alpha = 1;
}