// Constructor for Powerup
// Contains basic properties that all the powerups use.
// Specific powerup types are created in PowerupFactory via function composition
function Powerup(game, x, y, velocity, type) {
	Phaser.Sprite.call(this, game, x, y,'Powerup' + type);
	this.game = game;
	this.game.add.existing(this);
	this.defaultVelocity = velocity;
	
	this.initialize();
}

Powerup.prototype = Object.create(Phaser.Sprite.prototype);
Powerup.prototype.constructor = Powerup;

Powerup.prototype.initialize = function() {	
	this.isCaptured = false; // Player didn't catch it yet

	// Arcade physics basic configuration
	this.game.physics.arcade.enable(this);
	this.immovable = true;
	this.checkWorldBounds = true;
	this.body.setCircle(this.width / 2, 0, 0); // Circular body with same size as the sprite
	this.body.velocity.y = this.defaultVelocity;

	this.events.onOutOfBounds.add(this.destroyIfNotCaptured, this);

	this.createTweens();
}

Powerup.prototype.createTweens = function() {
	this.tweens = {};

	// Smoothly disappear from screen in 500 ms
	this.tweens.disappear = this.game.add.tween(this);
	this.tweens.disappear.to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, false);
}

Powerup.prototype.update = function() {
	// Check for collision with player, if there is collision, call playerHit function
	this.game.physics.arcade.overlap(this, this.game.player, this.playerHit, null, this);
}

Powerup.prototype.playerHit = function() {
	if (!this.isCaptured) {
		this.isCaptured = true;
		this.tweens.disappear.start();
		this.playSound();

		this.apply(); // Apply powerup effects, must be specified in each type of powerup
	}
}

Powerup.prototype.destroyIfNotCaptured = function() {
	if (!this.isCaptured) {
		this.destroy();
	}
}

Powerup.prototype.playSound = function() {
	this.game.add.audio('powerup').play();
}
