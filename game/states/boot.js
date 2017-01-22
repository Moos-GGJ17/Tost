// JSON containing all the states of the game.
var States = {};

//  The Google WebFont Loader will look for this object, so create it before loading the script.
/*WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    active: function() { game.time.events.add(Phaser.Timer.SECOND, States.Boot.ready, this); },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['Revalia']
    }
};*/

/**
 * Loads all the necessary assets before starting the game.
 */
States.Boot = {
	preload: function() {
		this.ok = false;
		this.game.load.spritesheet('Loading', 'assets/images/loading.jpg', 800, 600);
		//this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
	},

	create: function() {
		this.state.start('Load');
	},

	/*update: function() {
		if (this.ok) {
			this.state.start('Load');
		}
	},

	ready: function() {
		this.ok = true;
	}*/
};

