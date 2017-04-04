function SongSelector(game, songs) {
    Phaser.Group.call(this, game);
    this.game = game;
    this.game.add.existing(this);

    this.allSongs = songs;
    this.currentSongIndex = 0;
    this.cassettes = [];

    this.initialize();
}

SongSelector.prototype = Object.create(Phaser.Group.prototype);
SongSelector.prototype.constructor = SongSelector;

SongSelector.prototype.initialize = function() {
    this.initializeCassettes();
    
    // Center cassettes
    this.x = this.game.world.centerX - this.cassettes[0].width / 2 - this.cassettes[0].cassetteDistance;
    this.y = this.game.world.centerY - this.cassettes[0].height / 2;

    this.swipeHandler = new Swipe(this.game);
    
    //this.spaceButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    //this.spaceButton.onDown.add(this.moveCassettesLeft, this); // spacebar
}

SongSelector.prototype.initializeCassettes = function() {
    this.cassettes[0] = new Cassette(this.game, 0, 0);
    this.cassettes[1] = new Cassette(this.game, this.cassettes[0].cassetteDistance, 0);
    this.cassettes[2] = new Cassette(this.game, this.cassettes[0].cassetteDistance * 2, 0);
    this.cassettes[3] = new Cassette(this.game, this.cassettes[0].cassetteDistance * 3, 0);
    this.cassettes[4] = new Cassette(this.game, this.cassettes[0].cassetteDistance * 4, 0);

    this.add(this.cassettes[0]);
    this.add(this.cassettes[1]);
    this.add(this.cassettes[2]);
    this.add(this.cassettes[3]);
    this.add(this.cassettes[4]);
}

// Returns the song index after the given one
SongSelector.prototype.calculateNextSongIndex = function(index) {
    if (index >= this.allSongs.length - 1) {
        return 0;
    }
    return index + 1;
}

// Returns the song index before the given one
SongSelector.prototype.calculatePreviousSongIndex = function(index) {
    if (index < 1) {
        return this.allSongs.length - 1;
    }
    return index - 1;
}

SongSelector.prototype.update = function() {
    const direction = this.swipeHandler.check();
    if (direction !== null) {
        switch(direction.direction) {
            case this.swipeHandler.DIRECTION_LEFT:
                this.moveCassettesLeft();
                break;
            case this.swipeHandler.DIRECTION_RIGHT:
                this.moveCassettesRight();
                break;
            case this.swipeHandler.DIRECTION_UP:
            case this.swipeHandler.DIRECTION_DOWN:
            case this.swipeHandler.DIRECTION_UP_LEFT:
            case this.swipeHandler.DIRECTION_UP_RIGHT:
            case this.swipeHandler.DIRECTION_DOWN_LEFT:
            case this.swiswipeHandlerpe.DIRECTION_DOWN_RIGHT:
            default:
        }
    }
}

SongSelector.prototype.moveCassettesLeft = function() {
    this.callAll('moveLeft');
    this.cassettes.push(this.cassettes.shift());
    this.currentSongIndex = this.calculateNextSongIndex(this.currentSongIndex);
    console.log(this.currentSongIndex);
}

SongSelector.prototype.moveCassettesRight = function() {
    this.callAll('moveRight');
    this.cassettes.unshift(this.cassettes.pop());
    this.currentSongIndex = this.calculatePreviousSongIndex(this.currentSongIndex);
    console.log(this.currentSongIndex);
}
