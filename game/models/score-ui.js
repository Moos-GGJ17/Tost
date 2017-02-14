// Graphically represents the score, shows the number on the screen and holds 3 toasts that are
// colored based on the percentage of notes hit
function ScoreUI(game) {
	Phaser.Group.call(this, game);
	this.game = game;
	this.game.add.existing(this);

	this.hasGoldenToasts = false;
    this.initialize();
}

ScoreUI.prototype = Object.create(Phaser.Group.prototype);
ScoreUI.prototype.constructor = ScoreUI;

ScoreUI.prototype.initialize = function() {
    this.createNumbersText();
	this.createTweens();
}

// Creates a text on the top left corner of the screen, that displays the score
ScoreUI.prototype.createNumbersText = function() {
    var numbersTextStyle = {
		font: "48px Arial",
		fill: "#e0e0e0",
		boundsAlignH: "center",
		boundsAlignV: "middle"
	}
	this.numbersText = this.game.add.text(10, 0, "0", numbersTextStyle);
}

// Creates the toasts one after another with the same horizontal distance separation
ScoreUI.prototype.createToasts = function(notesHitPercentage) {
	this.firstToast = new Toast(this.game, 0, 0);
	this.firstToast.x = - this.firstToast.width * 3 / 2 - 10;
	this.secondToast = new Toast(this.game, - this.firstToast.width / 2, 0);
	this.thirdToast = new Toast(this.game, this.firstToast.width / 2 + 10, 0);
    this.add(this.firstToast);
	this.add(this.secondToast);
	this.add(this.thirdToast);
    this.paintToasts(notesHitPercentage);
}

// Paint the toasts accordingly of the percentage of notes hit
ScoreUI.prototype.paintToasts = function(notesHitPercentage) {
	if (notesHitPercentage > ChartData.SCORE_BASE.GOLD) {
		this.firstToast.gold();
		this.secondToast.gold();
		this.thirdToast.gold();
		this.hasGoldenToasts = true;
	} else {
        if (notesHitPercentage > ChartData.SCORE_BASE.THREE_TOASTS) {
            this.thirdToast.color();
        }
        if (notesHitPercentage > ChartData.SCORE_BASE.TWO_TOASTS) {
            this.secondToast.color();
        }
        if (notesHitPercentage > ChartData.SCORE_BASE.ONE_TOAST) {
            this.firstToast.color();
        }
    }
}

// Tweens used to enlarge and center the score numbers text
ScoreUI.prototype.createTweens = function() {
	this.tweens = {};
	this.tweens.enlarge = this.game.add.tween(this.scale);
	this.tweens.enlarge.to( { x : 1, y : 1 }, 500, Phaser.Easing.Linear.None, false);
	this.tweens.center = this.game.add.tween(this);
	this.tweens.center.to( { x : this.game.world.width / 2, y : this.game.world.height * 2 / 3/* + this.game.tosted.height / 2*/}, 500, Phaser.Easing.Linear.None, false);
}

ScoreUI.prototype.centerScoreNumbersText = function(notesHitPercentage) {
	this.tweens.enlarge.start();
	this.tweens.center.start();

    // Update the text bounds so that it fits inside the second toast
	this.numbersText.setTextBounds(
        this.game.world.width / 2 - this.firstToast.width / 2 - 5,
        this.game.world.height / 2,// + this.game.tosted.height / 2,
        this.firstToast.width,
        this.firstToast.height);

    // Change the numbers text to diplay the percentage of notes hit
    this.numbersText.text = Math.round(notesHitPercentage) + '%';
	this.numbersText.fontSize = 32;
	if (this.hasGoldenToasts) { // White doesn't look good with golden
		this.numbersText.fill = "#000000";
	}
}

ScoreUI.prototype.displayToastsAndCenterText = function() {
    var notesHitPercentage = this.game.chart.calculateNotesHitPercentage();
	this.createToasts(notesHitPercentage);
	this.centerScoreNumbersText(notesHitPercentage);
}

ScoreUI.prototype.update = function() {
	if (this.game.chart.gameState === ChartData.GAME_STATE['PLAYING']) {
		this.numbersText.text = this.game.player.score + '';
	}
}
