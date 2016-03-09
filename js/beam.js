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
