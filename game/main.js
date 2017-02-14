var Game, game;

// Contains general Game info, such as the states.
Game = {
  States: States
};

// Array containing all the songs chart data.
// Should be changed after the API and web server are implemented
Songs = [];

// Initializes the Phaser game.
window.game = game = new Phaser.Game(800, 600, Phaser.AUTO, '');

// Adds the necessary states to the game.
game.state.add('Boot', Game.States.Boot);
game.state.add('Load', Game.States.Load);
game.state.add('MainMenu', Game.States.MainMenu);
game.state.add('Play', Game.States.Play);

// Starts the initial state.
game.state.start('Boot');
