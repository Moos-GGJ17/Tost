// Represents the ball that catches the notes
function Player(game, x, y, velocity) {
	Phaser.Sprite.call(this, game, x, y,'PlayerWhite');
	this.game = game;
	this.game.add.existing(this);

	this.defaultHorizontalVelocity = velocity;
	this.hasPowerup = false;
	this.lastColor = 'White'; // To recover the last color after the powerup effect ceases
	this.life = PlayerData.MAX_LIFE;
	this.score = 0;

	// Used to save the last x-positions of the player, to draw the trace
	this.xPositionsHistory = [];
	for (var i = 0; i < this.game.height - y; i++) {
		this.xPositionsHistory[i] = x;
	}

	this.initialize();
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.initialize = function() {
	// Basic Arcade physics configuration
	this.game.physics.arcade.enable(this);
	this.immovable = true; // Don't receive impacts from other bodies
	this.body.setCircle(this.width / 2, 0, 0); // Circular body with the same size as the sprite
	this.body.velocity.x = this.defaultHorizontalVelocity;

	this.initializeBottomLine();
	this.initializeInput();

	this.trace = new PlayerTrace(this.game, this, this.lastColor);    
    this.game.world.bringToTop(this); // Ball on top of trace
}

Player.prototype.initializeBottomLine = function() {
	// Creates a line just below the sprite, so we can check if a note can't be reached by the
	// player anymore
	this.bottomLine = this.game.add.sprite(0, this.height * 2 + this.y, 'Blank');
	this.bottomLine.scale.x = this.game.width;
	this.game.physics.arcade.enable(this.bottomLine);
	this.immovable = true; // Don't receive impacts from other bodies
}

// Change direction by pressing space or by clicking/touching
Player.prototype.initializeInput = function() {
	this.changeDirectionButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	this.changeDirectionButton.onDown.add(this.changeDirection, this); // spacebar
	this.game.input.onDown.add(this.changeDirection, this); // touch/click
}

Player.prototype.update = function() {
	this.trace.update();

	// Warp at the left/right borders of the screen
    if (this.x + this.width < 0) {
    	this.x = this.game.width;
    }
    if (this.x > this.game.width) {
    	this.x = - this.width;
    }

	// Disable input and make the player move up if the game has ended
    if (this.game.chart.gameHasEnded()) {
    	this.changeDirectionButton.onDown.remove(this.changeDirection, this);
		this.game.input.onDown.remove(this.changeDirection, this);
    	this.body.velocity.x = 0;
    	this.body.velocity.y = -1000;
    }
}

Player.prototype.changeDirection = function() {
	this.body.velocity.x *= -1;
}

/*Player.prototype.changeDirectionTouch = function() {
	if (this.game.input.activePointer == this.game.input.pointer1) {
		this.body.velocity.x *= -1;
	}
}*/

Player.prototype.changeColor = function(color) {
	this.lastColor = color; // Save last color in case that player catches a powerup
	
	// Change player sprite and trace color if the player doesn't have a powerup
	if (!this.hasPowerup) {
		this.loadTexture('Player' + color);
		this.trace.changeColor(color);
	}
}

Player.prototype.setPowerupSpriteAndColor = function(powerup, color) {
	this.loadTexture(powerup);
	this.trace.changeColor(color);
	this.hasPowerup = true;
}

Player.prototype.removePowerupSpriteAndColor = function() {
	this.hasPowerup = false;
	this.loadTexture('Player' + this.lastColor);
	this.trace.changeColor(this.lastColor);
}

Player.prototype.increaseLifeBy = function(amountToIncrease) {
	this.life += amountToIncrease;
	this.life = Math.min(this.life, PlayerData.MAX_LIFE);
}

Player.prototype.decreaseLifeBy = function(amountToDecrease) {
	this.life -= amountToDecrease;
	if (this.life <= 0) {
		this.game.chart.lose();
	}
}

Player.prototype.increaseScoreBy = function(amountToIncrease) {
	this.score += amountToIncrease;
}

Player.prototype.calculateLifePercentage = function() {
	return this.life / PlayerData.MAX_LIFE;
}

Player.prototype.debug = function() {
	this.game.debug.body(this);
	this.game.debug.body(this.bottomLine);
}