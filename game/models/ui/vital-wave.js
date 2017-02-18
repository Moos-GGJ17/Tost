// Graphic representation of player's life as a wave
function VitalWave(game, x, y) {
	Phaser.Sprite.call(this, game, x, y,'Blank');
	this.game = game;
	this.game.add.existing(this);

	// Wave data
	this.AMPLITUDE = 5;
	this.MAX_TRACE_WIDTH = 15;
	this.WAVE_LENGTH = 16;
	this.WAVE_FREQUENCY = 10;

	this.ANIMATION_TIMEOUT = 100; // Time in ms in which the wave will be redrawn

	this.color = PlayerData.COLORS_RGB.White;

	this.initialize();
}

VitalWave.prototype = Object.create(Phaser.Sprite.prototype);
VitalWave.prototype.constructor = Player;

VitalWave.prototype.initialize = function() {
	// Calulates sin based on the wave's length and frequency
	this.data = this.game.math.sinCosGenerator(this.game.width / this.WAVE_LENGTH, 1, 1, this.WAVE_FREQUENCY);

	// Bitmapdata where the wave will be drawn
    this.bmd = this.game.add.bitmapData(this.game.width, this.game.height);
    this.bmd.addToWorld();

	// Redraw the wave each ANIMATION_TIMEOUT ms
	this.game.time.events.loop(this.ANIMATION_TIMEOUT, this.redraw, this);
}

VitalWave.prototype.redraw = function() {
	this.bmd.clear(); // Removes wave graphics

	var currentWidth = 0; // Wave is drawn with squares, this represents the current square width, used in the loop

	// Draw two out-of-phase waves covering all the screen horizontally
	for (var i = 0; i < this.WAVE_LENGTH * this.WAVE_FREQUENCY; i++) {
		currentWidth = Math.floor(Math.random() * this.MAX_TRACE_WIDTH) + 1; // Random width between 1 and MAX_TRACE_WIDTH
		this.bmd.rect(i * this.WAVE_LENGTH, // x
			this.y + this.data.sin[i] * this.game.player.life * this.AMPLITUDE, // y
			currentWidth, // width
			currentWidth, // height
			'rgb(' + this.color + ')'); // color
		this.bmd.rect(i * this.WAVE_LENGTH, // x
			this.y - this.data.sin[i] * this.game.player.life * this.AMPLITUDE, // y
			currentWidth, // width
			currentWidth, // height
			'rgb(' + this.color + ')'); // color
	}

	// Rotate the array of sin values, to simulate the wave movement each time the waves are drawn
	Phaser.ArrayUtils.rotate(this.data.sin);
}

// Switch wave color to red then to white, when a note is missed
VitalWave.prototype.missNote = function() {
	this.game.time.events.repeat(Phaser.Timer.SECOND / 4, 2, this.switchColorsBetweenRedAndWhite, this);
}

VitalWave.prototype.switchColorsBetweenRedAndWhite = function() {
	if (this.color === PlayerData.COLORS_RGB['White']) {
		this.color = PlayerData.COLORS_RGB['Red'];
	} else {
		this.color = PlayerData.COLORS_RGB['White'];
	}
}