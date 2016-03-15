# Get Block-O Home

This is a web game inspired by Atari's Donkey Kong using Javascript and HTML5

View it live at http://stevejk31.github.io/

###Main Functionality:
* Pure Javascript made browser game
* Utilizing HTML5 to render retro characters
* Hand rolled location based physics

```javascript
Barrel.prototype.move = function(pos, vel) {
  //level 5 ramp
  if (y_pos > this.DIM_Y * 0.236 && y_pos < this.DIM_Y * 0.278 ) {
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
```
