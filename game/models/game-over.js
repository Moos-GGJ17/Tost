function GameOver(game, x, y) {
	Phaser.Sprite.call(this, game, x, y,'GameOver');
	this.game = game;
	this.game.add.existing(this);
	
	this.initialize(x, y);
}

GameOver.prototype = Object.create(Phaser.Sprite.prototype);
GameOver.prototype.constructor = GameOver;

GameOver.prototype.initialize = function(x, y) {
	this.anchor.setTo(0.5, 0.5);
	this.y = -this.height / 2;
	this.createTweens(x, y);
}

GameOver.prototype.createTweens = function(x, y) {
	this.tweens = {};
	this.tweens.show = this.game.add.tween(this);
	this.tweens.show.to( { 'x': x, 'y': y }, 2000, Phaser.Easing.Linear.None, false);
}

GameOver.prototype.show = function() {
	this.tweens.show.start();
	this.restartButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	this.restartButton.onDown.add(this.restartGame, this);
}

GameOver.prototype.restartGame = function() {
	this.game.chart.music.stop();
	this.game.state.start('Play');
}