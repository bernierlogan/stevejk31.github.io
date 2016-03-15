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
