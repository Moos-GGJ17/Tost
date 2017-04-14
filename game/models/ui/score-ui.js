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
	this.grayBar = this.game.add.graphics();
    this.grayBar.beginFill(0x000000, 0.2);
    this.grayBar.drawRect(0, 0, this.game.world.width, 50);
    this.createScoreText();
	//this.createTweens();
}

// Creates a text on the top left corner of the screen, that displays the score
ScoreUI.prototype.createScoreText = function() {
	this.scoreText = this.game.add.text(11, 11, "0", TextStyles.XL);
	this.scoreText.fill = TextColors.WHITE;
}

// Creates the toasts one after another with the same horizontal distance separation
ScoreUI.prototype.createToasts = function(notesHitPercentage) {
	this.toasts = this.game.add.group();

	let firstToast = new Toast(this.game, 0, 0);
	firstToast.x = - firstToast.width * 13 / 8;
	let secondToast = new Toast(this.game, - firstToast.width / 2, 0);
	let thirdToast = new Toast(this.game, firstToast.width * 5 / 8, 0);
    this.toasts.add(firstToast);
	this.toasts.add(secondToast);
	this.toasts.add(thirdToast);
    this.paintToasts(notesHitPercentage, firstToast, secondToast, thirdToast);

	let percentageText = this.game.add.text(0, firstToast.height * 5 / 4, Math.round(notesHitPercentage * 100) + '%', TextStyles.XL);
	percentageText.fill = TextColors.WHITE;
	percentageText.anchor.set(0.5);
	this.toasts.add(percentageText);

	this.toasts.x = this.game.world.centerX;
	this.toasts.y = this.game.world.centerY - firstToast.height / 2;
}

// Paint the toasts accordingly of the percentage of notes hit
ScoreUI.prototype.paintToasts = function(notesHitPercentage, firstToast, secondToast, thirdToast) {
	if (notesHitPercentage > ChartData.SCORE_BASE.GOLD) {
		firstToast.gold();
		secondToast.gold();
		thirdToast.gold();
		this.hasGoldenToasts = true;
	} else {
        if (notesHitPercentage > ChartData.SCORE_BASE.THREE_TOASTS) {
            thirdToast.color();
        }
        if (notesHitPercentage > ChartData.SCORE_BASE.TWO_TOASTS) {
            secondToast.color();
        }
        if (notesHitPercentage > ChartData.SCORE_BASE.ONE_TOAST) {
            firstToast.color();
        }
    }
}

// Tweens used to enlarge and center the score numbers text
/*ScoreUI.prototype.createTweens = function() {
	this.tweens = {};
	this.tweens.enlarge = this.game.add.tween(this.scale);
	this.tweens.enlarge.to( { x : 1, y : 1 }, 500, Phaser.Easing.Linear.None, false);
	this.tweens.center = this.game.add.tween(this);
	this.tweens.center.to( { x : this.game.world.width / 2, y : this.game.world.height / 2 },
		500, Phaser.Easing.Linear.None, false);
}*/

/*ScoreUI.prototype.centerScoreScoreText = function(notesHitPercentage) {
	this.tweens.enlarge.start();
	this.tweens.center.start();

    // Update the text bounds so that it fits inside the second toast
	this.scoreText.setTextBounds(
        this.game.world.width / 2 - this.firstToast.width / 2 - 5,
        this.game.world.height / 2,
        this.firstToast.width,
        this.firstToast.height);

    // Change the numbers text to diplay the percentage of notes hit
    this.scoreText.text = Math.round(notesHitPercentage * 100) + '%';
	this.scoreText.fontSize = 32;
	if (this.hasGoldenToasts) { // White doesn't look good with golden
		this.scoreText.fill = "#000000";
	}
}*/

ScoreUI.prototype.displayToastsAndCenterText = function() {
    var notesHitPercentage = this.game.chart.calculateNotesHitPercentage();
	this.createToasts(notesHitPercentage);
	//this.centerScoreScoreText(notesHitPercentage);
}

ScoreUI.prototype.update = function() {
	if (this.game.chart.gameState === ChartData.GAME_STATE['PLAYING']) {
		this.scoreText.text = this.game.player.score + '';
	}
}

ScoreUI.prototype.deepDestroy = function() {
	this.scoreText.destroy();
	this.grayBar.destroy();
	this.toasts.destroy(true);
	this.destroy(true);
}
