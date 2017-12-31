var GameState = {

  create: function() {

    game.physics.startSystem(Phaser.Physics.ARCADE)


    this.blackbar1 = this.game.add.sprite(10,0,'blackend');
    this.blackbar2 = this.game.add.sprite(918,0,'blackend');
    this.sideleft = game.add.sprite(0,0,'ends');
    this.sideright = game.add.sprite(928,0,'ends');
    game.physics.arcade.enable(this.sideleft);
    game.physics.arcade.enable(this.sideright);
    this.sideleft.body.immovable = true;
    this.sideright.body.immovable = true;
    this.sideleft.body.allowGravity = false;
    this.sideright.body.allowGravity = false;


    this.player = game.add.sprite(100, 300, 'player');
    this.player.anchor.setTo(0.5);
    this.player.customParams = {pSpeed: 2.4,pAngle: 1.2, pScore: 0, lefthit: 0, righthit: 0, onBall: false, hitRed: false, rotDir: 1, ptanAngle: 3.14159, xdir: 1, ydir: 1, zprop: 0}

    game.physics.arcade.enable(this.player)

    this.player.body.allowGravity = false;

    this.player.customParams.ydir = Math.sin(this.player.customParams.pAngle)
    this.player.customParams.xdir = Math.cos(this.player.customParams.pAngle)

    game.input.onDown.add(this.clickEvent, this);

    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.spaceKey.onDown.add(this.clickEvent, this);

    gameMusic = game.add.audio('song1', 1, true);
    gameMusic.volume = 0.3;
    //game.sound._playbackRate.value = 5;
    gameMusic.play();


    var style = {font: '20px Arial', fill: '#111'};
    game.add.bitmapText(50, 20,'carrier_command' ,'Score:', 20);
    this.scoreText = game.add.bitmapText(190,20, 'carrier_command','', 20);
    this.refreshStats();

    var style2 = {font: '35px Arial', fill: '#000'};
    var mutetext = this.game.add.bitmapText(740, 470,'carrier_command', 'MUTE', 25);
    if (game.sound.mute == false){
        mutetext.setText('MUTE')
    }
    else if (game.sound.mute == true) {
        mutetext.setText('UNMUTE')
    };
    mutetext.inputEnabled = true;
    mutetext.events.onInputDown.add(function(){
        if(game.sound.mute == true){
            game.sound.mute = false;
            mutetext.setText('MUTE')
        }
        else if(game.sound.mute == false){
            game.sound.mute = true;
            mutetext.setText('UNMUTE')
        }
    });


    this.ballTimer = this.time.create(true);
    this.ballTimer.autoDestroy = true;
    //increase score every second/15
    this.increaseScore = this.time.create(false);
    this.increaseScore.loop(Phaser.Timer.SECOND/15, this.increaseScoref, this);
    this.increaseScore.start();

    this.increaseSpeed = game.time.events.loop(Phaser.Timer.SECOND*5, this.increaseSpeedf, this);

    this.balls = this.add.group();
    this.balls.enableBody = true;

    this.createBall1();

      this.ballCreator = game.time.events.loop(Phaser.Timer.SECOND * (5/this.player.customParams.pSpeed), this.createBall, this);
  },

  clickEvent: function() {
    if (this.player.customParams.onBall == true){
      this.player.customParams.onBall = false;

      this.player.customParams.pAngle = this.player.customParams.ptanAngle;
      this.ballTimer.start();
    }
  },

  clearSelection: function(){
    this.buttons.forEach(function(element, index){
        element.alpha = 1;
    });

  },

  refreshStats: function() {
    this.scoreText.text = this.player.customParams.pScore;
  },
  increaseScoref: function() {
    this.player.customParams.pScore += 1;
    this.refreshStats();
  },
  increaseSpeedf: function() {
    this.player.customParams.pSpeed += 0.25;
    console.log(this.ballCreator.delay);
    this.ballCreator.delay -= (70);
  },
  playerhitSideleft: function() {

    if (this.player.customParams.onBall == true){
      this.gameOver();
    }

    this.player.customParams.xdir *= -1;

    if (this.player.customParams.lefthit == 0) {
      this.sideleft.frame = 1

    }
    else if (this.player.customParams.lefthit == 1) {
      this.sideleft.frame = 3
    }
    else if (this.player.customParams.lefthit == 2) {
      this.sideleft.frame = 2
    }
    else if(this.player.customParams.lefthit == 3) {
      this.gameOver()
    }
    this.player.customParams.lefthit +=1
    
  },
  playerhitSideright: function() {
    if (this.player.customParams.onBall == true){
      this.gameOver();
    }

    this.player.customParams.xdir *= -1;

    if (this.player.customParams.righthit == 0) {
      this.sideright.frame = 1
    }
    else if (this.player.customParams.righthit == 1) {
      this.sideright.frame = 3
    }
    else if (this.player.customParams.righthit == 2) {
      this.sideright.frame = 2
    }
    else if (this.player.customParams.righthit == 3) {
      this.gameOver()
    }
    this.player.customParams.righthit +=1
  },

  playerhitBall: function(player, ball) {
    var dist = game.physics.arcade.distanceBetween(player,ball)
    if (this.ballTimer.ms > 300){
      this.ballTimer.destroy();
    }
    
    if (dist<=58 & !this.ballTimer.running){

    player.customParams.onBall = true;
    if (ball.frame == 1){
      player.customParams.hitRed = true;
      this.gameOver();
    }
    player.customParams.pAngle = game.physics.arcade.angleBetween(player, ball)+3.14159;


    var rotAngle1 = Math.atan2((player.y-ball.y),(player.x-ball.x));
    var rotAngle2 = Math.atan2(((player.y-player.customParams.ydir)-ball.y),((player.x-player.customParams.xdir)-ball.x));

    var rotAngle = (rotAngle1*-1)+rotAngle2
    if (rotAngle >= 0) {
      player.customParams.rotDir = -1;
    }
    else {
      player.customParams.rotDir = 1;
    }
    player.customParams.ptanAngle = player.customParams.pAngle+(player.customParams.rotDir*3.14159/2)


    player.customParams.zprop = ball.z-1;

}

  },
  //executed multiple times per second
  update: function() {

    game.physics.arcade.overlap(this.player, this.sideleft, this.playerhitSideleft, null, this);
    game.physics.arcade.overlap(this.player, this.sideright, this.playerhitSideright, null, this);

    this.balls.forEach(function(element){
      element.y += game.rnd.integerInRange(-.5, .5)
      element.x -= this.player.customParams.pSpeed/2.2
    }, this)

    if (this.player.customParams.onBall == false) {

      game.physics.arcade.overlap(this.player, this.balls, this.playerhitBall, null, this);




    this.player.x += this.player.customParams.pSpeed*this.player.customParams.xdir
    this.player.y += this.player.customParams.pSpeed*this.player.customParams.ydir


//not needed with collideWorldBounds setup for player
    if (this.player.y < 16) {
      this.player.y = 17
      this.player.customParams.ydir *= -1
    }
    else if (this.player.y > 528) {
      this.player.y = 527
      this.player.customParams.ydir *= -1
    }

}

else if (this.player.customParams.onBall == true){

  //this.player.rotation += 8/this.player.customParams.pSpeed*this.player.customParams.rotDir;
  this.player.customParams.pAngle += (this.player.customParams.pSpeed/300*3.14159)*this.player.customParams.rotDir;
  this.player.customParams.ptanAngle = this.player.customParams.pAngle+(this.player.customParams.rotDir*3.14159/2)
  this.player.customParams.ydir = Math.sin(this.player.customParams.ptanAngle)
    this.player.customParams.xdir = Math.cos(this.player.customParams.ptanAngle)
  this.player.x = this.balls.children[this.player.customParams.zprop].x+60*Math.cos(this.player.customParams.pAngle);
  this.player.y = this.balls.children[this.player.customParams.zprop].y+60*Math.sin(this.player.customParams.pAngle);

}

    if (game.input.keyboard.isDown())
    {
        this.clickEvent();
    }

    this.balls.forEach(function(element){
      if(element.x < -70) {
        element.kill();
      }
    }, this)


},
createBall1: function() {
    var ball = this.balls.create(1000,360, 'balls');
    ball.body.immovable = true;

    ball.body.collideWorldBounds = false;
    ball.body.allowGravity = false;
    ball.anchor.setTo(0.5,0.5);
    ball.reset(1000, 355);

  },
createBall: function() {
    //give me first dead sprite if there are any
    var ball = this.balls.getFirstExists(false);
    var goodbad = game.rnd.integerInRange(1,100)

    if(!ball) {
      ball = this.balls.create(1000,game.rnd.integerInRange(90, 470), 'balls');
      ball.body.immovable = true;
    }

        if (goodbad > 98 || goodbad < 3) {
      ball.frame = 1;

    }
    ball.body.collideWorldBounds = false;
    ball.body.allowGravity = false;
    ball.anchor.setTo(0.5,0.5);
    ball.reset(1000, game.rnd.integerInRange(85, 475));

  },
  

  gameOver: function() {
    gameMusic.stop();
    emitter = game.add.emitter((this.player.x), (this.player.y), 100);
    emitter.makeParticles('dot');
    emitter.minParticleSpeed.setTo(-150, -150);
    emitter.maxParticleSpeed.setTo(150,150);
    emitter.gravity = 0;
    emitter.start(true, 900, null, 100);
    this.player.alpha = 0;
    this.player.customParams.onBall = false;

    this.increaseScore.destroy();
    var gamedataJSON = game.cache.getJSON('gamedata');
    gamedataJSON.last_score = this.player.customParams.pScore;

    if (this.player.customParams.pScore > gamedataJSON.high_score){
      gamedataJSON.high_score = this.player.customParams.pScore;
      console.log(gamedataJSON.high_score)
    }

    game.time.events.add(1000, this.sendHome, this);
  },
  sendHome: function(finalScore) {
    var finalScore = this.player.customParams.pScore;

    this.state.start('GameOverState', true, false, 'GAME OVER', finalScore)

  }

  
};
