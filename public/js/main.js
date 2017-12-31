//initiate the Phaser framework
var game = new Phaser.Game(960, 540, Phaser.AUTO);

game.add.plugin(PhaserAds.AdManager);
//let's create a new provider, first argument should be the game, second should be the ad tag URL
var provider = new PhaserAds.AdProvider.GameDistributionAds(
   game,                                        //Your Phaser game instance
   'b19a83a9eadf4b2fbc75e3643b1f1431',          //Your gameId
   'FEF219E3-709B-46BB-B3E3-A470A89E356A-s1'    //Aaaand your gameId
);
game.ads.setAdProvider(provider);



// let settings = {
//     // This is the gameId you get when you've create a game on gamedistribution.com
//     gameId: "b19a83a9eadf4b2fbc75e3643b1f1431",    

//     // Along with the gameid you'll also be supplied a userId, put it here
//     userId: "FEF219E3-709B-46BB-B3E3-A470A89E356A-s1",

//     // This function will be called when the ad begins and when your game should be paused. It's required that you mute your game at this point
//     pauseGame: function () {
//         game.pause(); //example
//     },

//     // This callback is called when the ad is finished, you can resume your game and unmute your audio
//     resumeGame: function () {
//         game.resume(); //example
//     },

//     // Called when the gdApi initlialized, will be deprecated soon
//     onInit: function (data) {
//         console.log("Init: ", data);
//     },

//     // Called when an error appears in the gdApi, will be deprecated soon
//     onError: function (data) {
//         console.log("Error: ", data);
//     }
// };
game.state.add('GameState', GameState);
game.state.add('HomeState', HomeState);
game.state.add('PreloadState', PreloadState);
game.state.add('BootState', BootState);
game.state.add('GameOverState', GameOverState);
game.state.start('BootState');
