// Represents a toast that has no color at the start, it's colored later based on the score
function Toast(game, x, y) {
	Phaser.Sprite.call(this, game, x, y,'ToastGray');
	this.game = game;
	this.game.add.existing(this);
}

Toast.prototype = Object.create(Phaser.Sprite.prototype);
Toast.prototype.constructor = Toast;

// Changes the sprite texture, so it has color
Toast.prototype.color = function() {
	this.loadTexture('ToastColor');
}

// Changes the sprite texture, so it's a golden toast
Toast.prototype.gold = function() {
	this.loadTexture('ToastGold');
}
