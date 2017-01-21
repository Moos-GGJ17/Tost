function NoteLight(game, parent) {
	Phaser.Sprite.call(this, game, parent.x, parent.y,'NoteLight');
	this.game = game;
	this.game.add.existing(this);

	this.parent = parent;
	this.tempo = parent.tempo;
	this.timer = this.game.time.create(false);
	this.initialize();
}

NoteLight.prototype = Object.create(Phaser.Sprite.prototype);
NoteLight.prototype.constructor = NoteLight;

NoteLight.prototype.initialize = function() {
	this.game.physics.arcade.enable(this);
	this.immovable = true;
	this.checkWorldBounds = true;
	this.events.onOutOfBounds.add(this.destroy, this);

	this.x = - (this.width - this.parent.width) / 2;
	this.y = - (this.height - this.parent.height) / 2;
	this.alpha = 0;
	//this.body.velocity.y = this.parent.initialVelocity;

	this.createTweens();
}

NoteLight.prototype.createTweens = function() {
	this.tweens = {};
	this.tweens.shine = this.game.add.tween(this);
	this.tweens.shine.to( { alpha: 0.5 }, 100, Phaser.Easing.Linear.None, false);

	this.tweens.hide = this.game.add.tween(this);
	this.tweens.hide.to( { alpha: 0 }, 100, Phaser.Easing.Linear.None, false);

	this.tweens.shine.onComplete.add(this.hide, this);

	/**var aux = this;
	setTimeout(function() {
		aux.timer.loop(aux.tempo - 200, aux.tweens.shine.start, aux);
	}, 100);*/
	this.timer.loop((this.tempo - 200)*2, this.shine, this);
	this.timer.start();
}

NoteLight.prototype.shine = function() {
	this.tweens.shine.start();
}

NoteLight.prototype.hide = function() {
	this.tweens.hide.start();
}