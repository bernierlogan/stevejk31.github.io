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
