function PowerupSlow(game, x, y, velocity) {
	Phaser.Sprite.call(this, game, x, y,'PowerupSlow');
	this.game = game;
	this.game.add.existing(this);
	
	this.captured = false;
	this.initialize(velocity);
}

PowerupSlow.prototype = Object.create(Phaser.Sprite.prototype);
PowerupSlow.prototype.constructor = PowerupSlow;

PowerupSlow.prototype.initialize = function(velocity) {
	this.game.physics.arcade.enable(this);
	this.immovable = true;
	this.checkWorldBounds = true;
	this.events.onOutOfBounds.add(this.destroyIfNotCaptured, this);

	this.body.setCircle(this.width / 2, 0, 0);
	this.body.velocity.y = velocity;

	this.createTweens();
}

PowerupSlow.prototype.createTweens = function() {
	this.tweens = {};
	this.tweens.disappear = this.game.add.tween(this);
	this.tweens.disappear.to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, false);
}

PowerupSlow.prototype.update = function() {
	this.game.physics.arcade.overlap(this, this.game.player, this.hit, null, this);
}

PowerupSlow.prototype.hit = function() {
	if (!this.captured) {
		this.captured = true;
		this.tweens.disappear.start();
		this.apply();
	}
}

PowerupSlow.prototype.destroyIfNotCaptured = function() {
	if (!this.captured) {
		this.destroy();
	}
}

PowerupSlow.prototype.apply = function() {
	this.game.player.body.velocity.x /= 1.5;
	this.game.time.events.repeat(Phaser.Timer.SECOND * 10, 1, this.cease, this);
}

PowerupSlow.prototype.cease = function() {
	this.game.player.body.velocity.x *= 1.5;
	this.destroy();
}