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
  // level top
  if (Math.floor(pos[0]) < this.DIM_X * 0.8056 && Math.floor(pos[1]) <= this.DIM_Y * 0.1278 ) {
    vel = [this.DIM_X * 0.00225, this.DIM_Y * 0.000147];
    // level 5
  } else if (Math.floor(pos[1]) > this.DIM_Y * 0.236 && Math.floor(pos[1]) < this.DIM_Y * 0.278 ) {
    vel = [-this.DIM_X * 0.00225, this.DIM_Y * 0.000147];
    // level 4
  } else if (Math.floor(pos[1]) > this.DIM_Y * 0.3876 && Math.floor(pos[1]) < this.DIM_Y * 0.428 ) {
    vel = [this.DIM_X * 0.00225, this.DIM_Y * 0.000147];
    // level 3
  } else if (Math.floor(pos[1]) > this.DIM_Y * 0.5311 && Math.floor(pos[1]) < this.DIM_Y * 0.5766 ) {
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
