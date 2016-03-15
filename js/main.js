var Game = require('./game.js');
var WIDTH  = 700;
var HEIGHT = 700;


function main() {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  // keep track of keyboard presses
	var game = new Game(WIDTH, HEIGHT, ctx);
  game.start(ctx);
}


main();
