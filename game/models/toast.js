function Toasts(game, x, y, score) {
	Phaser.Group.call(this, game);
	this.x = x;
	this.y = y;
	this.game = game;
	this.game.add.existing(this);
	this.createToasts();
	this.MAX_SCORE = score;
	this.score = 0;
	this.finished = false;
	this.createTweens();
}

Toasts.prototype = Object.create(Phaser.Group.prototype);
Toasts.prototype.constructor = Toasts;

Toasts.prototype.createToasts = function() {
	this.first = new Toast(this.game, 0, 0);
	this.first.x = - this.first.width * 3 / 2 - 10;
	this.second = new Toast(this.game, - this.first.width / 2, 0);
	this.third = new Toast(this.game, this.first.width / 2 + 10, 0);

	this.x = this.first.width * 3 / 4 + 5;
	this.add(this.first);
	this.add(this.second);
	this.add(this.third);
	this.scale.set(0.5, 0.5);
}

Toasts.prototype.increaseScore = function() {
	this.score++;
	if (this.score / this.MAX_SCORE > 0.95) {
		this.first.gold();
		this.second.gold();
		this.third.gold();
	} else if (this.score / this.MAX_SCORE > 0.90) {
		this.third.color();
	} else if (this.score / this.MAX_SCORE > 0.60) {
		this.second.color();
	} else if (this.score / this.MAX_SCORE > 0.30) {
		this.first.color();
	}
	console.log(this.score);
}

Toasts.prototype.createTweens = function() {
	this.tweens = {};
	this.tweens.enlarge = this.game.add.tween(this.scale);
	this.tweens.enlarge.to( { x : 1, y : 1 }, 500, Phaser.Easing.Linear.None, false);
	this.tweens.center = this.game.add.tween(this);
	this.tweens.center.to( { x : this.game.world.width / 2, y : this.game.world.height / 2 }, 500, Phaser.Easing.Linear.None, false);
}

Toasts.prototype.center = function() {
	this.tweens.enlarge.start();
	this.tweens.center.start();
}

Toasts.prototype.finish = function() {
	if (!this.game.vitalWave.gameOver) {
		this.finished = true;
		this.center();
		this.game.tosted.center();
	}
}

function Toast(game, x, y) {
	Phaser.Sprite.call(this, game, x, y,'ToastGray');
	this.game = game;
	this.game.add.existing(this);
	//this.initialize();
}

Toast.prototype = Object.create(Phaser.Sprite.prototype);
Toast.prototype.constructor = Toast;

Toast.prototype.initialize = function() {
	/*//this.color = this.game.add.sprite(this.x, this.y, 'ToastColor');
	this.colorMask = this.game.add.sprite(0, 0, 'ToastGold');
	//this.colorMask.scale.y = this.y;
	//this.colorMask.scale.x = this.percent * this.x;



	var bmd = this.game.make.bitmapData(this.x, this.y);
	bmd.alphaMask('ToastColor', this.colorMask);
	this.color = this.game.add.image(this.x, this.y, bmd);

	console.log(this.colorMask);
	console.log(bmd);
	console.log(this.color);*/
};

Toast.prototype.color = function() {
	if (this.key == 'ToastGray') {
		this.loadTexture('ToastColor');
	}
}

Toast.prototype.gold = function() {
	if (this.key != 'ToastGold') {
		this.loadTexture('ToastGold');
	}
}
