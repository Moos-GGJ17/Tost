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
	//this.scale.setTo(2, 2);
	this.y = -this.height / 2;
	this.createTweens(x, y);

	/*this.pressSpace = this.game.add.sprite(this.game.world.width / 2, this.game.world.height / 2, 'Space');
	this.pressSpace.anchor.setTo(0.5, 0.5);
	this.pressSpace.animations.add('Press');
	this.pressSpace.animations.play('Press', 3, true);*/
}

GameOver.prototype.createTweens = function(x, y) {
	this.tweens = {};
	this.tweens.show = this.game.add.tween(this);
	this.tweens.show.to( { 'x': x, 'y': y }, 2000, Phaser.Easing.Linear.None, false);
	this.tweens.show.onComplete.add(this.enableInput, this);
}

GameOver.prototype.show = function() {
	this.tweens.show.start();
}

GameOver.prototype.restartGame = function() {
	if ((this.game.input.activePointer == this.game.input.pointer1) || this.restartButton.isDown) {
		this.game.chart.music.stop();
		this.restartButton.onDown.remove(this.restartGame, this);
		this.game.input.onDown.remove(this.restartGame, this);
		//this.pressSpace.destroy();
		this.game.pressSpace.alpha = 0;
		this.game.autoPlay = true;
		this.game.state.start('Play');
		//this.game.state.start('Intro');
	}
}

GameOver.prototype.enableInput = function() {
	this.restartButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	this.restartButton.onDown.add(this.restartGame, this);
	this.game.input.onDown.add(this.restartGame, this);
	this.game.pressSpace.alpha = 1;
}