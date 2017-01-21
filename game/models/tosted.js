function Tosted(game, x, y, velocity) {
	Phaser.Sprite.call(this, game, x, y,'Tosted');
	this.game = game;
	this.game.add.existing(this);
}

Tosted.prototype = Object.create(Phaser.Sprite.prototype);
Tosted.prototype.constructor = Tosted;