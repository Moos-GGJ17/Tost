function PowerupFast(game, x, y, velocity) {
	Phaser.Sprite.call(this, game, x, y,'PowerupFast');
	this.game = game;
	this.game.add.existing(this);
	
	this.captured = false;
	this.initialize(velocity);
}

PowerupFast.prototype = Object.create(Phaser.Sprite.prototype);
PowerupFast.prototype.constructor = PowerupFast;

PowerupFast.prototype.initialize = function(velocity) {
	this.game.physics.arcade.enable(this);
	this.immovable = true;
	this.checkWorldBounds = true;
	this.events.onOutOfBounds.add(this.destroyIfNotCaptured, this);

	this.body.setCircle(this.width / 2, 0, 0);
	this.body.velocity.y = velocity;

	this.createTweens();
}

PowerupFast.prototype.createTweens = function() {
	this.tweens = {};
	this.tweens.disappear = this.game.add.tween(this);
	this.tweens.disappear.to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, false);
}

PowerupFast.prototype.update = function() {
	this.game.physics.arcade.overlap(this, this.game.player, this.hit, null, this);
}

PowerupFast.prototype.hit = function() {
	if (!this.captured) {
		this.captured = true;
		this.tweens.disappear.start();
		this.playSound();
		this.apply();
	}
}

PowerupFast.prototype.destroyIfNotCaptured = function() {
	if (!this.captured) {
		this.destroy();
	}
}

PowerupFast.prototype.playSound = function() {
	this.game.add.audio('powerup').play();
}

PowerupFast.prototype.apply = function() {
	this.game.player.setPowerup(this.key);
	this.game.player.body.velocity.x *= 2;
	this.game.time.events.repeat(Phaser.Timer.SECOND * 10, 1, this.cease, this);
}

PowerupFast.prototype.cease = function() {
	this.game.player.body.velocity.x /= 2;
	this.game.player.removePowerup();
	this.destroy();
}