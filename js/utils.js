var Utils = {};
Utils.inherits = function(ChildClass, ParentClass) {
  function Surgate() {}
  Surgate.prototype = ParentClass.prototype;
  ChildClass.prototype = new Surgate;

};

Utils.randVector = function(length) {
  var posNeg = (Math.pow(-1, Math.round(Math.random()*10)));
  do{
    var x = Math.round(Math.random()*length)*posNeg;
  } while(x === 0);
  posNeg = (Math.pow(-1, Math.round(Math.random()*10)));
  do{
    var y = Math.round(Math.random()*length)*posNeg;
  } while(y === 0);
  return [ x, y ];
};


Utils.randPos = function(dimX, dimY) {
  return [Math.round(Math.random()*dimX), Math.round(Math.random()*dimY)];
};

module.exports = Utils;
