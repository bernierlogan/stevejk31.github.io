var MovingObject = require('./movingObject.js');
var Utils = require('./utils.js');


function Barrel(posArg) {
  this.pos = posArg["pos"];
  this.game = posArg["game"];
  this.color = "#FFA500";
  this.radius = this.DIM_Y/90;
  this.pos = [this.DIM_X/20, this.DIM_Y * 7/90];
  this.vel = [this.DIM_X * 0.00225, this.DIM_Y * 0.000147];
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
  var y_pos = Math.floor(pos[1])
  var x_pos = Math.floor(pos[0])
  if (x_pos < this.DIM_X * 0.8056 && y_pos <= this.DIM_Y * 0.1278 ) {
    vel = [this.DIM_X * 0.00225, this.DIM_Y * 0.000147];
    // level 5
  } else if (y_pos > this.DIM_Y * 0.236 && y_pos < this.DIM_Y * 0.278 ) {
    vel = [-this.DIM_X * 0.00225, this.DIM_Y * 0.000147];
    // level 4
  } else if (y_pos > this.DIM_Y * 0.3876 && y_pos < this.DIM_Y * 0.428 ) {
    vel = [this.DIM_X * 0.00225, this.DIM_Y * 0.000147];
    // level 3
  } else if (y_pos > this.DIM_Y * 0.537 && y_pos < this.DIM_Y * 0.578 ) {
    vel = [-this.DIM_X * 0.00225, this.DIM_Y * 0.000147];
    // level 2
  } else if (y_pos > this.DIM_Y * 0.686 && y_pos < this.DIM_Y * 0.7266 ) {
    vel = [this.DIM_X * 0.00225, this.DIM_Y * 0.000147];
    // level bottom
  } else if (y_pos > this.DIM_Y * 0.829 && y_pos < this.DIM_Y * 0.8733 ) {
    vel = [-this.DIM_X * 0.00225, this.DIM_Y * 0.000147];
    //fall right
  } else if (x_pos >= this.DIM_X * 0.8033 && x_pos <= this.DIM_Y * 0.8222 ){
    vel = [0,this.DIM_Y * 0.00222222222];
    //fall left
  } else if (x_pos >= this.DIM_X * 0.1611 && x_pos <= this.DIM_Y * 0.1889 ){
    vel = [0,this.DIM_Y * 0.00222222222];
  }
  this.pos =[ pos[0]+vel[0],  pos[1]+vel[1]];
};


Barrel.prototype.isCollidedWith = function(otherObject) {
  var xPos = this.pos[0] - otherObject.pos[0];
  var yPos = this.pos[1] - otherObject.pos[1];
  var distance = Math.pow( (Math.pow(xPos, 2) + Math.pow(yPos, 2)), this.DIM_X * 5 /9000);
  if ((distance < (this.radius + otherObject.radius)) && (this !== otherObject)) {
    this.collideWith(otherObject);
  }
};


module.exports = Barrel;
