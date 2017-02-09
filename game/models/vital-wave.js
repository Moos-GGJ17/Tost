function VitalWave(game, x, y) {
	Phaser.Sprite.call(this, game, x, y,'Blank');
	this.game = game;
	this.game.add.existing(this);

	this.AMPLITUDE = 5;
	this.MAX_TRACE_WIDTH = 15;
	this.ANIMATION_TIMEOUT = 100;
	this.WAVE_LENGTH = 16;
	this.WAVE_FREQUENCY = 10;

	this.color = PlayerData.COLORS_RGB.White;

	this.initialize();
}

VitalWave.prototype = Object.create(Phaser.Sprite.prototype);
VitalWave.prototype.constructor = Player;

VitalWave.prototype.initialize = function() {
	this.data = this.game.math.sinCosGenerator(this.game.width / this.WAVE_LENGTH, 1, 1, this.WAVE_FREQUENCY);

    this.bmd = this.game.add.bitmapData(this.game.width, this.game.height);
    this.bmd.addToWorld();

	this.game.time.events.loop(this.ANIMATION_TIMEOUT, this.redraw, this);
}

VitalWave.prototype.redraw = function() {
	this.bmd.clear();
	var currentWidth = 0;

	for (var i = 0; i < this.WAVE_LENGTH * this.WAVE_FREQUENCY; i++) {
		currentWidth = Math.floor(Math.random() * this.MAX_TRACE_WIDTH) + 1;
		this.bmd.rect(i * this.WAVE_LENGTH,
			this.y + this.data.sin[i] * this.game.player.life * this.AMPLITUDE,
			currentWidth,
			currentWidth,
			'rgb(' + this.color + ')');
		this.bmd.rect(i * this.WAVE_LENGTH,
			this.y - this.data.sin[i] * this.game.player.life * this.AMPLITUDE,
			currentWidth,
			currentWidth,
			'rgb(' + this.color + ')');
	}

	Phaser.ArrayUtils.rotate(this.data.sin);
}

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