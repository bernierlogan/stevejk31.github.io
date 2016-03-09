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
