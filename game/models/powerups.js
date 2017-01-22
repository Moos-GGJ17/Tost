function Powerups(game) {
	Phaser.Group.call(this, game);
	this.game = game;
	this.game.add.existing(this);
}

Powerups.prototype = Object.create(Phaser.Group.prototype);
Powerups.prototype.constructor = Powerups;