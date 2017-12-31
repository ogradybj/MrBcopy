var HomeState = {
  init: function(message, finalScore, mute){
    this.message = message;
    this.finalScore = finalScore;
    this.mute = mute

    this.game.inputField = game.add.plugin(PhaserInput.Plugin);

    //game.add.plugin(PhaserAds.AdManager);
    //Include the gdApi script
// (function(i,s,o,g,r,a,m){
//     i['GameDistribution']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)};i[r].l=1*new Date();a=s.createElement(o);m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a, m);
// })(window, document, 'script', '//html5.api.gamedistribution.com/libs/gd/api.js', 'gdApi');


// //Initialize the gdApi script with the previously defined settings
// gdApi(settings);
},
  create: function() {
    var logo = this.game.add.sprite(this.game.world.centerX-20, this.game.world.centerY-115,'logo');
    logo.anchor.setTo(0.5);
    if (!this.mute){
    this.mute = 1;
    }
    var scoreSave = firebase.database().ref('HighScores')

    var newScore = {};
    music = game.add.audio('song2', 1, true);
    music.volume = 0.3*this.mute;
    music.play();
    //music.playbackRate = 5;
    //var input = game.add.inputName(10,90);
    //let's create a new provider, first argument should be the game, second should be the ad tag URL
//     var provider = new PhaserAds.AdProvider.GameDistributionAds(
//    game,                                        //Your Phaser game instance
//    'b19a83a9eadf4b2fbc75e3643b1f1431',          //Your gameId
//    'FEF219E3-709B-46BB-B3E3-A470A89E356A-s1'    //Aaaand your gameId
// );
//     game.ads.setAdProvider(provider);

game.ads.showAd();
    var gamedataJSON = game.cache.getJSON('gamedata');

    var inputN = game.add.inputField(148, 150,{
                font: '22px Arial',
                fill: '#515151',
                fillAlpha: 0.5,
                fontWeight: 'bold',
                width: 125,
                padding: 2,
                borderWidth: 3,
                borderColor: '#999',
                borderRadius: 2,
                min: '1',
                max: '12',
                zoom: false
            });
    inputN.setText(gamedataJSON.name);
    PhaserInput.onKeyboardOpen.add(function () {
                console.log("keyboard open", PhaserInput.KeyboardOpen)
            });
            PhaserInput.onKeyboardClose.add(function () {
                console.log("keyboard close", PhaserInput.KeyboardOpen)
                gamedataJSON.name = inputN.value;
            });
    gamedataJSON.name = inputN.value;

    var buttonStart = this.game.add.sprite(this.game.world.centerX-5, this.game.world.centerY+25,'button');
    buttonStart.anchor.setTo(0.5);
    buttonStart.alpha = 0.85;

    buttonStart.inputEnabled = true;
    buttonStart.events.onInputDown.add(function(){
        music.stop();
        gamedataJSON.name = inputN.value;


      this.state.start('GameState')
    }, this);
    var blackbar1 = this.game.add.sprite(10,0,'blackend');
    var blackbar2 = this.game.add.sprite(918,0,'blackend');
    var sidebar1 = this.game.add.sprite(0,0,'ends', 2);
    var sidebar2 = this.game.add.sprite(928,0,'ends',2);

    var style = {font: '35px Arial', fill: '#000'};
    this.game.add.bitmapText(this.game.world.centerX-88, this.game.world.centerY+7,'carrier_commandw', 'START', 30);
    //style.anchor.setTo(0.5);
    var title = {font: '65px Arial', fill: '#333'};
    this.game.add.bitmapText(this.game.world.centerX-290, this.game.world.centerY-240,'carrier_command', 'Mr Balling', 50);
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

    this.game.add.bitmapText(60, 160,'carrier_command', 'NAME:', 15);

    this.game.add.bitmapText(60, 200,'carrier_command', 'HIGH SCORE:' + gamedataJSON.high_score, 15);
    this.game.add.bitmapText(60, 240,'carrier_command', 'LAST SCORE:' + gamedataJSON.last_score, 15);


    this.game.add.bitmapText(60, 280,'carrier_command', 'DIRECTIONS: PRESS SPACEBAR', 8);
    this.game.add.bitmapText(60, 310,'carrier_command', 'OR CLICK SCREEN TO ER FLY', 8);
    this.game.add.bitmapText(60, 340,'carrier_command', 'STAY IN CENTER OF SCREEN', 8);
    this.game.add.bitmapText(60, 370,'carrier_command', 'TO STAY ALIVE', 8);

//High score code on right side of home screen
    var highnames = {};
    var highscores = {};
    var i = 0;
    var score1, score2, score3, score4, score5;

    firebase.database().ref('HighScores').orderByChild('score').limitToLast(5).once('value', function(snapshot){
        snapshot.forEach(function(childSnapshot) { 
            var childKey = childSnapshot.key;  
            
            
            highnames[i] = childSnapshot.val().name; 
            highscores[i] = childSnapshot.val().score; 
            i += 1; 
        
        }); 
        if(score1){
            score1.destroy();
            score2.destroy();
            score3.destroy();
            score4.destroy();
            score5.destroy();
        }

        //console.log(highnames, highscores);
        score1 = this.game.add.bitmapText(630, 190,'carrier_command', highnames[4] + ': ' + highscores[4], 12);
        score2 = this.game.add.bitmapText(630, 220,'carrier_command', highnames[3] + ': ' + highscores[3], 12);
        score3 = this.game.add.bitmapText(630, 250,'carrier_command', highnames[2] + ': ' + highscores[2], 12);
        score4 = this.game.add.bitmapText(630, 280,'carrier_command', highnames[1] + ': ' + highscores[1], 12);
        score5 = this.game.add.bitmapText(630, 310,'carrier_command', highnames[0] + ': ' + highscores[0], 12);
        i = 0

    });

    this.game.add.bitmapText(615, 155,'carrier_command', 'HIGHEST SCORES', 18);


    if(this.message) {
      
        this.game.add.bitmapText(180, 420,'carrier_command', this.message, 28);

        newScore.name = gamedataJSON.name;
        newScore.score = gamedataJSON.last_score;
        scoreSave.push(newScore);
        //gdApi.showBanner();

        //this.game.ads.showAd();

    }
  },
};
