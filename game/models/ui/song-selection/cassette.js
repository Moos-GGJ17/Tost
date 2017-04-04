// Represents the cassette that is displayed in the song selection screen
// This cassette is reused when a song changes
function Cassette(game, x, y, filename) {
	Phaser.Sprite.call(this, game, x, y, filename + 'Cassette');
	this.game = game;

	this.cassetteDistance = this.width * 6 / 5;
	this.canSelectSong = true;
	this.initialize();
}

Cassette.prototype = Object.create(Phaser.Sprite.prototype);
Cassette.prototype.constructor = Cassette;

Cassette.prototype.initialize = function() {
	this.createTweens();
	this.inputEnabled = true;
}

// TODO: improve tween perfomance, don't create a new tween everytime
Cassette.prototype.createTweens = function() {
	this.tweens = {};
	//this.tweens.moveLeft = this.game.add.tween(this);
	//this.tweens.moveRight = this.game.add.tween(this);
	this.resetTweens();
}

Cassette.prototype.resetTweens = function() {
	//this.checkPosition();

	this.tweens.moveLeft = this.game.add.tween(this);
	this.tweens.moveLeft.to( {x : this.x - this.cassetteDistance }, 300, Phaser.Easing.Linear.None, false);
	this.tweens.moveLeft.onComplete.addOnce(this.notifyTweenEndToParent, this);

	this.tweens.moveRight = this.game.add.tween(this);
	this.tweens.moveRight.to( {x : this.x + this.cassetteDistance }, 300, Phaser.Easing.Linear.None, false);
	this.tweens.moveRight.onComplete.addOnce(this.notifyTweenEndToParent, this);
}

Cassette.prototype.notifyTweenEndToParent = function() {
	if (this.parent) {
		this.parent.enableInput();
	}
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

Cassette.prototype.updateImage = function(filename) {
	this.loadTexture(filename + 'Cassette');
}

Cassette.prototype.updateInputEvents = function(index) {
	this.events.onInputDown.remove(this.parentCallMoveLeft, this);
	this.events.onInputDown.remove(this.parentCallMoveRight, this);
	this.events.onInputUp.remove(this.parentCallSelectSong, this);

	switch (index) {
		case 3:
			this.events.onInputDown.add(this.parentCallMoveLeft, this);
			break;
		case 2:
			this.events.onInputUp.add(this.parentCallSelectSong, this);
			break;
		case 1:
			this.events.onInputDown.add(this.parentCallMoveRight, this);
			break;
	}
}

Cassette.prototype.parentCallMoveLeft = function() {
	this.parent.moveCassettesLeft();
	this.canSelectSong = false;
}

Cassette.prototype.parentCallMoveRight = function() {
	this.parent.moveCassettesRight();
	this.canSelectSong = false;
}

Cassette.prototype.parentCallSelectSong = function() {
	if (this.canSelectSong) {
		this.parent.selectSong();
	}
	this.canSelectSong = true;
}
