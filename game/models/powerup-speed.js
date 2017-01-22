function PowerupSlow(game, x, y) {
	Phaser.Sprite.call(this, game, x, y,'PowerupSlow');
	this.game = game;
	this.game.add.existing(this);
	
	this.initialize(x, y);
}

PowerupSlow.prototype = Object.create(Phaser.Sprite.prototype);
PowerupSlow.prototype.constructor = PowerupSlow;