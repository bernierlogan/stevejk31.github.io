var Player = function(options) {
  this.pos = options["pos"];
  console.log(this.pos);
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
  if (keystate[space]) {
    console.log(pos);
  }
  var vel = [0,0];
  var xVel = this.DIM_X/444;
  var yVel = this.DIM_X/7826;
  var yPos = Math.floor(pos[1]);
  // level 6
  if (yPos < (this.DIM_Y * 0.2111) && yPos > 0 &&
  (keystate[RightArrow] || keystate[LeftArrow])) {
    if (keystate[RightArrow] ) {
      vel = [xVel, yVel];
    } else if ( keystate[LeftArrow]) {
      vel = [-xVel, -yVel];
    }
  // level 5
// } else if (yPos > (this.DIM_Y * 0.2111)200 && yPos < (this.DIM_Y * 0.2111)310 &&
//   (keystate[RightArrow] || keystate[LeftArrow])) {
//     if (keystate[RightArrow] ) {
//       vel = [xVel, -yVel];
//     } else if ( keystate[LeftArrow]) {
//       vel = [-xVel, yVel];
//     }
//   // level 4
// } else if (yPos > (this.DIM_Y * 0.2111)320 && yPos < (this.DIM_Y * 0.2111)450 &&
//   (keystate[RightArrow] || keystate[LeftArrow])) {
//     if (keystate[RightArrow] ) {
//       vel = [xVel, yVel];
//     } else if ( keystate[LeftArrow]) {
//       vel = [-xVel, -yVel];
//     }
//   // level 3
// } else if (yPos > (this.DIM_Y * 0.2111)455 && yPos < (this.DIM_Y * 0.2111)600 &&
//   (keystate[RightArrow] || keystate[LeftArrow])) {
//     if (keystate[RightArrow] ) {
//       vel = [xVel, -yVel];
//     } else if ( keystate[LeftArrow]) {
//       vel = [-xVel, yVel];
//     }
//   // level 2
// } else if (yPos > (this.DIM_Y * 0.2111)600 && yPos < (this.DIM_Y * 0.2111)720 &&
//   (keystate[RightArrow] || keystate[LeftArrow])) {
//     if (keystate[RightArrow] ) {
//       vel = [xVel, yVel];
//     } else if ( keystate[LeftArrow]) {
//       vel = [-xVel, -yVel];
//     }
  // level 1
} else if (yPos > (this.DIM_Y * 0.7) && yPos < this.DIM_Y &&
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
