// JSON that contains the apply and cease methods for all the types of powerups
PowerupTypes = {};

//======================FAST POWERUP======================
PowerupTypes.fast = {};

PowerupTypes.fast.apply = function() {
	this.game.player.setPowerupSpriteAndColor(this.key, 'Yellow'); // Changes player 'head' sprite to the same as the powerup
	this.game.player.body.velocity.x *= 2; // Increases player speed
	this.game.time.events.add(Phaser.Timer.SECOND * 10, this.cease, this); // Effects cease after 10 seconds
}

PowerupTypes.fast.cease = function() {
	if (this.game && this.game.player) {
		this.game.player.body.velocity.x /= 2; // Decreases player speed
		this.game.player.removePowerupSpriteAndColor(); // Remove powerup sprite from player
	}
	this.destroy();
}

//=====================SLOW POWERUP=======================
PowerupTypes.slow = {};

PowerupTypes.slow.apply = function() {
	this.game.player.setPowerupSpriteAndColor(this.key, 'Blue'); // Changes player 'head' sprite to the same as the powerup
	this.game.player.body.velocity.x /= 2; // Increases player speed
	this.game.time.events.repeat(Phaser.Timer.SECOND * 10, 1, this.cease, this); // Effects cease after 10 seconds
}

PowerupTypes.slow.cease = function() {
	if (this.game && this.game.player) {
		this.game.player.removePowerupSpriteAndColor(); // Decreases player speed
		this.game.player.body.velocity.x *= 2; // Remove powerup sprite from player
	}
	this.destroy();
}

// Save the count of types after creating all of them
PowerupTypes.count = Object.keys(PowerupTypes).length;