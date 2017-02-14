// Represents the cassette that is displayed in the song selection screen
// This cassette is reused when a song changes
function Cassette(game, x, y, songFilename) {
	Phaser.Sprite.call(this, game, x, y, songFilename + 'Cassette');
	this.game = game;
	this.game.add.existing(this);

	this.anchor.setTo(0.5, 1); // Used for the tween animations
	this.songFilename = songFilename;

	this.initialize();
}

Cassette.prototype = Object.create(Phaser.Sprite.prototype);
Cassette.prototype.constructor = Cassette;

Cassette.prototype.initialize = function() {
	// Creates a music object that plays the preview of the current song filename
	this.loadMusicWithCurrentFilename();
	this.music.play('Preview');

	this.createTweens();
}

Cassette.prototype.createTweens = function() {
	this.tweens = {};
	this.tweens.enlarge = this.game.add.tween(this.scale);
	this.tweens.enlarge.to( { x : 1, y : 1}, 1000, Phaser.Easing.Linear.None, false);

	this.tweens.reduce = this.game.add.tween(this.scale);
	this.tweens.reduce.to( { x : 0.5, y : 0.5}, 1000, Phaser.Easing.Linear.None, false);

	// Moves the cassette up, simulating a show effect
	this.tweens.show = this.game.add.tween(this);
	this.tweens.show.to( { x : this.game.world.centerX, y : this.game.world.centerY * 6 / 5}, 1000, Phaser.Easing.Linear.None, false);

	// Moves the cassette down, simulating a hide effect
	this.tweens.hide = this.game.add.tween(this);
	this.tweens.hide.to( { x : this.game.world.centerX, y : this.game.world.height * 9 / 10}, 1000, Phaser.Easing.Linear.None, false);
	
	// After the cassette is hidden, the cassette with a new image and music is shown
	this.tweens.hide.onComplete.add(this.finishedHide, this);
}

Cassette.prototype.show = function() {
	this.tweens.show.start();
	this.tweens.enlarge.start();
}

// Hides the cassette and stops playing the music
Cassette.prototype.hide = function() {
	this.music.fadeOut(1000);
	this.tweens.hide.start();
	this.tweens.reduce.start();
}

Cassette.prototype.hideAndSetSongFilename = function(songFilename) {
	this.hide();
	this.songFilename = songFilename;
}

// After the cassette is hidden, it should change the image and music
// We assume that the filename has changed properly before calling this function
Cassette.prototype.finishedHide = function() {
	this.music.stop();
	this.music.destroy();

	this.updateImage();
	this.loadMusicWithCurrentFilename();
	this.music.fadeIn(1000, true, 'Preview');
	
	this.show();
}

Cassette.prototype.updateImage = function() {
	this.loadTexture(this.songFilename + 'Cassette');
}

// Creates a new music object and adds a marker
// The 20 seconds marker is used to play a middle part of the song, instead of the begining
Cassette.prototype.loadMusicWithCurrentFilename = function() {
	this.music = this.game.add.audio(this.songFilename);
	this.music.addMarker('Preview', 20, 15, 1, true);
}