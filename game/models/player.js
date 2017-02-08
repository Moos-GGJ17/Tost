function Player(game, x, y, velocity) {
	Phaser.Sprite.call(this, game, x, y,'WaveWhite');
	this.game = game;
	this.game.add.existing(this);

	this.initialVelocity = velocity;
	this.direction = (velocity > 0) ? 1 : -1; // 1:RIGHT, -1:LEFT
	this.initialize();
	this.history = [];
	for (var i = 0; i < this.game.height - y; i++) {
		history[i] = x;
	}

	this.hasPowerup = false;
	this.lastColor;

	this.TRACE_COLORS = {
		'Blue': '41, 98, 255',
		'Cyan': '13, 115, 119',
		'Gray': '117, 117, 117',
		'Purple': '131, 68, 150',
		'Red': '239, 83, 80',
		'Yellow': '255, 206, 62'
	}
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.initialize = function() {
	this.game.physics.arcade.enable(this);
	this.immovable = true;
	this.checkWorldBounds = true;

	this.body.setCircle(this.width / 2, 0, 0);
	this.body.velocity.x = this.initialVelocity;

	this.bottomLine = this.game.add.sprite(0, this.height * 2 + this.y, 'Blank');
	this.bottomLine.scale.x = this.game.width;
	this.game.physics.arcade.enable(this.bottomLine);

	/*this.scale.x = 0.5;
	this.scale.y = 0.5;*/

	this.changeDirectionButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	this.changeDirectionButton.onDown.add(this.changeDirection, this);
	this.game.input.onDown.add(this.changeDirectionTouch, this);

	this.trace = {};
	this.trace.color = '224, 224, 224';
	this.trace.data = this.game.math.sinCosGenerator((this.game.height - this.y) * 2, (this.game.height - this.y), 1, 1);
	//console.log(this.game.height - this.y);
	//console.log(this.trace.data);

    //  Just so we can see the data
    this.trace.bmd = this.game.add.bitmapData(this.game.width, this.game.height);
    this.trace.bmd.addToWorld();
    //this.game.playerTrace.add(this.trace.bmd);
    
    this.game.world.bringToTop(this);
}

Player.prototype.update = function() {
	this.trace.bmd.clear();
	//this.trace.data = this.game.math.sinCosGenerator((this.game.height - this.y) * 2, this.game.height - this.y, 1, 1);
    if (!this.game.vitalWave.gameOver) {
	    for (var i = this.game.height - this.y; i >= 0; i--) {
	    	if (i > 1) {
	    		this.history[i] = this.history[i - 1];
	    	} else {
	    		this.history[i] = this.x;
	    	}

	    	this.trace.bmd.rect(this.width / 4 + this.history[i],
	    		this.width / 3 + this.y + this.trace.data.sin[this.game.height - this.y - i],
	    		(this.width * 3 / 5) - i * this.width * 3 / 5 / (this.game.height - this.y),
	    		(this.width * 3 / 5) - i * this.width * 3 / 5 / (this.game.height - this.y),
	    		'rgba(' + this.trace.color + ', ' + (0.8 - i / (this.game.height - this.y)));
	    }
	}

    if (this.x + this.width < 0) {
    	this.x = this.game.width;
    }
    if (this.x > this.game.width) {
    	this.x = - this.width;
    }

    if (this.game.vitalWave.gameOver || this.game.toasts.finished) {
    	this.changeDirectionButton.onDown.remove(this.changeDirection, this);
		this.game.input.onDown.remove(this.changeDirection, this);
    	this.body.velocity.x = 0;
    	this.body.velocity.y = -1000;
    }

    //Phaser.ArrayUtils.rotate(this.trace.data.cos);
    //console.log(this.x);
}

Player.prototype.changeDirection = function() {
	this.body.velocity.x *= -1;
}

Player.prototype.changeDirectionTouch = function() {
	if (this.game.input.activePointer == this.game.input.pointer1) {
		this.body.velocity.x *= -1;
	}
}

Player.prototype.changeColor = function(color) {
	this.lastColor = color;
	if (!this.hasPowerup) {
		this.loadTexture('Wave' + color);
		this.trace.color = this.TRACE_COLORS[color];
	}
}

Player.prototype.setPowerup = function(powerup, color) {
	this.loadTexture(powerup);
	this.trace.color = this.TRACE_COLORS[color];
	this.hasPowerup = true;
}

Player.prototype.removePowerup = function() {
	this.hasPowerup = false;
	this.loadTexture('Wave' + this.lastColor);
	this.trace.color = this.TRACE_COLORS[this.lastColor];
}

Player.prototype.debug = function() {
	this.game.debug.body(this);
	this.game.debug.body(this.bottomLine);
}