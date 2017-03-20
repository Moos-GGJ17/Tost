// Represents a chart note that the player must catch.
function Note(game, x, y, velocity, tempo, color) {
	Phaser.Sprite.call(this, game, x, y,'Note' + color);
	this.game = game;
	this.game.add.existing(this);

	this.isTuned = false; // True if player catched it
	this.isLost = false; // True if player can't catch it anymore
	this.color = color;
	this.tempo = tempo;
	this.defaultVelocity = velocity;
	this.initialize();
}

Note.prototype = Object.create(Phaser.Sprite.prototype);
Note.prototype.constructor = Note;

Note.prototype.initialize = function() {
	// Arcade physics basic configuration
	this.game.physics.arcade.enable(this);
	this.immovable = true;
	this.body.setCircle(this.width / 2, 0, 0); // Circular body with same size as the sprite
	this.body.velocity.y = this.defaultVelocity;

	this.light = new NoteLight(this.game, this); // Light that blinks based on tempo
	this.game.world.bringToTop(this); // Bring note in top of light

	// Destroy when out of bounds
	this.checkWorldBounds = true;
	this.events.onOutOfBounds.add(this.deepDestroy, this);

	this.createTweens();
}

Note.prototype.createTweens = function() {
	this.tweens = {};

	// Smoothly disappear from screen in 500 ms, and then destroy the note
	this.tweens.disappear = this.game.add.tween(this);
	this.tweens.disappear.to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, false);
	this.tweens.disappear.onComplete.add(this.deepDestroy, this);
}

Note.prototype.update = function() {
	// Check for collision with player
	this.game.physics.arcade.overlap(this, this.game.player, this.playerHit, null, this);
	//Check if player can't catch it no more
	this.game.physics.arcade.overlap(this, this.game.player.bottomLine, this.miss, null, this);
}

Note.prototype.playerHit = function() {
	if (!this.isTuned) {
		// Mark note as tuned and start the tween to destroy it
		this.isTuned = true;
		this.changeColorToWhite();
		this.tweens.disappear.start();

		this.game.player.changeColor(this.color); // Player changes it's head color based on the hit note
		this.game.player.increaseLifeBy(ChartData.LIFE_GAIN_WHEN_NOTE_HIT); // Increase player life
		this.game.chart.setVolume(this.game.player.calculateLifePercentage()); // Change song volume
		this.game.player.increaseScoreBy(ChartData.SCORE_TO_INCREASE_WHEN_NOTE_HIT); // Increase player score
		this.game.chart.hitNote(); // Increase number of notes hit by 1
	}
}

// Player can't catch the note no more
Note.prototype.miss = function() {
	if (!this.isTuned && !this.isLost) {
		// Mark note as lost
		this.isLost = true;
		this.changeColorToWhite();
		this.game.chart.errorAudio.play();
		
		this.game.vitalWave.missNote(); // Notify vital wave of note miss
		this.game.chart.missNote();
		this.game.player.decreaseLifeBy(ChartData.LIFE_LOSS_WHEN_NOTE_MISS); // Decrease player life
		this.game.chart.setVolume(this.game.player.calculateLifePercentage()); // Change song volume
	}
}

Note.prototype.changeColorToWhite = function() {
	this.loadTexture('NoteWhite');
}

// Destroys the note and it's respective light
Note.prototype.deepDestroy = function() {
	this.light.destroy();
	this.destroy();
}

Note.prototype.debug = function() {
	this.game.debug.body(this);
}