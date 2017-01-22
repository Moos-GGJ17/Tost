function Cassette(game, x, y, data) {
	Phaser.Sprite.call(this, game, x, y, data.filename + 'Cassette');
	this.game = game;
	this.game.add.existing(this);

	this.anchor.setTo(0.5, 1);
	this.data = data;

	this.music = this.game.add.audio(this.data.filename);
	this.music.addMarker('Preview', 20, 15, 1, true);
	this.music.play('Preview');

	this.createTweens();
}

Cassette.prototype = Object.create(Phaser.Sprite.prototype);
Cassette.prototype.constructor = Cassette;

Cassette.prototype.setData = function(data) {
	this.data = data;
	this.updateImage();
}

Cassette.prototype.createTweens = function() {
	this.tweens = {};
	this.tweens.enlarge = this.game.add.tween(this.scale);
	this.tweens.enlarge.to( { x : 1, y : 1}, 1000, Phaser.Easing.Linear.None, false);

	this.tweens.reduce = this.game.add.tween(this.scale);
	this.tweens.reduce.to( { x : 0.5, y : 0.5}, 1000, Phaser.Easing.Linear.None, false);

	this.tweens.show = this.game.add.tween(this);
	this.tweens.show.to( { x : this.game.world.centerX, y : this.game.world.centerY * 6 / 5}, 1000, Phaser.Easing.Linear.None, false);

	this.tweens.hide = this.game.add.tween(this);
	this.tweens.hide.to( { x : this.game.world.centerX, y : this.game.world.height * 9 / 10}, 1000, Phaser.Easing.Linear.None, false);
	
	this.tweens.hide.onComplete.add(this.finishedHide, this);
	this.tweens.show.onComplete.add(this.finishedShow, this);
}

Cassette.prototype.show = function() {
	this.tweens.show.start();
	this.tweens.enlarge.start();
}

Cassette.prototype.hide = function(newData) {
	this.data = newData;
	this.music.fadeOut(1000);
	this.tweens.hide.start();
	this.tweens.reduce.start();
}

Cassette.prototype.finishedHide = function() {
	//this.tweens.hide.stop(true);
	//this.tweens.reduce.stop(true);
	this.music.stop();
	this.music.destroy();
	this.music = this.game.add.audio(this.data.filename);
	this.music.addMarker('Preview', 20, 15, 1, true);
	this.music.fadeIn(1000, true, 'Preview');
	this.updateImage();
	this.show();
}

Cassette.prototype.finishedShow = function() {
	//this.tweens.show.stop(true);
	//this.tweens.enlarge.stop(true);
}

Cassette.prototype.updateImage = function() {
	this.loadTexture(this.data.filename + 'Cassette');
}