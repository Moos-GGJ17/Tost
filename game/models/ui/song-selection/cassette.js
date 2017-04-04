// Represents the cassette that is displayed in the song selection screen
// This cassette is reused when a song changes
function Cassette(game, x, y) {
	Phaser.Sprite.call(this, game, x, y, 'PumpedUpKicksCassette');
	this.game = game;

	this.cassetteDistance = this.width * 6 / 5;

	this.initialize();
}

Cassette.prototype = Object.create(Phaser.Sprite.prototype);
Cassette.prototype.constructor = Cassette;

Cassette.prototype.initialize = function() {
	this.createTweens();
}

// TODO: improve tween perfomance, don't create a new tween everytime
Cassette.prototype.createTweens = function() {
	this.tweens = {};
	//this.tweens.moveLeft = this.game.add.tween(this);
	//this.tweens.moveRight = this.game.add.tween(this);
	this.resetTweens();
}

Cassette.prototype.resetTweens = function() {
	this.checkPosition();
	
	this.tweens.moveLeft = this.game.add.tween(this);
	this.tweens.moveLeft.to( {x : this.x - this.cassetteDistance }, 300, Phaser.Easing.Linear.None, false);
	this.tweens.moveLeft.onComplete.addOnce(this.resetTweens, this);

	this.tweens.moveRight = this.game.add.tween(this);
	this.tweens.moveRight.to( {x : this.x + this.cassetteDistance }, 300, Phaser.Easing.Linear.None, false);
	this.tweens.moveRight.onComplete.addOnce(this.resetTweens, this);
}

Cassette.prototype.checkPosition = function() {
	if (this.x < 0) {
		this.x = this.cassetteDistance * 4;
	}
	if (this.x > this.cassetteDistance * 4) {
		this.x = 0;
	}
}

Cassette.prototype.moveLeft = function() {
	this.tweens.moveLeft.start();
}

Cassette.prototype.moveRight = function() {
	this.tweens.moveRight.start();
}

Cassette.prototype.updateImage = function() {
	this.loadTexture(this.songFilename + 'Cassette');
}
