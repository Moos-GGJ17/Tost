// Phaser.Group that contains and handles the selectable difficulties buttons/text
function DifficultySelector(game) {
	Phaser.Group.call(this, game);
	this.game = game;

    //this.hasSelectedDifficulty = false; // the game starts when the difficulty has been selected

    this.initializeBackground();
    this.initializeTexts();
    this.hide(); // stays hidden at start
}

DifficultySelector.prototype = Object.create(Phaser.Group.prototype);
DifficultySelector.prototype.constructor = DifficultySelector;

DifficultySelector.prototype.initializeBackground = function() {
    this.background = this.game.add.sprite(0, 0, 'Black');
    this.background.scale.setTo(this.game.world.width, this.game.world.height);
    this.background.alpha = 0;
    this.background.events.onInputDown.add(this.hide, this);

    this.purpleGradient = this.game.add.sprite(this.game.world.width, 0, 'PurpleGradientRight');
    const purpleGradientScaleMeasure = this.game.world.height / this.purpleGradient.height;
    this.purpleGradient.scale.setTo(1, purpleGradientScaleMeasure);
    this.purpleGradient.anchor.set(1, 0);
    this.purpleGradient.events.onInputDown.add(this.hide, this);

    this.add(this.background);
    this.add(this.purpleGradient);
}

DifficultySelector.prototype.initializeTexts = function() {
    // easy difficulty text/button
    this.easy = game.add.text(this.game.world.width - 160, this.game.world.centerY - 50, "EASY", TextStyles.XXL);
    this.easy.fill = TextColors.WHITE;
    //this.easy.events.onInputOver.add(this.increaseFontSize, this);
    //this.easy.events.onInputOut.add(this.reduceFontSize, this);
    this.easy.events.onInputDown.add(this.selectEasyDifficulty, this);

    // hard difficulty text/button
    this.hard = game.add.text(this.game.world.width - 160, this.game.world.centerY + 50, "HARD", TextStyles.XXL);
    this.hard.fill = TextColors.RED;
    //this.hard.events.onInputOver.add(this.increaseFontSize, this);
    //this.hard.events.onInputOut.add(this.reduceFontSize, this);
    this.hard.events.onInputDown.add(this.selectHardDifficulty, this);

    this.add(this.easy);
    this.add(this.hard);
}

DifficultySelector.prototype.hide = function() {
    this.alpha = 0;
    this.easy.inputEnabled = false;
    this.hard.inputEnabled = false;
    this.background.inputEnabled = false;
    this.purpleGradient.inputEnabled = false;
    this.game.hasSelectedSong = false;
    this.game.hasSelectedDifficulty = false;
    if (this.game.songSelector) {
        this.game.songSelector.enableInput();
    }
}

DifficultySelector.prototype.show = function() {
    this.alpha = 1;
    this.easy.inputEnabled = true;
    this.hard.inputEnabled = true;
    this.background.inputEnabled = true;
    this.purpleGradient.inputEnabled = true;
}

DifficultySelector.prototype.increaseFontSize = function(item) {
    item.fontSize = "64px";
}

DifficultySelector.prototype.reduceFontSize = function(item) {
    item.fontSize = "54px";
}

DifficultySelector.prototype.selectEasyDifficulty = function() {
    ChartData.currentDifficulty = 'EASY';
    //this.hide();
    this.game.hasSelectedDifficulty = true;
}

DifficultySelector.prototype.selectHardDifficulty = function() {
    ChartData.currentDifficulty = 'HARD';
    //this.hide();
    this.game.hasSelectedDifficulty = true;
}
