// Trace the player leaves as the moves moves on the screen
function PlayerTrace(game, player, color) {
	this.game = game;
    this.player = player;
	this.color = PlayerData.COLORS_RGB[color];

    // Calulates sin between the screen and player bounds to draw the trace with
	this.data = this.game.math.sinCosGenerator((this.game.height - this.player.y) * 2, (this.game.height - this.player.y), 1, 1);

    // Bitmapdata where the trace will be drawn
    this.bmd = this.game.add.bitmapData(this.game.width, this.game.height);
    this.bmd.addToWorld();

    // Auxiliar variable that holds data to draw a rectangle while in the for loop
    this.currentRectangleToDraw = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        fillStyle: ''
    };
}

PlayerTrace.prototype = Object.create(Phaser.Sprite.prototype);
PlayerTrace.prototype.constructor = PlayerTrace;

PlayerTrace.prototype.update = function() {
    // Destroy the trace when the player doesn't exist anymore
    if (!this.player) {
        this.destroy();
        return;
    }

    this.bmd.clear(); // Removes the trace

    // Draws the trace starting from the end (bottom of the screen),
    // up to the y-position of the player
    for (var i = this.game.height - this.player.y; i >= 0; i--) {
        if (i > 1) { // Replace position with the previous in the history
            this.player.xPositionsHistory[i] = this.player.xPositionsHistory[i - 1];
        } else { // Adds current position to the history
            this.player.xPositionsHistory[i] = this.player.x;
        }

        // Data of the rectangle to draw, that simulates a sin effect at the end of the screen
        // and also reduces the opacity at the end
        this.currentRectangleToDraw.x = this.player.width / 4 + this.player.xPositionsHistory[i];
        this.currentRectangleToDraw.y = this.player.width / 3 + this.player.y + this.data.sin[this.game.height - this.player.y - i];
        this.currentRectangleToDraw.height = this.currentRectangleToDraw.width =
            (this.player.width * 3 / 5) - i * this.player.width * 3 / 5 / (this.game.height - this.player.y);
        this.currentRectangleToDraw.fillStyle = 'rgba(' + this.color + ', ' + (0.8 - i / (this.game.height - this.player.y)) + ')';
        

        // Draws a rectangle based on currentRectangleToDraw data
        this.bmd.rect(this.currentRectangleToDraw.x,
                            this.currentRectangleToDraw.y,
                            this.currentRectangleToDraw.width,
                            this.currentRectangleToDraw.height,
                            this.currentRectangleToDraw.fillStyle);
    }
}

PlayerTrace.prototype.changeColor = function(color) {
     this.color = PlayerData.COLORS_RGB[color];
}