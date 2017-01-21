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
		this.background = this.game.add.sprite(0, 0, 'City');
		this.background.animations.add('Play');
		this.background.animations.play('Play', 8, true);
		this.background.scale.setTo(this.game.width / this.background.width, this.game.height / this.background.height);

		// Sets the world bounds
		this.game.world.setBounds(0, 0, this.BOUNDS.x, this.BOUNDS.y);

		this.game.chart = new Chart(this.game, 2000);
		var aux = this;
		setTimeout(function() {

		
		aux.game.chart.loadWithTime({
	"name" : "I Took A Pill In Ibiza (Seeb Remix)",
	"artist" : "Mike Posner",
	"filename": "ibiza",
	"bpm" : 102,
	"notes" : [
		2,3,6,6,5,4,4,2,
		2,6,3,4,2,4,3,4,
		6,6,6,6,5,5,5,4,4,5,4,4,3,3,4,3,3,3,3,2,1,1,
		4,5,4,4,3,3,5,4,3,
		1,5,2,4,4,4,3,4,
		6,6,6,5,5,4,4,4,4,3,3,3,3,4,4,4,4,3,3,3,2,1,
		2,5,5,5,4,4,3,3,3,
		4,5,5,4,4,3,4,4,4,
		5,5,5,4,4,3,3,3,3,3,4,4,3,3,3,4,6,3,
		2,5,5,5,4,4,3,3,3,3,
		5,5,5,4,4,3,4,4,4,
		5,5,5,4,4,2,2,2,3,3,2,1,
		2,2,2,3,6,5,4,
		4,5,5,
		5,6,5,4,
		6,5,4,
		4,5,4,6,5,5,
		4,6,5,4,3,4,5,4,
		1,1,2,2,3,3,4,4,4,1,1,2,3,2,3,5,6,
		1,1,2,2,3,3,4,2,2,2,1,1,3,2,1,
		1,1,2,2,3,3,4,4,4,1,1,2,3,2,3,5,6,
		1,1,2,2,3,3,4,2,2,2,1,1,3,2,1,
		1,1,2,2,3,3,4,4,4,1,1,2,3,2,3,5,6,
		1,1,2,2,3,3,4,2,2,2,1,1,3,2,1,
		1,1,2,2,3,3,4,4,4,1,1,2,3,2,3,5,6,
		1,1,2,2,3,3,4,2,2,2,1,1,3,2,1,
		5,4,3,3,3,5,4,5,5,5,4,5,
		6,6,6,6,5,5,5,4,4,4,4,5,5,5,4,4,4,4,3,3,2,1,1
	],
	"times" : [
		240,390,540,690,980,1130,1280,1860,
		3180,3330,3480,3620,3920,4070,4360,4510,
		5540,5680,5830,5980,6120,6270,6570,6720,6860,7150,7450,7740,7890,8030,8320,8480,8620,8770,8920,9070,9220,9360,
		9950,10090,10240,10390,10530,10680,11130,11270,11420,
		12600,12740,12890,13030,13330,13630,13910,14060,
		15100,15240,15390,15680,15970,16120,16270,16420,16570,16710,16850,17000,17150,17300,17450,17590,17740,17890,18030,18330,18620,18770,
		19070,19210,19360,19500,19650,19800,20100,20530,20970,
		21570,21710,21860,22000,22150,22300,22450,22890,23330,
		23920,24060,24210,24350,24500,24650,24800,24950,25240,25390,25690,25830,26130,26270,26720,26860,27010,27290,
		28470,28620,28770,28920,29060,29210,29350,29500,29950,29950,
		30980,31120,31270,31410,31560,31710,31860,32300,32740,
		33330,33480,33620,33770,33910,34210,34360,34650,34960,35240,35670,35830,
		36560,36710,36990,37300,37600,38030,38180,
		38920,40690,41170,
		42930,43040,43230,43530,
		45390,45580,45880,
		47740,47920,48330,50090,50290,50580,
		52330,52450,52640,52940,53510,54800,54500,55280,
		57740,58010,58310,58630,58910,59220,59390,59700,59800,60100,60380,60670,60980,61450,61610,61860,62150,
		62450,62720,63020,63340,63620,63930,64100,64210,64510,64800,65390,65860,65970,66160,66560,
		67150,67420,67720,68040,68320,68630,68800,69110,69210,69510,69790,70080,70390,70860,71020,71270,71560,
		71860,72130,72430,72750,73030,73340,73510,73620,73920,74210,74800,75270,75380,75570,75970,
		76570,76840,77140,77460,77740,78050,78220,78530,78630,78930,79210,79500,79810,80280,80440,80690,80980,
		81280,81550,81850,82170,82450,82760,82930,83040,83340,83630,84220,84690,84800,84990,85390,
		85980,86250,86550,86870,87150,87460,87630,87940,88040,88340,88620,88910,89220,89690,89850,90100,90390,
		90690,90960,91260,91580,91860,92170,92340,92450,92750,93040,93630,94100,94210,94400,94800,
		94950,95100,95240,95390,95540,97450,97590,97740,97890,98180,98330,98620,
		99650,99790,99450,100100,100240,100380,100680,100830,100980,101120,101270,101570,101710,101860,102010,102150,102310,102450,102740,103030,103190,103330,103480
	] //1.43.766
}

);
		}, 0);
		//var trace = this.game.add.group();
		//this.game.playerTrace = this.game.add.sprite();
		//trace.add(this.game.playerTrace);
		this.game.player = new Player(this.game, this.BOUNDS.x / 2, this.BOUNDS.y * 3 / 4, 1000);
		this.game.score = new ScoreWave(this.game, 0, 100, 7, 3, 7, '#ffffff');
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