/**
 * Principal game state, all the fun begins here.
 */
States.Play = {
	// Sets the game's basic configurations.
	init: function(){
		this.game.renderer.renderSession.roundPixels = true;
		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.BOUNDS = {
			x: 800,
			y: 600
		};
	},
	

	// Starts the game.
	create: function(){
		// Sets the game background color
		this.game.stage.backgroundColor = '0x000000';
		this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'City'); 

		// Sets the world bounds
		this.game.world.setBounds(0, 0, this.BOUNDS.x, this.BOUNDS.y);

		this.game.chart = new Chart(this.game, 2000);
		var aux = this;
		setTimeout(function() {

		
		aux.game.chart.loadWithTime({
	"name" : "Funkytown",
	"artist" : "Lipps Inc.",
	"filename": "funkytown",
	"bpm" : 122,
	"notes" : [
		4,4,2,4,3,3,4,6,5,4,
		4,4,2,4,3,3,4,6,5,4,
		1,1,1,1,2,2,2,3,3,3,6,5,4,
		4,4,2,4,3,3,4,6,5,4,
		1,1,1,1,2,2,2,2,3,3,3,3,6,5,4,
		4,4,2,4,3,3,4,6,5,4,
		6,6,5,5,5,5,4,4,4,4,3,3,3,3,2,2,2,1,
		3,3,1,3,2,2,3,5,4,3,
		6,6,6,5,5,5,4,4,4,4,3,
		4,4,2,4,3,3,4,6,5,4,
		4,4,2,4,3,3,4,6,5,4,
		3,4,4,2,4,3,3,4,6,5,4,
		3,4,4,2,4,3,3,4,6,5,4,
		6,6
	],
	"times" : [
		4190,4440,4680,4920,5420,5890,6140,6390,6630,6870,
		8090,8340,8580,8820,9320,9790,10040,10290,10530,10770,
		11760,12000,12260,12490,12990,13480,13720,13960,14210,14450,14700,14940,15430,
		15910,16160,16400,16640,17140,17610,17860,18110,18350,18590,
		19580,19820,20080,20310,20810,21050,21295,21540,21780,22030,22270,22520,22760,23000,23250,
		23730,23980,24220,24460,24960,25430,25680,25930,26170,26410,
		26910,27390,27640,27890,28130,28370,28620,28860,29100,29350,29590,29838,30080,30320,30570,30810,31050,31300,
		31540,31790,32030,32270,32770,33240,33490,33740,33980,34220,
		35200,35690,35940,35420,36670,36910,37400,37640,37890,38380,39110,
		39360,39610,39850,40090,40590,41060,41310,41560,41800,42040,
		43260,43510,43750,43990,44490,44960,45210,45460,45700,45940,
		46920,47170,47420,47660,47900,48400,48870,49120,49370,49610,49850,
		50830,51070,51320,51560,51800,52300,52770,53020,53270,53510,53750,
		60830,61080
	]
}

);
		}, 0);
		//var trace = this.game.add.group();
		//this.game.playerTrace = this.game.add.sprite();
		//trace.add(this.game.playerTrace);
		this.game.player = new Player(this.game, this.BOUNDS.x / 2, this.BOUNDS.y * 3 / 4, 1000);
		this.game.score = new ScoreWave(this.game, 0, 30, 5, 3, 7, '#ffffff');
		this.game.gameOver = new GameOver(this.game, this.game.world.width / 2, this.game.height / 3);
	},

	// Updates all the game's objects.
	update: function(){
		this.game.player.update();
		this.game.chart.update();

		if (this.game.score.gameOver) {
			//this.state.start('GameOver', true);
			this.game.gameOver.show();
		}
	},

	render: function() {
		//this.game.player.debug();
		//this.game.chart.debug();
	}
};