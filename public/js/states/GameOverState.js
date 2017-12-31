var GameOverState = {
  init: function(message, finalScore, mute){
    this.message = message;
    this.finalScore = finalScore;
    this.mute = mute
  },
  create: function() {
    var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY-128,'logo');
    logo.anchor.setTo(0.5);

    if(this.message) {
      
        this.game.add.bitmapText(this.game.world.centerX-280, this.game.world.centerY,'carrier_command', this.message, 50);
}
    game.input.onDown.add(this.sendHome, this);

},
  sendHome: function(finalScore) {

    this.state.start('HomeState', true, false, 'GAME OVER PLAY AGAIN', this.finalScore)
  },
};
