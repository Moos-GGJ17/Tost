// Light that each note of the chart have, shines based on the tempo
function NoteLight(game, parent) {
	Phaser.Sprite.call(this, game, parent.x, parent.y,'NoteLight');
	this.game = game;
	this.game.add.existing(this);

	this.parent = parent; // Note that contains this light
	//this.timer = this.game.time.create(false);
	this.initialize();
}

NoteLight.prototype = Object.create(Phaser.Sprite.prototype);
NoteLight.prototype.constructor = NoteLight;

NoteLight.prototype.initialize = function() {
	// Arcade physics basic configuration, doesn't need to check collisions
	this.game.physics.arcade.enable(this);
	this.immovable = true;

	// Destroy when out of bounds
	this.checkWorldBounds = true;
	this.events.onOutOfBounds.add(this.destroy, this);

	// Centers the light with the note
	this.x = - (this.width - this.parent.width) / 2;
	this.y = - (this.height - this.parent.height) / 2;
	
	// Light starts hidden
	this.alpha = 0;

	this.createTweens();
	this.shine();
}

NoteLight.prototype.createTweens = function() {
	this.tweens = {};
	this.tweens.shine = this.game.add.tween(this);
	this.tweens.shine.to( { alpha: 0.8 }, 200, Phaser.Easing.Linear.None, false);

	this.tweens.hide = this.game.add.tween(this);
	this.tweens.hide.to( { alpha: 0 }, 800, Phaser.Easing.Linear.None, false);

	// Hide/dark the light after it shines
	this.tweens.shine.onComplete.addOnce(this.hide, this);
	this.tweens.hide.onComplete.addOnce(this.deepDestroy, this);

	// Starts a loop that shines the light based on the tempo
	//this.timer.loop(this.parent.tempo, this.shine, this);
	//this.timer.start();
}

NoteLight.prototype.shine = function() {
	this.tweens.shine.start();
}

NoteLight.prototype.hide = function() {
	this.tweens.hide.start();
}

NoteLight.prototype.deepDestroy = function() {
	this.tweens = {};
	this.destroy();
}