function Note(game, x, y, velocity, color) {
	Phaser.Sprite.call(this, game, x, y,'Note' + color);
	this.game = game;
	this.game.add.existing(this);

	this.tuned = false;
	this.color = color;
	this.initialVelocity = velocity;
	this.initialize();
}

Note.prototype = Object.create(Phaser.Sprite.prototype);
Note.prototype.constructor = Player;

Note.prototype.initialize = function() {
	this.game.physics.arcade.enable(this);
	this.immovable = true;
	this.checkWorldBounds = true;
	this.events.onOutOfBounds.add(this.missed, this);

	this.body.setCircle(this.width / 2, 0, 0);
	this.body.velocity.y = this.initialVelocity;
}

Note.prototype.update = function() {
	this.game.physics.arcade.overlap(this, this.game.player, this.hit, null, this);
	if (this.tuned) {
		this.alpha -= 0.04;
	}
	if (this.alpha <= 0) {
		this.destroy();
	}
}

Note.prototype.hit = function() {
	//TO DO: scoring
	this.game.player.changeColor(this.color);
	this.loadTexture('NoteWhite');
	this.tuned = true;
	//this.destroy();
}

Note.prototype.missed = function() {
	//TO DO: scoring
	this.destroy();
}

Note.prototype.debug = function() {
	this.game.debug.body(this);
}