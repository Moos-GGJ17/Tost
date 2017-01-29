function Note(game, x, y, velocity, tempo, color) {
	Phaser.Sprite.call(this, game, x, y,'Note' + color);
	this.game = game;
	this.game.add.existing(this);

	this.tuned = false;
	this.fail = false;
	this.color = color;
	this.tempo = tempo;
	this.initialVelocity = velocity;
	this.initialize();
}

Note.prototype = Object.create(Phaser.Sprite.prototype);
Note.prototype.constructor = Note;

Note.prototype.initialize = function() {
	this.game.physics.arcade.enable(this);
	this.immovable = true;
	this.checkWorldBounds = true;
	this.events.onOutOfBounds.add(this.remove, this);

	this.body.setCircle(this.width / 2, 0, 0);
	this.body.velocity.y = this.initialVelocity;

	this.light = new NoteLight(this.game, this);
	this.game.world.bringToTop(this);
}

Note.prototype.update = function() {
	this.game.physics.arcade.overlap(this, this.game.player, this.hit, null, this);
	this.game.physics.arcade.overlap(this, this.game.player.bottomLine, this.missed, null, this);
	if (this.tuned) {
		this.alpha -= 0.04;
	}
	if (this.alpha <= 0) {
		//this.light.destroy();
		//this.destroy();
		this.remove();
	}
}

Note.prototype.hit = function() {
	if (!this.tuned) {
		this.game.player.changeColor(this.color);
		this.changeColorToWhite();
		this.tuned = true;
		this.game.vitalWave.hitNote();
		this.game.toasts.increaseScore();
	}
	//this.destroy();
}

Note.prototype.missed = function() {
	if (!this.tuned && !this.fail) {
		this.game.vitalWave.missNote();
		this.fail = true;
		this.game.chart.errorAudio.play();
		this.changeColorToWhite();
		//this.light.destroy();
		//this.destroy();
	}
}

Note.prototype.changeColorToWhite = function() {
	this.loadTexture('NoteWhite');
}

Note.prototype.remove = function() {
	this.light.destroy();
	this.destroy();
}

Note.prototype.debug = function() {
	this.game.debug.body(this);
}