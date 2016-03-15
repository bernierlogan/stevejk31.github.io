var MovingObject = require('./movingObject.js');
var Utils = require('./utils.js');


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
  // level 6
  if (Math.floor(pos[0]) < this.DIM_X * 0.8056 && Math.floor(pos[1]) <= 115 ) {
    vel = [2.025, 0.1323];
    // level 5
  } else if (Math.floor(pos[1]) > 208 && Math.floor(pos[1]) < 249 ) {
    vel = [-2.025, 0.1323];
    // level 4
  } else if (Math.floor(pos[1]) > 343 && Math.floor(pos[1]) < 384 ) {
    vel = [2.025, 0.1323];
    // level 3
  } else if (Math.floor(pos[1]) > 478 && Math.floor(pos[1]) < 519 ) {
    vel = [-2.025, 0.1323];
    // level 2
  } else if (Math.floor(pos[1]) > 613 && Math.floor(pos[1]) < 654 ) {
    vel = [2.025, 0.1323];
    // level 1
  } else if (Math.floor(pos[1]) > 745 && Math.floor(pos[1]) < 786 ) {
    vel = [-2.025, 0.1323];
    //fall right
  } else if (Math.floor(pos[0]) >= this.DIM_X * 0.8033 && Math.floor(pos[0]) <= this.DIM_X * 0.8222 ){
    vel = [0,2];
    //fall left
  } else if (Math.floor(pos[0]) >= this.DIM_X * 0.1611 && Math.floor(pos[0]) <= this.DIM_X * 0.1889 ){
    vel = [0,2];
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
