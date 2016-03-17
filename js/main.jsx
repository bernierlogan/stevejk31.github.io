var Game = require('./game.js');
var WIDTH  = 700;
var HEIGHT = 700;
var ReactDOM = require('react-dom');
var React = require('react');
var PopUp = require('./popUp.jsx');



function main() {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  // keep track of keyboard presses
	var game = new Game(WIDTH, HEIGHT, ctx);
  game.start(ctx);
}

main();
var appElement = document.getElementById('welcome-popup');
ReactDOM.render(<PopUp/>, appElement);
