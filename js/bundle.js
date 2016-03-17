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
	  this.hitCounter = 0;
	  this.barrels = [];
	  this.addBarrel();
	  this.lifeTimer = 0;
	  this.instructionsRendered = false;
	  this.player = new Player({
	      pos: [this.DIM_X * 0.12, this.DIM_Y * 0.885],
	      DIM_X: this.DIM_X,
	      DIM_Y: this.DIM_Y,
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
	   this.barrels.push(new Barrel({game: this, DIM_X: this.DIM_X, DIM_Y: this.DIM_Y}));
	};
	
	Game.prototype.draw = function(ctx) {
	
	  if(!this.instructionsRendered) {
	    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
	    ctx.fillStyle = "black";
	    ctx.fillRect(0,0,this.DIM_X,this.DIM_Y);
	    ctx.beginPath();
	    ctx.font = "bold 35px Inconsolata";
	    ctx.fillStyle = "yellow";
	    ctx.fillText("GET BLOCKO HOME!!!", this.DIM_X/5, this.DIM_Y/10);
	    ctx.fillText("be sure to avoid the balls!!!", this.DIM_X/5, this.DIM_Y*2/10);
	    ctx.fillText("don't hit the walls!!!", this.DIM_X/5, this.DIM_Y*3/10);
	    ctx.fillText("Instructions:", this.DIM_X/5, this.DIM_Y*4/10);
	    ctx.fillText("[←] to move blocko left", this.DIM_X/5, this.DIM_Y*5/10);
	    ctx.fillText("[→] to move blocko right", this.DIM_X/5, this.DIM_Y*6/10);
	    ctx.fillText("[↑] to climb the ladder", this.DIM_X/5, this.DIM_Y*7/10);
	    ctx.fillText("[space] to jump", this.DIM_X/5, this.DIM_Y*8/10);
	    ctx.fillText("press [enter] to start", this.DIM_X/5, this.DIM_Y*9/10);
	    ctx.closePath();
	  } else if (this.gameWon) {
	    ctx.beginPath();
	    ctx.font = "120px Inconsolata";
	    ctx.fillStyle = "#0000FF";
	    ctx.fillText("Game Won!", this.DIM_X/7, this.DIM_Y/2);
	    ctx.closePath();
	    ctx.beginPath();
	    ctx.font = "50px Inconsolata";
	    ctx.fillStyle = "#0000FF";
	    ctx.fillText("press [enter] to restart", this.DIM_X/13, this.DIM_Y*3/4);
	    ctx.closePath();
	  } else if (this.gameOver) {
	    ctx.beginPath();
	    ctx.font = "130px Inconsolata";
	    ctx.fillStyle = "#0000FF";
	    ctx.fillText("Game Over", this.DIM_X/8, this.DIM_Y/2);
	    ctx.closePath();
	    ctx.beginPath();
	    ctx.font = "50px Inconsolata";
	    ctx.fillStyle = "#0000FF";
	    ctx.fillText("press [enter] to restart", this.DIM_X/13, this.DIM_Y*3/4);
	    ctx.closePath();
	
	  } else {
	
	    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
	    ctx.fillStyle = "orange";
	    ctx.fillRect(0,0,this.DIM_X,this.DIM_Y);
	    ctx.fillStyle = "black";
	    ctx.fillRect(4,4,this.DIM_X-8,this.DIM_Y-8);
	    //lives
	    ctx.font = "bold 45px";
	    ctx.fillStyle = "#FF69B4";
	    var tempString = ""
	    for (var i = 0; i < (3 - this.hitCounter); i++) {
	      tempString += "♥ ";
	    }
	    ctx.fillText(tempString, this.DIM_X*4/5, this.DIM_Y/14);
	    ctx.closePath();
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
	      game: this,
	      DIM_X: this.DIM_X,
	      DIM_Y: this.DIM_Y
	    });
	    var ladder2 = new Ladder({
	      pos: [this.DIM_X * 0.255, this.DIM_Y * 0.2944],
	      game: this,
	      DIM_X: this.DIM_X,
	      DIM_Y: this.DIM_Y
	    });
	    var ladder3 = new Ladder({
	      pos: [this.DIM_X * 0.7278, this.DIM_Y * 0.4444],
	      game: this,
	      DIM_X: this.DIM_X,
	      DIM_Y: this.DIM_Y
	    });
	    var ladder4 = new Ladder({
	      pos: [this.DIM_X * 0.255, this.DIM_Y * 0.5944],
	      game: this,
	      DIM_X: this.DIM_X,
	      DIM_Y: this.DIM_Y
	    });
	    var ladder5 = new Ladder({
	      pos: [this.DIM_X * 0.7278, this.DIM_Y * 0.7444],
	      game: this,
	      DIM_X: this.DIM_X,
	      DIM_Y: this.DIM_Y
	    });
	
	    ladder1.draw(ctx);
	    ladder2.draw(ctx);
	    ladder3.draw(ctx);
	    ladder4.draw(ctx);
	    ladder5.draw(ctx);
	
	    this.player.draw(ctx);
	    this.lifeTimer++;
	
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
	  if (!this.instructionsRendered) {
	    if (keystate[13] === true) {
	      this.instructionsRendered = true;
	    }
	  } else if (this.gameOver || this.gameWon) {
	    if (keystate[13] === true) {
	      this.gameOver = false;
	      this.gameWon = false;
	      this.player.setPos([this.DIM_X * 0.12, this.DIM_Y * 0.885]);
	      this.hitCounter = 0;
	    }
	  } else {
	    this.player.move(keystate);
	  }
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
	    if (distance(this.barrels[i].pos,  this.player.pos) < this.DIM_X*0.02555){
	      if (this.lifeTimer > 100) {
	        this.lifeTimer = 0;
	        this.hitCounter ++;
	        this.player.setPos([this.DIM_X * 0.12, this.DIM_Y * 0.885]);
	      }
	      if (this.hitCounter === 3) {
	        this.gameOver = true;
	      }
	    }
	  }
	  if (this.player.pos[0] < 5 || this.player.pos[0] > this.DIM_X - 5 ||
	    this.player.pos[1] < 5 || this.player.pos[1] > this.DIM_Y - 5 ) {
	      if (this.lifeTimer > 100) {
	        this.lifeTimer = 0;
	        this.hitCounter ++;
	        this.player.setPos([this.DIM_X * 0.12, this.DIM_Y * 0.885]);
	      }
	      if (this.hitCounter === 3) {
	        this.gameOver = true;
	      }
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
	  this.DIM_X = posArg["DIM_X"];
	  this.DIM_Y = posArg["DIM_Y"];
	  this.radius = this.DIM_X /90;
	  this.pos = [this.DIM_X/20, this.DIM_Y * 7/90];
	  this.vel = [this.DIM_X * 0.00225, this.DIM_Y * 0.000147];
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
	  var yPos = Math.floor(pos[1]);
	  var xPos = Math.floor(pos[0]);
	  if (xPos < this.DIM_X * 0.8056 && yPos <= this.DIM_Y * 0.1278 ) {
	    vel = [this.DIM_X * 0.00225, this.DIM_Y * 0.000147];
	    // level 5
	  } else if (yPos > this.DIM_Y * 0.236 && yPos < this.DIM_Y * 0.278 ) {
	    vel = [-this.DIM_X * 0.00225, this.DIM_Y * 0.000147];
	    // level 4
	  } else if (yPos > this.DIM_Y * 0.3876 && yPos < this.DIM_Y * 0.428 ) {
	    vel = [this.DIM_X * 0.00225, this.DIM_Y * 0.000147];
	    // level 3
	  } else if (yPos > this.DIM_Y * 0.537 && yPos < this.DIM_Y * 0.580 ) {
	    vel = [-this.DIM_X * 0.00225, this.DIM_Y * 0.000147];
	    // level 2
	  } else if (yPos > this.DIM_Y * 0.686 && yPos < this.DIM_Y * 0.7266 ) {
	    vel = [this.DIM_X * 0.00225, this.DIM_Y * 0.000147];
	    // level bottom
	  } else if (yPos > this.DIM_Y * 0.833 && yPos < this.DIM_Y * 0.868 ) {
	    vel = [-this.DIM_X * 0.00225, this.DIM_Y * 0.00012];
	    //fall right
	  } else if (xPos >= this.DIM_X * 0.8033 && xPos <= this.DIM_Y * 0.8222 ){
	    vel = [0,this.DIM_Y * 0.00222222222];
	    //fall left
	  } else if (xPos >= this.DIM_X * 0.1611 && xPos <= this.DIM_Y * 0.1889 ){
	    vel = [0,this.DIM_Y * 0.00222222222];
	  }
	  this.pos =[ pos[0]+vel[0],  pos[1]+vel[1]];
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
	  this.DIM_X = options["DIM_X"];
	  this.DIM_Y = options["DIM_Y"];
	};
	
	Ladder.prototype.draw = function (ctx) {
	  ctx.beginPath();
	  ctx.strokeStyle = this.color;
	  ctx.moveTo(this.pos[0],this.pos[1]);
	  ctx.lineTo(this.pos[0],this.pos[1]+ this.DIM_X *8/90);
	  ctx.lineWidth = this.DIM_X/45;
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
	  this.DIM_X = options["DIM_X"];
	  this.DIM_Y = options["DIM_Y"];
	  this.vel = [0,0];
	  this.jumping = false;
	  this.timeJumping = 0;
	  this.beforeClimbingPos = [0,0];
	  this.climbing = false;
	  this.fall = false;
	  this.timeFalling = 0;
	};
	
	Player.prototype.setPos = function (newPos) {
	  this.pos = newPos;
	  this.vel = [0,0];
	  this.jumping = false;
	  this.timeJumping = 0;
	  this.beforeClimbingPos = [0,0];
	  this.climbing = false;
	  this.fall = false;
	  this.timeFalling = 0;
	};
	
	var UpArrow = 38;
	var DownArrow = 40;
	var LeftArrow = 37;
	var RightArrow = 39;
	var space = 32;
	var climbingPos = function (pos, DIM_X, DIM_Y) {
	  //level 1
	  if (pos[0] > DIM_X * 129/180 && pos[0] < DIM_X * 27/36  &&
	      pos[1] > DIM_Y * 37/45 && pos[1] < DIM_Y * 79/90) {
	    return true;
	  }
	  //level2
	  if (pos[0] > DIM_X *  0.2333 && pos[0] < DIM_X * 0.2666 &&
	     pos[1] > DIM_Y * 0.6666 && pos[1] < DIM_Y * 0.7222) {
	    return true;
	  }
	  //level3
	  if (pos[0] > DIM_X *  0.7166 && pos[0] < DIM_X *  0.75 &&
	     pos[1] > DIM_Y * 0.5277 && pos[1] < DIM_Y * 0.5833) {
	    return true;
	  }
	  //level4
	  if (pos[0] > DIM_X *  0.2333 && pos[0] < DIM_X *  0.2666 &&
	     pos[1] > DIM_Y * 0.4 && pos[1] < DIM_Y * 0.4388) {
	    return true;
	  }
	  //level5
	  if (pos[0] > DIM_X *  0.7166 && pos[0] < DIM_X *  0.75 &&
	     pos[1] > DIM_Y * 0.2222 && pos[1] < DIM_Y * 0.2766) {
	    return true;
	  }
	  return false;
	};
	
	var move = function (pos, keystate, DIM_X, DIM_Y) {
	  var vel = [0,0];
	  var xVel = DIM_X/444;
	  var yVel = DIM_X/7826;
	  var yPos = Math.floor(pos[1]);
	  if (keystate[space]) {
	  }
	  // level 6
	  if (yPos < (DIM_Y * 0.2111) && yPos > 0 &&
	  (keystate[RightArrow] || keystate[LeftArrow])) {
	    if (keystate[RightArrow] ) {
	      vel = [xVel, yVel];
	    } else if ( keystate[LeftArrow]) {
	      vel = [-xVel, -yVel];
	    }
	  // level 5
	} else if (yPos > (DIM_Y * 0.2222) && yPos < (DIM_Y * 0.34) &&
	    (keystate[RightArrow] || keystate[LeftArrow])) {
	      if (keystate[RightArrow] ) {
	        vel = [xVel, -yVel];
	      } else if ( keystate[LeftArrow]) {
	        vel = [-xVel, yVel];
	      }
	    // level 4
	  } else if (yPos > (DIM_Y * 0.3555) && yPos < (DIM_Y * 0.5) &&
	    (keystate[RightArrow] || keystate[LeftArrow])) {
	      if (keystate[RightArrow] ) {
	        vel = [xVel, yVel];
	      } else if ( keystate[LeftArrow]) {
	        vel = [-xVel, -yVel];
	      }
	    // level 3
	  } else if (yPos > (DIM_Y * 0.5055) && yPos < (DIM_Y * 0.65) &&
	    (keystate[RightArrow] || keystate[LeftArrow])) {
	      if (keystate[RightArrow] ) {
	        vel = [xVel, -yVel];
	      } else if ( keystate[LeftArrow]) {
	        vel = [-xVel, yVel];
	      }
	    // level 2
	  } else if (yPos > (DIM_Y * 0.6667) && yPos < (DIM_Y * 0.8) &&
	    (keystate[RightArrow] || keystate[LeftArrow])) {
	      if (keystate[RightArrow] ) {
	
	        vel = [xVel, yVel];
	      } else if ( keystate[LeftArrow]) {
	        vel = [-xVel, -yVel];
	      }
	    // level 1
	  } else if (yPos > (DIM_Y * 0.81) && yPos < DIM_Y &&
	    (keystate[RightArrow] || keystate[LeftArrow])) {
	      if (keystate[RightArrow] ) {
	        vel = [xVel, -yVel];
	      } else if ( keystate[LeftArrow]) {
	        vel = [-xVel, yVel];
	      }
	  } else {
	
	    vel = [0,0];
	  }
	
	  return vel;
	};
	
	Player.prototype.move = function (keystate) {
	  if (Math.floor(this.pos[0]) >= this.DIM_X * 0.8033 &&
	      Math.floor(this.pos[0]) <= this.DIM_X * 0.9777 &&
	      this.vel[1] > 0 ){
	    if (Math.floor(this.pos[1] <= this.DIM_Y * 0.7588) &&
	        Math.floor(this.pos[1] >= this.DIM_Y * 0.7255)){
	      this.fall = true;
	    }
	    if (Math.floor(this.pos[1] <= this.DIM_Y * 0.4611) &&
	        Math.floor(this.pos[1] >= this.DIM_Y * 0.4277)){
	      this.fall = true;
	    }
	    if (Math.floor(this.pos[1] <= this.DIM_Y * 0.1666) &&
	        Math.floor(this.pos[1] >= this.DIM_Y * 0.1111)){
	      this.fall = true;
	    }
	  } else if (Math.floor(this.pos[0]) >= this.DIM_X * 0.0222 &&
	      Math.floor(this.pos[0]) <= this.DIM_X * 0.1888 &&
	      this.vel[1] > 0 ){
	    if (Math.floor(this.pos[1] <= this.DIM_Y * 0.6111) &&
	        Math.floor(this.pos[1] >= this.DIM_Y * 0.5777)){
	      this.fall = true;
	    }
	    if (Math.floor(this.pos[1] <= this.DIM_Y * 0.3122) &&
	        Math.floor(this.pos[1] >= this.DIM_Y * 0.2666)){
	      this.fall = true;
	    }
	  }
	  if (climbingPos(this.pos, this.DIM_X, this.DIM_Y) && keystate[UpArrow] && !this.climbing) {
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
	      this.vel = [0,this.DIM_Y/227.2];
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
	    if (this.beforeClimbingPos[1]- this.pos[1] >= (this.DIM_Y*0.1205) ) {
	      this.pos = [this.beforeClimbingPos[0], this.beforeClimbingPos[1]-(this.DIM_Y*0.1205)];
	      this.vel = [0,0];
	      this.climbingCounter = 0;
	      this.climbing = false;
	    }
	  } else if (this.jumping) {
	    this.timeJumping ++;
	    if (this.timeJumping > 0 && this.timeJumping < 30) {
	      this.vel = [this.velStore[0]*0.5, -(this.DIM_Y/391) + this.velStore[1]*0.5];
	    }
	    if (this.timeJumping > 30 && this.timeJumping < 40) {
	        this.vel = [this.velStore[0]*0.5, 0 + this.velStore[1]*0.5];
	
	    }
	    if (this.timeJumping > 40 && this.timeJumping < 80){
	      this.vel = [this.velStore[0]*0.5, (this.DIM_Y/391) + this.velStore[1]*0.5];
	
	    }
	    if (this.timeJumping > 70) {
	      this.jumping = false;
	      this.timeJumping = 0;
	      this.vel = [0,0];
	    }
	  } else {
	    this.vel = move(this.pos, keystate, this.DIM_X, this.DIM_Y);
	
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
	
	Player.prototype.draw = function (ctx) {
	  //body
	  ctx.beginPath();
	  ctx.strokeStyle = this.color;
	  ctx.lineWidth = this.DIM_X/90;
	  ctx.moveTo(this.pos[0],this.pos[1] - (this.DIM_Y/36));
	  ctx.lineTo(this.pos[0],this.pos[1] - (this.DIM_Y/18));
	  ctx.stroke();
	  ctx.closePath();
	  // //arms
	  ctx.beginPath();
	  ctx.strokeStyle = this.color;
	  ctx.lineWidth = this.DIM_X/150;
	  ctx.moveTo(this.pos[0] + (this.DIM_X/60),this.pos[1] - (this.DIM_Y/25.7));
	  ctx.lineTo(this.pos[0] + (this.DIM_X/81),this.pos[1] - (this.DIM_Y/18));
	  ctx.stroke();
	  ctx.closePath();
	  ctx.beginPath();
	  ctx.strokeStyle = this.color;
	  ctx.lineWidth = this.DIM_X/150;
	  ctx.moveTo(this.pos[0] - (this.DIM_X/64),this.pos[1] - (this.DIM_Y/25.7));
	  ctx.lineTo(this.pos[0] - (this.DIM_X/90),this.pos[1] - (this.DIM_Y/18));
	  ctx.stroke();
	  ctx.closePath();
	  // legs
	  ctx.beginPath();
	  ctx.strokeStyle = this.color;
	  ctx.lineWidth = this.DIM_X/150;
	  ctx.moveTo(this.pos[0] + (this.DIM_X/129), this.pos[1] + (this.DIM_Y/450));
	  ctx.lineTo(this.pos[0] + (this.DIM_X/300), this.pos[1] - (this.DIM_Y/41));
	  ctx.stroke();
	  ctx.closePath();
	  ctx.beginPath();
	  ctx.strokeStyle = this.color;
	  ctx.lineWidth = this.DIM_X/150;
	  ctx.moveTo(this.pos[0] -(this.DIM_X/129),this.pos[1] + (this.DIM_Y/450));
	  ctx.lineTo(this.pos[0] -(this.DIM_X/300),this.pos[1] - (this.DIM_Y/40.9));
	  ctx.stroke();
	  ctx.closePath();
	  // // head
	  ctx.beginPath();
	  ctx.strokeStyle = this.color;
	  ctx.lineWidth = this.DIM_X/90;
	  ctx.moveTo(this.pos[0],this.pos[1] - (this.DIM_Y/16.36) );
	  ctx.lineTo(this.pos[0],this.pos[1] - (this.DIM_Y/13.846) );
	  ctx.stroke();
	  ctx.closePath();
	};
	module.exports = Player;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map