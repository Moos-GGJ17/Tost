function Player(game, x, y, velocity) {
	Phaser.Sprite.call(this, game, x, y,'Player');
	this.game = game;
	this.game.add.existing(this);

	this.initialVelocity = velocity;
	this.initialize();
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.initialize = function() {
	this.game.physics.arcade.enable(this);
	this.immovable = true;
	this.checkWorldBounds = true;


	this.body.setCircle(this.width / 2, 0, 0);
	this.body.velocity.x = this.initialVelocity;

	this.changeDirectionButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	this.changeDirectionButton.onDown.add(this.changeDirection, this);
}

Player.prototype.update = function() {

}

Player.prototype.changeDirection = function() {
	this.body.velocity.x *= -1;
}

Player.prototype.debug = function() {
	this.game.debug.body(this);
}