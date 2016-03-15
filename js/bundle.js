/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Game = __webpack_require__(1);
	var WIDTH  = 900;
	var HEIGHT = 900;
	
	
	function main() {
	  var canvas = document.getElementById("canvas");
	  var ctx = canvas.getContext("2d");
	  // keep track of keyboard presses
		var game = new Game(WIDTH, HEIGHT, ctx);
	  game.start(ctx);
	}
	
	
	main();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Barrel = __webpack_require__(2);
	var Beam = __webpack_require__(5);
	var MovingObject = __webpack_require__(3);
	var Utils = __webpack_require__(4);
	var Ladder = __webpack_require__(6);
	var Player = __webpack_require__(7);
	
	var Game = function (DIM_X, DIM_Y, ctx) {
	  this.DIM_X = DIM_X;
	  this.DIM_Y = DIM_Y;
	  this.gameOver = false;
	  this.gameWon = false;
	  this.barrels = [];
	  this.addBarrel();
	  this.player = new Player({
	      pos: [this.DIM_X * 0.02, this.DIM_Y * 0.89],
	      game:this
	    });
	  this.start(ctx);
	};
	
	Game.prototype.start = function (ctx) {
	  var keystate = {};
	  // keep track of keyboard presses
	  document.addEventListener("keydown", function(e) {
	    keystate[e.keyCode] = true;
	  });
	  document.addEventListener("keyup", function(e) {
	    delete keystate[e.keyCode];
	  });
	  var idx = 0;
	  var animateCallback = function(){
	    this.step(keystate);
	    this.draw(ctx);
	    if (idx === 200) {
	      this.addBarrel(ctx);
	      idx = 0;
	    }
	    idx ++;
	
	    requestAnimationFrame(animateCallback);
	
	  }.bind(this);
	
	  animateCallback();
	};
	
	Game.prototype.addBarrel = function(ctx) {
	   this.barrels.push(new Barrel({game: this, speed: 1, DIM_X: this.DIM_X, DIM_Y: this.DIM_Y}));
	};
	// if (this.gameStart) {
	//   if(!this.instructionsRendered) {
	//     ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
	//     ctx.fillStyle = "black";
	//     ctx.fillRect(0,0,this.DIM_X,this.DIM_Y);
	//     ctx.beginPath();
	//     ctx.font = "bold 35px Inconsolata";
	//     ctx.fillStyle = "yellow";
	//     ctx.fillText("GET BLOCKO HOME!!!", this.DIM_X/5, this.DIM_Y/10);
	//     ctx.fillText("be sure to avoid the balls!!!", this.DIM_X/5, this.DIM_Y*2/10);
	//     ctx.fillText("don't hit the walls!!!", this.DIM_X/5, this.DIM_Y*3/10);
	//     ctx.fillText("Instructions:", this.DIM_X/5, this.DIM_Y*4/10);
	//     ctx.fillText("[←] to move blocko left", this.DIM_X/5, this.DIM_Y*5/10);
	//     ctx.fillText("[→] to move blocko right", this.DIM_X/5, this.DIM_Y*6/10);
	//     ctx.fillText("[↑] to climb the ladder", this.DIM_X/5, this.DIM_Y*7/10);
	//     ctx.fillText("[space] to jump", this.DIM_X/5, this.DIM_Y*8/10);
	//     ctx.fillText("press [enter] to start", this.DIM_X/5, this.DIM_Y*9/10);
	//     ctx.closePath();
	//   }
	
	Game.prototype.draw = function(ctx) {
	  if (this.gameWon) {
	    ctx.beginPath();
	    ctx.font = "120px Inconsolata";
	    ctx.fillStyle = "#0000FF";
	    ctx.fillText("Game Won!", this.DIM_X/5, this.DIM_Y/2);
	    ctx.closePath();
	  } else if (this.gameOver) {
	    ctx.beginPath();
	    ctx.font = "120px Inconsolata";
	    ctx.fillStyle = "#0000FF";
	    ctx.fillText("Game Over", this.DIM_X/5, this.DIM_Y/2);
	    ctx.closePath();
	
	  } else {
	
	    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
	    ctx.fillStyle = "orange";
	    ctx.fillRect(0,0,this.DIM_X,this.DIM_Y);
	    ctx.fillStyle = "black";
	    ctx.fillRect(4,4,this.DIM_X-8,this.DIM_Y-8);
	    //home
	    ctx.beginPath();
	    ctx.fillStyle = "#993300";
	    ctx.fillRect(this.DIM_X/30,this.DIM_Y/22.5,this.DIM_X/18,this.DIM_Y/18);
	    ctx.closePath();
	    ctx.beginPath();
	    ctx.fillStyle = "#993300";
	    ctx.moveTo(this.DIM_X/36, this.DIM_Y/22.5);
	    ctx.lineTo(this.DIM_X/10.59, this.DIM_Y/22.5);
	    ctx.lineTo(this.DIM_X/16.36, this.DIM_Y/90);
	    ctx.fill();
	    // grid
	    for (var i = 0; i < 9; i++) {
	      ctx.beginPath();
	      ctx.strokeStyle = "white";
	      ctx.moveTo(0, this.DIM_Y * (i+1)/9);
	      ctx.lineTo(this.DIM_X ,this.DIM_Y * (i+1)/9);
	      ctx.lineWidth = 0.5;
	      ctx.stroke();
	      ctx.closePath();
	    }
	    for (var i = 0; i < 9; i++) {
	      ctx.beginPath();
	      ctx.strokeStyle = "white";
	      ctx.moveTo(this.DIM_X * (i+1)/9, 0);
	      ctx.lineTo(this.DIM_X * (i+1)/9,this.DIM_Y);
	      ctx.lineWidth = 0.5;
	      ctx.stroke();
	      ctx.closePath();
	    }
	    var beam1 = new Beam({
	      startPos: [0, this.DIM_Y * 0.1],
	      endPos: [this.DIM_X  * 0.8, this.DIM_Y * 0.15],
	      game: this
	    });
	    var beam2 = new Beam({
	      startPos: [this.DIM_X * 0.2, this.DIM_Y * 0.3],
	      endPos: [this.DIM_X, this.DIM_Y * 0.25],
	      game: this
	    });
	    var beam3 = new Beam({
	      startPos: [0, this.DIM_Y * 0.4],
	      endPos: [this.DIM_X  * 0.8, this.DIM_Y * 0.45],
	      game: this
	    });
	    var beam4 = new Beam({
	      startPos: [this.DIM_X * 0.2, this.DIM_Y * 0.6 ],
	      endPos: [this.DIM_X , this.DIM_Y * 0.55],
	      game: this
	    });
	    var beam5 = new Beam({
	      startPos: [0, this.DIM_Y * 0.7],
	      endPos: [this.DIM_X  * 0.8, this.DIM_Y * 0.75],
	      game: this
	    });
	    var beam6 = new Beam({
	      startPos: [0, this.DIM_Y * 0.90],
	      endPos: [this.DIM_X, this.DIM_Y * 0.85 ],
	      game: this
	    });
	
	    beam1.draw(ctx);
	    beam2.draw(ctx);
	    beam3.draw(ctx);
	    beam4.draw(ctx);
	    beam5.draw(ctx);
	    beam6.draw(ctx);
	
	    var ladder1 = new Ladder({
	      pos: [this.DIM_X * 0.7278, this.DIM_Y * 0.1444],
	      game: this
	    });
	    var ladder2 = new Ladder({
	      pos: [this.DIM_X * 0.255, this.DIM_Y * 0.2944],
	      game: this
	    });
	    var ladder3 = new Ladder({
	      pos: [this.DIM_X * 0.7278, this.DIM_Y * 0.4444],
	      game: this
	    });
	    var ladder4 = new Ladder({
	      pos: [this.DIM_X * 0.255, this.DIM_Y * 0.5944],
	      game: this
	    });
	    var ladder5 = new Ladder({
	      pos: [this.DIM_X * 0.7278, this.DIM_Y * 0.7444],
	      game: this
	    });
	
	    ladder1.draw(ctx);
	    ladder2.draw(ctx);
	    ladder3.draw(ctx);
	    ladder4.draw(ctx);
	    ladder5.draw(ctx);
	
	    this.player.draw(ctx);
	
	    for (var i = 0; i < this.barrels.length; i++) {
	      this.barrels[i].draw(ctx);
	    }
	
	  }
	};
	
	Game.prototype.moveObjects = function(){
	  for (var i = 0; i < this.barrels.length; i++) {
	    this.barrels[i].move(this.barrels[i].pos, this.barrels[i].vel);
	  }
	};
	//
	Game.prototype.step = function(keystate){
	  this.moveObjects();
	  this.player.move(keystate);
	  this.checkCollisions();
	  for (var i = 0; i < this.barrels.length; i++) {
	    if(this.barrels[0].pos[1] > this.DIM_Y){
	      this.barrels = this.barrels.splice(1,this.barrels.length);
	    }
	  }
	};
	
	Game.prototype.allObjects = function () {
	  return [].concat(this.ships, this.asteroids, this.bullets);
	};
	
	var distance = function(pos1, pos2) {
	  var first = (pos1[0]- pos2[0]) * (pos1[0]- pos2[0]);
	  var second = (pos1[1]- pos2[1]) * (pos1[1]- pos2[1]);
	  return Math.sqrt(first + second);
	};
	
	Game.prototype.checkCollisions = function () {
	  var game = this;
	  for (var i = 0; i < this.barrels.length; i++) {
	    if (distance(this.barrels[i].pos,  this.player.pos) < 23){
	      this.gameOver = true;
	    }
	  }
	  if (this.player.pos[0] < 5 || this.player.pos[0] > this.DIM_X - 5 ||
	    this.player.pos[1] < 5 || this.player.pos[1] > this.DIM_Y - 5 ) {
	    this.gameOver = true;
	  }
	  if (this.player.pos[0] > 5 && this.player.pos[0] < this.DIM_X/10 &&
	    this.player.pos[1] > 5 && this.player.pos[1] < this.DIM_Y/9 ) {
	    this.gameWon = true;
	  }
	};
	
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var MovingObject = __webpack_require__(3);
	var Utils = __webpack_require__(4);
	
	
	function Barrel(posArg) {
	  this.pos = posArg["pos"];
	  this.game = posArg["game"];
	  this.color = "#FFA500";
	  this.radius = 10;
	  this.pos = [45, 70];
	  this.vel = [2.025, 0.1323];
	  this.speed = posArg["speed"];
	  this.DIM_X = posArg["DIM_X"];
	  this.DIM_Y = posArg["DIM_Y"];
	}
	
	Barrel.prototype.draw = function (ctx) {
	  ctx.fillStyle = this.color;
	  ctx.strokeStyle = this.color;
	  ctx.beginPath();
	  ctx.arc(
	    this.pos[0],
	    this.pos[1],
	    this.radius,
	    0,
	    2 * Math.PI,
	    false);
	  ctx.stroke();
	  ctx.closePath();
	  ctx.fill();
	};
	
	Barrel.prototype.move = function(pos, vel) {
	  // level top
	  if (Math.floor(pos[0]) < this.DIM_X * 0.8056 && Math.floor(pos[1]) <= this.DIM_Y * 0.1278 ) {
	    vel = [this.DIM_X * 0.00225, this.DIM_Y * 0.000147];
	    // level 5
	  } else if (Math.floor(pos[1]) > this.DIM_Y * 0.236 && Math.floor(pos[1]) < this.DIM_Y * 0.278 ) {
	    vel = [-this.DIM_X * 0.00225, this.DIM_Y * 0.000147];
	    // level 4
	  } else if (Math.floor(pos[1]) > this.DIM_Y * 0.3876 && Math.floor(pos[1]) < this.DIM_Y * 0.435 ) {
	    vel = [this.DIM_X * 0.00225, this.DIM_Y * 0.000147];
	    // level 3
	  } else if (Math.floor(pos[1]) > 478 && Math.floor(pos[1]) < 519 ) {
	    vel = [-this.DIM_X * 0.00225, this.DIM_Y * 0.000147];
	    // level 2
	  } else if (Math.floor(pos[1]) > 613 && Math.floor(pos[1]) < 654 ) {
	    vel = [this.DIM_X * 0.00225, this.DIM_Y * 0.000147];
	    // level bottom
	  } else if (Math.floor(pos[1]) > 745 && Math.floor(pos[1]) < 786 ) {
	    vel = [-this.DIM_X * 0.00225, this.DIM_Y * 0.000147];
	    //fall right
	  } else if (Math.floor(pos[0]) >= this.DIM_X * 0.8033 && Math.floor(pos[0]) <= this.DIM_Y * 0.8222 ){
	    vel = [0,this.DIM_Y * 0.00222222222];
	    //fall left
	  } else if (Math.floor(pos[0]) >= this.DIM_X * 0.1611 && Math.floor(pos[0]) <= this.DIM_Y * 0.1889 ){
	    vel = [0,this.DIM_Y * 0.00222222222];
	  }
	  this.pos =[ pos[0]+vel[0],  pos[1]+vel[1]];
	};
	
	Barrel.prototype.collideWith = function(otherObject){
	  // this.game.remove(this);
	  // this.game.remove(otherObject);
	};
	
	Barrel.prototype.isCollidedWith = function(otherObject) {
	  var xPos = this.pos[0] - otherObject.pos[0];
	  var yPos = this.pos[1] - otherObject.pos[1];
	  var distance = Math.pow( (Math.pow(xPos, 2) + Math.pow(yPos, 2)), 0.5);
	  if ((distance < (this.radius + otherObject.radius)) && (this !== otherObject)) {
	    this.collideWith(otherObject);
	  }
	};
	
	
	module.exports = Barrel;


/***/ },
/* 3 */
/***/ function(module, exports) {

	var MovingObject = function(moArgs) {
	  this.pos = moArgs["pos"];
	  this.vel = moArgs["vel"];
	  this.RADIUS = moArgs["radius"];
	  this.COLOR = moArgs["color"];
	  this.game = moArgs["game"];
	};
	
	MovingObject.prototype.move = function(pos, vel) {
	  this.pos =[ pos[0]+vel[0],  pos[1]+vel[1]];
	};
	
	MovingObject.prototype.collideWith = function(otherObject){
	  // this.game.remove(this);
	  // this.game.remove(otherObject);
	};
	
	MovingObject.prototype.isCollidedWith = function(otherObject) {
	  var xPos = this.pos[0] - otherObject.pos[0];
	  var yPos = this.pos[1] - otherObject.pos[1];
	  var distance = Math.pow( (Math.pow(xPos, 2) + Math.pow(yPos, 2)), 0.5);
	  if ((distance < (this.RADIUS + otherObject.RADIUS)) && (this !== otherObject)) {
	    this.collideWith(otherObject);
	  }
	};
	
	MovingObject.prototype.draw = function (ctx) {
	  ctx.beginPath();
	  ctx.strokeStyle = this.COLOR;
	  ctx.fillStyle = this.COLOR;
	  ctx.arc(
	    this.pos[0],
	    this.pos[1],
	    this.RADIUS,
	    0,
	    2 * Math.PI,
	    false);
	  ctx.stroke();
	  ctx.fill();
	  ctx.closePath();
	};
	
	module.exports = MovingObject;


/***/ },
/* 4 */
/***/ function(module, exports) {

	var Utils = {};
	Utils.inherits = function(ChildClass, ParentClass) {
	  function Surgate() {}
	  Surgate.prototype = ParentClass.prototype;
	  ChildClass.prototype = new Surgate;
	
	};
	
	Utils.randVector = function(length) {
	  var posNeg = (Math.pow(-1, Math.round(Math.random()*10)));
	  do{
	    var x = Math.round(Math.random()*length)*posNeg;
	  } while(x === 0);
	  posNeg = (Math.pow(-1, Math.round(Math.random()*10)));
	  do{
	    var y = Math.round(Math.random()*length)*posNeg;
	  } while(y === 0);
	  return [ x, y ];
	};
	
	
	Utils.randPos = function(dimX, dimY) {
	  return [Math.round(Math.random()*dimX), Math.round(Math.random()*dimY)];
	};
	
	module.exports = Utils;


/***/ },
/* 5 */
/***/ function(module, exports) {

	var Beam = function(options) {
	  this.startPos = options["startPos"];
	  this.endPos = options["endPos"];
	  this.color = "#F00";
	  this.game = options["game"];
	};
	
	
	
	Beam.prototype.collideWith = function(otherObject){
	  // this.game.remove(this);
	  // this.game.remove(otherObject);
	};
	
	Beam.prototype.draw = function (ctx) {
	  ctx.beginPath();
	  ctx.strokeStyle = this.color;
	  ctx.moveTo(this.startPos[0],this.startPos[1]);
	  ctx.lineTo(this.endPos[0],this.endPos[1]);
	  ctx.lineWidth = 10;
	  ctx.stroke();
	  ctx.closePath();
	};
	
	module.exports = Beam;


/***/ },
/* 6 */
/***/ function(module, exports) {

	var Ladder = function(options) {
	  this.pos = options["pos"];
	  this.color = "#FFF";
	  this.game = options["game"];
	};
	
	Ladder.prototype.draw = function (ctx) {
	  ctx.beginPath();
	  ctx.strokeStyle = this.color;
	  ctx.moveTo(this.pos[0],this.pos[1]);
	  ctx.lineTo(this.pos[0],this.pos[1]+80);
	  ctx.lineWidth = 20;
	  ctx.stroke();
	  ctx.closePath();
	};
	
	module.exports = Ladder;


/***/ },
/* 7 */
/***/ function(module, exports) {

	var Player = function(options) {
	  this.pos = options["pos"];
	  this.color = "#79CDCD";
	  this.game = options["game"];
	  this.vel = [0,0];
	  this.jumping = false;
	  this.timeJumping = 0;
	  this.beforeClimbingPos = [0,0];
	  this.climbing = false;
	  this.fall = false;
	  this.timeFalling = 0;
	};
	
	Player.prototype.draw = function (ctx) {
	  //body
	  ctx.beginPath();
	  ctx.strokeStyle = this.color;
	  ctx.lineWidth = 12;
	  ctx.moveTo(this.pos[0],this.pos[1]-25);
	  ctx.lineTo(this.pos[0],this.pos[1]-50);
	  ctx.stroke();
	  ctx.closePath();
	  // //arms
	  ctx.beginPath();
	  ctx.strokeStyle = this.color;
	  ctx.lineWidth = 6;
	  ctx.moveTo(this.pos[0] + 15,this.pos[1]-35);
	  ctx.lineTo(this.pos[0] + 11,this.pos[1]-50);
	  ctx.stroke();
	  ctx.closePath();
	  ctx.beginPath();
	  ctx.strokeStyle = this.color;
	  ctx.lineWidth = 6;
	  ctx.moveTo(this.pos[0] -14,this.pos[1]-35);
	  ctx.lineTo(this.pos[0] -10,this.pos[1]-50);
	  ctx.stroke();
	  ctx.closePath();
	  // legs
	  ctx.beginPath();
	  ctx.strokeStyle = this.color;
	  ctx.lineWidth = 6;
	  ctx.moveTo(this.pos[0] + 7,this.pos[1]+2);
	  ctx.lineTo(this.pos[0] + 3,this.pos[1]-22);
	  ctx.stroke();
	  ctx.closePath();
	  ctx.beginPath();
	  ctx.strokeStyle = this.color;
	  ctx.lineWidth = 6;
	  ctx.moveTo(this.pos[0] -7,this.pos[1]+2);
	  ctx.lineTo(this.pos[0] -3,this.pos[1]-22);
	  ctx.stroke();
	  ctx.closePath();
	  // // head
	  ctx.beginPath();
	  ctx.strokeStyle = this.color;
	  ctx.lineWidth = 10;
	  ctx.moveTo(this.pos[0],this.pos[1] - 55);
	  ctx.lineTo(this.pos[0],this.pos[1] - 65);
	  ctx.stroke();
	  ctx.closePath();
	};
	
	var UpArrow = 38;
	var DownArrow = 40;
	var LeftArrow = 37;
	var RightArrow = 39;
	var space = 32;90
	var climbingPos = function (pos) {
	  if (pos[0] > 645 && pos[0] < 675 && pos[1] > 740 && pos[1] < 790) {
	    return true;
	  }
	  if (pos[0] > 210 && pos[0] < 240 && pos[1] > 600 && pos[1] < 650) {
	    return true;
	  }
	  if (pos[0] > 645 && pos[0] < 675 && pos[1] > 475 && pos[1] < 525) {
	    return true;
	  }
	  if (pos[0] > 210 && pos[0] < 240 && pos[1] > 360 && pos[1] < 395) {
	    return true;
	  }
	  if (pos[0] > 645 && pos[0] < 675 && pos[1] > 200 && pos[1] < 249) {
	    return true;
	  }
	  return false;
	};
	
	var move = function (pos, keystate) {
	  var vel = [0,0];
	  if (Math.floor(pos[1]) < 190 && Math.floor(pos[1]) > 0 &&
	  (keystate[RightArrow] || keystate[LeftArrow])) {
	    if (keystate[RightArrow] ) {
	      vel = [2.025, 0.120];
	    } else if ( keystate[LeftArrow]) {
	      vel = [-2.025, -0.120];
	    }
	  } else if (Math.floor(pos[1]) > 200 && Math.floor(pos[1]) < 310 &&
	  (keystate[RightArrow] || keystate[LeftArrow])) {
	    if (keystate[RightArrow] ) {
	      vel = [2.025, -0.120];
	    } else if ( keystate[LeftArrow]) {
	      vel = [-2.025, 0.120];
	    }
	  } else if (Math.floor(pos[1]) > 320 && Math.floor(pos[1]) < 450 &&
	  (keystate[RightArrow] || keystate[LeftArrow])) {
	    if (keystate[RightArrow] ) {
	      vel = [2.025, 0.120];
	    } else if ( keystate[LeftArrow]) {
	      vel = [-2.025, -0.120];
	    }
	  } else if (Math.floor(pos[1]) > 455 && Math.floor(pos[1]) < 600 &&
	  (keystate[RightArrow] || keystate[LeftArrow])) {
	    if (keystate[RightArrow] ) {
	      vel = [2.025, -0.120];
	    } else if ( keystate[LeftArrow]) {
	      vel = [-2.025, 0.120];
	    }
	  } else if (Math.floor(pos[1]) > 600 && Math.floor(pos[1]) < 720 &&
	  (keystate[RightArrow] || keystate[LeftArrow])) {
	    if (keystate[RightArrow] ) {
	      vel = [2.025, 0.120];
	    } else if ( keystate[LeftArrow]) {
	      vel = [-2.025, -0.120];
	    }
	  } else if (Math.floor(pos[1]) > 720 && Math.floor(pos[1]) < 900 &&
	  (keystate[RightArrow] || keystate[LeftArrow])) {
	    if (keystate[RightArrow] ) {
	      vel = [2.025, -0.110];
	    } else if ( keystate[LeftArrow]) {
	      vel = [-2.025, 0.110];
	    }
	  } else {
	
	    vel = [0,0];
	  }
	
	  return vel;
	};
	
	Player.prototype.move = function (keystate) {
	
	  if (Math.floor(this.pos[0]) >= 723 && Math.floor(this.pos[0]) <= 880 &&
	      this.vel[1] > 0 ){
	    if (Math.floor(this.pos[1] <= 683) && Math.floor(this.pos[1] >= 653)){
	      this.fall = true;
	    }
	    if (Math.floor(this.pos[1] <= 415) && Math.floor(this.pos[1] >= 385)){
	      this.fall = true;
	    }
	    if (Math.floor(this.pos[1] <= 150) && Math.floor(this.pos[1] >= 100)){
	      this.fall = true;
	    }
	  } else if (Math.floor(this.pos[0]) >= 20 && Math.floor(this.pos[0]) <= 170 &&
	      this.vel[1] > 0 ){
	    if (Math.floor(this.pos[1] <= 550) && Math.floor(this.pos[1] >= 520)){
	      this.fall = true;
	    }
	    if (Math.floor(this.pos[1] <= 281) && Math.floor(this.pos[1] >= 240)){
	      this.fall = true;
	    }
	  }
	  if (climbingPos(this.pos) && keystate[UpArrow] && !this.climbing) {
	    this.climbing = true;
	    this.beforeClimbingPos = this.pos;
	    this.climbingCounter = 0;
	  }
	  if (keystate[space] && this.jumping == false) {
	    this.timeJumping ++;
	    if (this.timeJumping >= 5) {
	      this.jumping = keystate[space];
	      if (this.vel[0] == 0) {
	        this.velStore = [0,0];
	      } else {
	        this.velStore = this.vel;
	      }
	      this.timeJumping = 0;
	    }
	  }
	  if (this.fall) {
	    this.timeFalling ++;
	    if (this.timeFalling > 0 && this.timeFalling < 25.9 ) {
	      this.vel = [0,3.96];
	    } else if (this.timeFalling > 25.9) {
	      this.fall = false;
	      this.timeFalling = 0;
	      this.vel = [0,0];
	    }
	
	  } else if (this.climbing) {
	    if (keystate[UpArrow]) {
	      this.vel = [0,-2];
	    } else if (keystate[DownArrow]) {
	      if (this.pos[1] < this.beforeClimbingPos[1]) {
	        this.vel = [0,1];
	      }
	      if (this.pos[1] > this.beforeClimbingPos[1]) {
	        this.pos = this.beforeClimbingPos;
	        this.vel = [0,0]
	        this.climbing = false;
	      }
	    } else {
	      this.vel = [0,0]
	    }
	    if (this.beforeClimbingPos[1]- this.pos[1] >= 107 ) {
	      this.pos = [this.beforeClimbingPos[0], this.beforeClimbingPos[1]-107];
	      this.climbingCounter ++;
	    }
	    if (this.climbingCounter > 5) {
	      this.vel = 0;
	      this.climbingCounter = 0;
	      this.climbing = false;
	    }
	  } else if (this.jumping) {
	    this.timeJumping ++;
	    if (this.timeJumping > 0 && this.timeJumping < 30) {
	      this.vel = [this.velStore[0]*0.5, -2.3 + this.velStore[1]*0.5];
	    }
	    if (this.timeJumping > 30 && this.timeJumping < 40) {
	        this.vel = [this.velStore[0]*0.5, 0 + this.velStore[1]*0.5];
	
	    }
	    if (this.timeJumping > 40 && this.timeJumping < 80){
	      this.vel = [0,2.3];
	        this.vel = [this.velStore[0]*0.5, 2.3 + this.velStore[1]*0.5];
	
	    }
	    if (this.timeJumping > 70) {
	      this.jumping = false;
	      this.timeJumping = 0;
	      this.vel = [0,0];
	    }
	  } else {
	    this.vel = move(this.pos, keystate);
	
	  }
	  var tempPos = [ this.pos[0]+this.vel[0],  this.pos[1]+this.vel[1]];
	  if (tempPos[0] > 0 && tempPos[0] < 900 && tempPos[1] > 0 && tempPos[1] < 900) {
	    this.pos = tempPos;
	  } else {
	    if (tempPos[0] > 0 && tempPos[0] < 900) {
	      this.pos[0] = tempPos[0];
	    }
	    if (tempPos[1] > 0 && tempPos[1] < 900) {
	      this.pos[1] = tempPos[1];
	    }
	  }
	};
	
	module.exports = Player;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map