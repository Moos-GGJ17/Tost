function Tosted(game) {
	Phaser.Sprite.call(this, game, game.world.width / 2, 0,'Tosted');
	this.game = game;
	this.game.add.existing(this);
	this.anchor.setTo(0.5, 0.5);
	//this.x += this.width / 2;
	this.y += - this.height;
	this.createTweens();
}

Tosted.prototype = Object.create(Phaser.Sprite.prototype);
Tosted.prototype.constructor = Tosted;

Tosted.prototype.createTweens = function() {
	this.tweens = {};
	this.tweens.center = this.game.add.tween(this);
	this.tweens.center.to( { x : this.game.world.width / 2, y : this.game.world.height / 2 - this.height * 2 / 3}, 500, Phaser.Easing.Linear.None, false);
	this.tweens.center.onComplete.add(this.enableInput, this);
}

Tosted.prototype.center = function() {
	this.tweens.center.start();
}

Tosted.prototype.restartGame = function() {
	this.game.chart.music.stop();
	this.game.state.start('Play');
}

Tosted.prototype.enableInput = function() {
	this.restartButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	this.restartButton.onDown.add(this.restartGame, this);
}