function ScoreWave(game, x, y, width, score, amplitude, color) {
	Phaser.Sprite.call(this, game, x, y,'Blank');
	this.game = game;
	this.game.add.existing(this);

	this.MAX_SCORE = score;
	this.score = this.MAX_SCORE;
	this.amplitude = amplitude;
	this.gameOver = false;
	this.color = color;
	this.traceWidth = width;
	this.initialize();
	this.count = 5;
}

ScoreWave.prototype = Object.create(Phaser.Sprite.prototype);
ScoreWave.prototype.constructor = Player;

ScoreWave.prototype.initialize = function() {
	this.data = this.game.math.sinCosGenerator(this.game.width / 8, 1, 1, 10);

    //  Just so we can see the data
    this.bmd = this.game.add.bitmapData(this.game.width, this.game.height);
    this.bmd.addToWorld();
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
}

ScoreWave.prototype.hitNote = function() {
	this.score = Math.min(++this.score, this.MAX_SCORE);
}

ScoreWave.prototype.missNote = function() {
	this.score = Math.max(--this.score, 0);
	if (this.score <= 0) {
		this.gameOver = true;
	}
}