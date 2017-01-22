States.Intro = {
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
		this.game.stage.backgroundColor = '0xFEEC70';
		
		// Sets the world bounds
		this.game.world.setBounds(0, 0, this.BOUNDS.x, this.BOUNDS.y);

		//Load every Image
		this.songFunkytown = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'Funkytown');
		this.songFunkytown.anchor.x = 0.5;
		this.songFunkytown.anchor.y = 1.2;
		this.songFunkytown.scale.setTo(0.7, 0.7);
		this.songIbiza = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'Ibiza');
		this.songIbiza.anchor.x = 0.5;
		this.songIbiza.anchor.y = 1.2;
		this.songIbiza.scale.setTo(0.7, 0.7);
		this.songSorry = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'Sorry');
		this.songSorry.anchor.x = 0.5;
		this.songSorry.anchor.y = 1.2;
		this.songSorry.scale.setTo(0.7, 0.7);

		this.logoImage = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'Logo');
		this.logoImage.anchor.x = 0.5;
		this.logoImage.anchor.y = 1;
		this.logoImage.scale.setTo(0.4, 0.4);

		this.instr1 = this.game.add.sprite(this.game.world.centerX, 20, 'Instr1');
		this.instr1.anchor.x = 0.5;
		this.instr1.anchor.y = 0;
		this.instr1.scale.setTo(0.7, 0.7);
		this.instr2 = this.game.add.sprite(this.game.world.centerX, this.instr1.height * 1.5, 'Instr2');
		this.instr2.anchor.x = 0.5;
		this.instr2.anchor.y = 0;
		this.instr2.scale.setTo(0.7, 0.7);

		this.spaceButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	},

	update: function() {
		if ((this.spaceButton.isDown || this.game.input.pointer1.isDown) && this.spaceButton.duration >= 1000) {
			this.state.start('Play');
		} else if (this.spaceButton.isDown || this.game.input.pointer1.isDown) {
			
		}
	}
};
