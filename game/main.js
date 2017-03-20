WebFont.load({
	custom: {
		families: ['PressStart2P']
	}
});

var Game, game;

// Contains general Game info, such as the states.
Game = {
  States: States
};

// Array containing all the songs chart data.
// Should be changed after the API and web server are implemented
Songs = [];

var GAME_BOUNDS = {
  x: window.innerWidth,
  y: window.innerHeight
};

var LOADING_MEASURES = {
  width: 300,
  height: 212
};

// Initializes the Phaser game.
window.game = game = new Phaser.Game(GAME_BOUNDS.x, GAME_BOUNDS.y, Phaser.AUTO, '');

// Calculate the horizontal positions where the notes will be displayed
ChartData.calculateNotePositions(GAME_BOUNDS.x);

// Adds the necessary states to the game.
game.state.add('Boot', Game.States.Boot);
game.state.add('Load', Game.States.Load);
game.state.add('MainMenu', Game.States.MainMenu);
game.state.add('Play', Game.States.Play);

// Starts the initial state.
game.state.start('Boot');

window.addEventListener("orientationchange", changeMeasures);
window.addEventListener("resize", changeMeasures);

function changeMeasures() {
  var currentState = game.state.current;
  game.scale.setGameSize(window.innerWidth, window.innerHeight);  
  game.state.remove(game.state[currentState]);
  game.state.add(currentState,Game.States[currentState]);
  game.state.start('MainMenu');
}
