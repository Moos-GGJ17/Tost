function Player(game, x, y, velocity) {
	Phaser.Sprite.call(this, game, x, y,'Player');
	this.game = game;
	this.game.add.existing(this);

	this.initialVelocity = velocity;
	this.direction = (velocity > 0) ? 1 : -1; // 1:RIGHT, -1:LEFT
	this.initialize();
	this.history = [];
	for (var i = 0; i < this.game.height - y; i++) {
		history[i] = x;
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

	/*this.scale.x = 0.5;
	this.scale.y = 0.5;*/

	this.changeDirectionButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	this.changeDirectionButton.onDown.add(this.changeDirection, this);

	this.trace = {};
	this.trace.data = this.game.math.sinCosGenerator((this.game.height - this.y) * 2, (this.game.height - this.y), 1, 1);
	console.log(this.game.height - this.y);
	console.log(this.trace.data);

    //  Just so we can see the data
    this.trace.bmd = this.game.add.bitmapData(this.game.width, this.game.height);
    this.trace.bmd.addToWorld();
}

Player.prototype.update = function() {
	this.trace.bmd.clear();
	//this.trace.data = this.game.math.sinCosGenerator((this.game.height - this.y) * 2, this.game.height - this.y, 1, 1);
    for (var i = this.game.height - this.y; i >= 0; i--) {
    	if (i > 1) {
    		this.history[i] = this.history[i - 1];
    	} else {
    		this.history[i] = this.x;
    	}

    	this.trace.bmd.rect(this.width / 4 + this.history[i],
    		this.width / 2 + this.y + this.trace.data.sin[this.game.height - this.y - i],
    		(this.width / 2) - i * this.width / 2 / (this.game.height - this.y),
    		(this.width / 2) - i * this.width / 2 / (this.game.height - this.y),
    		'rgba(255, 255, 255, ' + (0.8 - i / (this.game.height - this.y)));
    }

    Phaser.ArrayUtils.rotate(this.trace.data.cos);
}

Player.prototype.changeDirection = function() {
	this.body.velocity.x *= -1;
}

Player.prototype.debug = function() {
	this.game.debug.body(this);
}