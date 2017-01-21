function ScoreWave(game, x, y, width, score, amplitude, color) {
	Phaser.Sprite.call(this, game, x, y,'Blank');
	this.game = game;
	this.game.add.existing(this);

	this.MAX_SCORE = score;
	this.score = this.MAX_SCORE;
	this.amplitude = amplitude;
	this.gameOver = false;
	this.color = '#e0e0e0';
	this.traceWidth = width;
	this.count = 5;
	this.initialize();
}

ScoreWave.prototype = Object.create(Phaser.Sprite.prototype);
ScoreWave.prototype.constructor = Player;

ScoreWave.prototype.initialize = function() {
	this.data = this.game.math.sinCosGenerator(this.game.width / 8, 1, 1, 10);

    //  Just so we can see the data
    this.bmd = this.game.add.bitmapData(this.game.width, this.game.height);
    this.bmd.addToWorld();

    this.timer = this.game.time.create(false);
    this.timer.repeat(0, 23, this.changeColorWithTime, this);
}

ScoreWave.prototype.update = function() {
	if (this.count > 4) {
		this.count = 0;
		this.bmd.clear();
		var currentWidth = 0;

		for (var i = 0; i < this.game.width; i++) {
			currentWidth = Math.floor(Math.random() * this.traceWidth) + 1;
	    	this.bmd.rect(i * 8,
	    		this.y + this.data.sin[i] * this.score * this.amplitude,
	    		currentWidth,
	    		currentWidth,
	    		this.color);
	    	this.bmd.rect(i * 8,
	    		this.y - this.data.sin[i] * this.score * this.amplitude,
	    		currentWidth,
	    		currentWidth,
	    		this.color);
	    }

	    Phaser.ArrayUtils.rotate(this.data.sin);
	} else {
		this.count++;
	}
	console.log(this.score);
}

ScoreWave.prototype.hitNote = function() {
	this.score += 0.1;
	this.score = Math.min(this.score, this.MAX_SCORE);
	this.game.chart.music.volume = this.score / this.MAX_SCORE;
}

ScoreWave.prototype.missNote = function() {
	this.timer.start();
	this.score = Math.max(--this.score, 0);
	if (this.score <= 0) {
		this.gameOver = true;
	}
	this.game.chart.music.volume = this.score / this.MAX_SCORE;
}

ScoreWave.prototype.changeColorWithTime = function() {
	if (this.count > 4) {
		this.changeColor();
	}
}

ScoreWave.prototype.changeColor = function() {
	switch (this.color) {
		case '#e0e0e0':
			this.color = '#ef5350';
			break;
		case '#ef5350':
			this.color = '#e0e0e0';
			break;
		default:
	}
}