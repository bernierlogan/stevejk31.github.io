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
