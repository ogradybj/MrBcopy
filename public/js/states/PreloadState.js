var PreloadState = {
  preload: function() {

    this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    this.logo.anchor.setTo(0.5);

    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY - 128, 'preloadBar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);


    this.load.image('player', 'assets/images/player.png');
    this.load.image('dot', 'assets/images/dot.png');
    this.load.image('blackend', 'assets/images/blackend.png');
    this.load.image('button', 'assets/images/button.png');
    this.load.spritesheet('ends', 'assets/images/ends.png', 32, 540, 4,1,2);
    this.load.spritesheet('balls', 'assets/images/balls2.png', 84, 84, 2,1,2);
    this.load.audio('song1', ['assets/audio/song1.mp3','assets/audio/song1.ogg']);
    this.load.audio('song2', ['assets/audio/song2.mp3','assets/audio/song2.ogg']);

    game.load.bitmapFont('carrier_command', 'assets/fonts/bitmapFonts/carrier_command_black.png', 'assets/fonts/bitmapFonts/carrier_command.xml');
    game.load.bitmapFont('carrier_commandw', 'assets/fonts/bitmapFonts/carrier_command.png', 'assets/fonts/bitmapFonts/carrier_command.xml');
    game.load.json('gamedata', 'assets/data/gamedata.json');
    
  },
  create: function() {
    this.state.start('HomeState');
  }
};
