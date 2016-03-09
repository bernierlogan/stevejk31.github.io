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
	  this.barrels = [];
	  this.addBarrel();
	  this.player = new Player({
	      pos: [this.DIM_X * 0.02, this.DIM_Y * 0.90],
	      game:this
	    });
	  this.start(ctx);
	};
	
	Game.prototype.start = function (ctx) {
	  var keystate = {};
	  // keep track of keyboard presses
	  document.addEventListener("keydown", function(e) {
	    keystate[e.keyCode] = true;
	    console.log(e.keyCode);
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
	
	    //this will call our animateCallback again, but only when the browser
	    //is ready, usually every 1/60th of a second
	    requestAnimationFrame(animateCallback);
	
	    //if we didn't know about requestAnimationFrame, we could use setTimeout
	    //setTimeout(animateCallback, 1000/60);
	  }.bind(this);
	
	  //this will cause the first render and start the endless triggering of
	  //the function using requestAnimationFrame
	  animateCallback();
	};
	
	Game.prototype.addBarrel = function(ctx) {
	   this.barrels.push(new Barrel({game: this, speed: 1}));
	};
	
	Game.prototype.draw = function(ctx) {
	  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
	  ctx.fillStyle = "black";
	  ctx.fillRect(0,0,this.DIM_X,this.DIM_Y);
	
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
	    pos: [655, 130],
	    game: this
	  });
	  var ladder2 = new Ladder({
	    pos: [230, 265],
	    game: this
	  });
	  var ladder3 = new Ladder({
	    pos: [655, 400],
	    game: this
	  });
	  var ladder4 = new Ladder({
	    pos: [230, 535],
	    game: this
	  });
	  var ladder5 = new Ladder({
	    pos: [655, 670],
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
	    if (distance(this.barrels[i].pos,  this.player.pos) < 24){
	      console.log("you've been hit!");
	    }
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
	  //TODO change this so it just falls
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
	  if (Math.floor(pos[0]) < 725 && Math.floor(pos[1]) <= 115 ) {
	    this.vel = [2.025, 0.1323];
	  } else if (Math.floor(pos[1]) > 208 && Math.floor(pos[1]) < 249 ) {
	    this.vel = [-2.025, 0.1323];
	  } else if (Math.floor(pos[1]) > 343 && Math.floor(pos[1]) < 384 ) {
	    this.vel = [2.025, 0.1323];
	  } else if (Math.floor(pos[1]) > 478 && Math.floor(pos[1]) < 519 ) {
	    this.vel = [-2.025, 0.1323];
	  } else if (Math.floor(pos[1]) > 613 && Math.floor(pos[1]) < 654 ) {
	    this.vel = [2.025, 0.1323];
	  } else if (Math.floor(pos[1]) > 745 && Math.floor(pos[1]) < 786 ) {
	    this.vel = [-2.025, 0.1323];
	  } else if (Math.floor(pos[0]) >= 723 && Math.floor(pos[0]) <= 740 ){
	    this.vel = [0,2];
	  } else if (Math.floor(pos[0]) >= 145 && Math.floor(pos[0]) <= 170 ){
	    this.vel = [0,2];
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
	  this.level = 0;
	};
	
	Player.prototype.draw = function (ctx) {
	  ctx.beginPath();
	  ctx.strokeStyle = this.color;
	  ctx.moveTo(this.pos[0],this.pos[1]);
	  ctx.lineTo(this.pos[0],this.pos[1]-50);
	  ctx.lineWidth = 12;
	  ctx.stroke();
	  ctx.closePath();
	};
	
	var UpArrow = 38;
	var DownArrow = 40;
	var LeftArrow = 37;
	var RightArrow = 39;
	var space = 32;
	var climbingPos = function (pos) {
	  if (pos[0] > 645 && pos[0] < 667 && pos[1] > 762 && pos[1] < 779) {
	    return true;
	  }
	  if (pos[0] > 215 && pos[0] < 240 && pos[1] > 635 && pos[1] < 648) {
	    return true;
	  }
	  if (pos[0] > 645 && pos[0] < 667 && pos[1] > 492 && pos[1] < 515) {
	    return true;
	  }
	  if (pos[0] > 215 && pos[0] < 240 && pos[1] > 360 && pos[1] < 379) {
	    return true;
	  }
	  if (pos[0] > 645 && pos[0] < 667 && pos[1] > 218 && pos[1] < 247) {
	    return true;
	  }
	  return false;
	};
	
	var move = function (pos, keystate) {
	  var vel = [0,0];
	  if (Math.floor(pos[1]) < 150 && Math.floor(pos[1]) > 0 &&
	  (keystate[RightArrow] || keystate[LeftArrow])) {
	    if (keystate[RightArrow] ) {
	      vel = [2.025, 0.120];
	    } else if ( keystate[LeftArrow]) {
	      vel = [-2.025, -0.120];
	    }
	  } else if (Math.floor(pos[1]) > 208 && Math.floor(pos[1]) < 275 &&
	  (keystate[RightArrow] || keystate[LeftArrow])) {
	    if (keystate[RightArrow] ) {
	      vel = [2.025, -0.120];
	    } else if ( keystate[LeftArrow]) {
	      vel = [-2.025, 0.120];
	    }
	  } else if (Math.floor(pos[1]) > 305 && Math.floor(pos[1]) < 440 &&
	  (keystate[RightArrow] || keystate[LeftArrow])) {
	    if (keystate[RightArrow] ) {
	      vel = [2.025, 0.120];
	    } else if ( keystate[LeftArrow]) {
	      vel = [-2.025, -0.120];
	    }
	  } else if (Math.floor(pos[1]) > 425 && Math.floor(pos[1]) < 600 &&
	  (keystate[RightArrow] || keystate[LeftArrow])) {
	    if (keystate[RightArrow] ) {
	      vel = [2.025, -0.120];
	    } else if ( keystate[LeftArrow]) {
	      vel = [-2.025, 0.120];
	    }
	  } else if (Math.floor(pos[1]) > 620 && Math.floor(pos[1]) < 678 &&
	  (keystate[RightArrow] || keystate[LeftArrow])) {
	    if (keystate[RightArrow] ) {
	      vel = [2.025, 0.120];
	    } else if ( keystate[LeftArrow]) {
	      vel = [-2.025, -0.120];
	    }
	  } else if (Math.floor(pos[1]) > 740 && Math.floor(pos[1]) < 900 &&
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
	  if (keystate[81]) {
	    console.log(this.pos);
	
	  }
	  if (Math.floor(this.pos[0]) >= 723 && Math.floor(this.pos[0]) <= 740 && this.vel[1] > 0 && this.level > 0){
	    this.fall = true;
	  } else if (Math.floor(this.pos[0]) >= 145 && Math.floor(this.pos[0]) <= 170 && this.vel[1] > 0 && this.level > 0){
	    this.fall = true;
	  }
	  if (climbingPos(this.pos) && keystate[UpArrow] && !this.climbing) {
	    this.climbing = true;
	    this.beforeClimbingPos = this.pos;
	  }
	  if (keystate[space] && this.jumping == false) {
	    this.jumping = keystate[space];
	    this.velStore = this.vel;
	  }
	  if (this.fall) {
	    this.timeFalling ++;
	    if (this.timeFalling > 0 && this.timeFalling < 26 ) {
	      this.vel = [0,3.93];
	    } else if (this.timeFalling > 26) {
	      this.fall = false;
	      this.timeFalling = 0;
	      this.vel = [0,0];
	      this.level --;
	    }
	
	  } else if (this.climbing) {
	    if (this.beforeClimbingPos[1]- this.pos[1] >= 107 ) {
	      this.level ++;
	      this.climbing = false;
	    }
	    if (keystate[UpArrow]) {
	      this.vel = [0,-2];
	    } else if (keystate[DownArrow]) {
	      if (this.pos[1] < this.beforeClimbingPos[1]) {
	        this.vel = [0,2];
	      }
	      if (this.pos[1] > this.beforeClimbingPos[1]) {
	        this.pos = this.beforeClimbingPos;
	        this.vel = [0,0]
	        this.climbing = false;
	      }
	    } else {
	      this.vel = [0,0]
	      //
	    }
	  } else if (this.jumping) {
	    this.timeJumping ++;
	    if (this.timeJumping > 0 && this.timeJumping < 30) {
	      this.vel = [this.velStore[0],-2.3 + this.velStore[1]];
	    }
	    if (this.timeJumping > 30 && this.timeJumping < 40) {
	      this.vel = [this.velStore[0],0 + this.velStore[1]];
	    }
	    if (this.timeJumping > 40 && this.timeJumping < 70){
	      this.vel = [this.velStore[0],2.3 + this.velStore[1]];
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
	  if (tempPos[0] > 5 && tempPos[0] < 895 && tempPos[1] > 5 && tempPos[1] < 895) {
	    this.pos = tempPos;
	  }
	};
	
	module.exports = Player;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map