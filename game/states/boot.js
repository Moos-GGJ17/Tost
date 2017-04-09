// JSON containing all the states of the game.
var States = {};

// True if the game was first run in landscape orientation
var firstRunLandscape = true;
var enteredCorrectOrientation = false;

// This state loads the loading animation only, after it has loaded properly the state changes to 'Load'
States.Boot = {
	preload: function() {
		firstRunLandscape = game.scale.isGameLandscape;
		enteredCorrectOrientation = !firstRunLandscape;
		this.game.scale.forceOrientation(false, true);
		this.game.scale.enterIncorrectOrientation.add(this.handleIncorrectOrientation, this);
        this.game.scale.leaveIncorrectOrientation.add(this.handleCorrectOrientation, this);

		this.game.load.image('YellowBackground2', 'assets/images/ui/yellow-background-2.png');
		//this.game.load.spritesheet('Loading', 'assets/images/loading-2.jpg', LOADING_MEASURES.width, LOADING_MEASURES.height);
	},

	create: function() {
		if (enteredCorrectOrientation) {
			this.state.start('Load', true);
		}
	},

	update: function() {
		if (enteredCorrectOrientation) {
			this.state.start('Load', true);
		}
	},

	handleIncorrectOrientation: function() {
     	if(!this.game.device.desktop) {
     		document.getElementById("orientation-image").style.display="block";
     	}
	},

	handleCorrectOrientation: function() {
		if(!this.game.device.desktop) {
			if(firstRunLandscape && !enteredCorrectOrientation) {
				this.game.time.events.add(500, this.resizeGame, this);
			}
			document.getElementById("orientation-image").style.display="none";
		}
	},

	resizeGame: function() {
		if (!enteredCorrectOrientation) {
			GAME_BOUNDS = {
				x : window.innerWidth / window.innerHeight * window.innerWidth,
				y : window.innerWidth
			};
			this.game.scale.setGameSize(GAME_BOUNDS.x, GAME_BOUNDS.y);
			enteredCorrectOrientation = true;
		}
	}
};

