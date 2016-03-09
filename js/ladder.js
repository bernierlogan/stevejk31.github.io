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
