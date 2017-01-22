function VitalWave(game, x, y, width, life, amplitude, color) {
	Phaser.Sprite.call(this, game, x, y,'Blank');
	this.game = game;
	this.game.add.existing(this);

	this.MAX_LIFE = life;
	this.life = this.MAX_LIFE;
	this.amplitude = amplitude;
	this.gameOver = false;
	this.color = '#e0e0e0';
	this.traceWidth = width;
	this.count = 5;
	this.initialize();
}

VitalWave.prototype = Object.create(Phaser.Sprite.prototype);
VitalWave.prototype.constructor = Player;

VitalWave.prototype.initialize = function() {
	this.data = this.game.math.sinCosGenerator(this.game.width / 8, 1, 1, 10);

    //  Just so we can see the data
    this.bmd = this.game.add.bitmapData(this.game.width, this.game.height);
    this.bmd.addToWorld();

    /*this.timer = this.game.time.create(false);
    this.timer.repeat(500, 4, this.changeColor, this);*/
}

VitalWave.prototype.update = function() {
	if (this.count > 4) {
		this.count = 0;
		this.bmd.clear();
		var currentWidth = 0;

		for (var i = 0; i < this.game.width; i++) {
			currentWidth = Math.floor(Math.random() * this.traceWidth) + 1;
	    	this.bmd.rect(i * 8,
	    		this.y + this.data.sin[i] * this.life * this.amplitude,
	    		currentWidth,
	    		currentWidth,
	    		this.color);
	    	this.bmd.rect(i * 8,
	    		this.y - this.data.sin[i] * this.life * this.amplitude,
	    		currentWidth,
	    		currentWidth,
	    		this.color);
	    }

	    Phaser.ArrayUtils.rotate(this.data.sin);
	} else {
		this.count++;
	}
}

VitalWave.prototype.hitNote = function() {
	this.life += 0.1;
	this.life = Math.min(this.life, this.MAX_LIFE);
	this.game.chart.music.volume = this.life / this.MAX_LIFE;
}

VitalWave.prototype.missNote = function() {
	//this.timer.start();
	this.game.time.events.repeat(Phaser.Timer.SECOND / 4, 2, this.changeColor, this);
	this.life = Math.max(--this.life, 0);
	if (this.life <= 0) {
		this.playGameOverMusic();
		this.gameOver = true;
	}
	this.game.chart.music.volume = this.life / this.MAX_LIFE;
}

VitalWave.prototype.playGameOverMusic = function() {
	if (!this.gameOver) {
		this.gameOver = true;
		this.game.add.audio('lost').play();
	}
}

VitalWave.prototype.changeColor = function() {
	switch (this.color) {
		case '#e0e0e0':
			this.color = '#ef5350';
			break;
		case '#ef5350':
			this.color = '#e0e0e0';
			break;
		default:
	}
	if (this.game.chart.music.volume > 0) {
		this.game.chart.music.volume = 0;
	} else {
		this.game.chart.music.volume = this.life / this.MAX_LIFE;
	}
}