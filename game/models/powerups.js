function Powerups(game) {
	Phaser.Group.call(this, game);
	this.game = game;
	this.game.add.existing(this);

	this.timer = this.game.time.create(false);
	this.timer.loop(Phaser.Timer.SECOND * 15, this.createRandom, this);
	this.timer.start();
}

Powerups.prototype = Object.create(Phaser.Group.prototype);
Powerups.prototype.constructor = Powerups;

Powerups.prototype.createRandom = function() {
	var type = Math.floor(Math.random() * 1);
	var x = Math.random() * this.game.width * 3 / 4 + this.game.width / 8;
	var velocity = Math.random() * 50 + this.game.chart.velocity - 25;
	var powerup;

	console.log('Creating powerup' + type);

	switch (type) {
		case 0:
			powerup = new PowerupSlow(this.game, x, 0, velocity);
			break;
		case 1:
			powerup = new PowerupFast(this.game, x, 0, velocity);
			break;
		default:
			powerup = new PowerupSlow(this.game, x, 0, velocity);
	}

	this.add(powerup);
}

Powerups.prototype.update = function() {
	this.callAll('update');
}

Powerups.prototype.stop = function() {
	this.timer.stop();
}