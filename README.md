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
  if (yPos > this.DIM_Y * 0.236 && yPos < this.DIM_Y * 0.278 ) {
    vel = [-this.DIM_X * 0.00225, this.DIM_Y * 0.000147];
    // level 4
  } else if (yPos > this.DIM_Y * 0.3876 && yPos < this.DIM_Y * 0.428 ) {
    vel = [this.DIM_X * 0.00225, this.DIM_Y * 0.000147];
    // level 3
  } else if (yPos > this.DIM_Y * 0.537 && yPos < this.DIM_Y * 0.578 ) {
    vel = [-this.DIM_X * 0.00225, this.DIM_Y * 0.000147];
    // level 2
  } else if (yPos > this.DIM_Y * 0.686 && yPos < this.DIM_Y * 0.7266 ) {
    vel = [this.DIM_X * 0.00225, this.DIM_Y * 0.000147];
    // level bottom
  } else if (yPos > this.DIM_Y * 0.829 && yPos < this.DIM_Y * 0.8733 ) {
    vel = [-this.DIM_X * 0.00225, this.DIM_Y * 0.000147];
    //fall right
  } else if (xPos >= this.DIM_X * 0.8033 && xPos <= this.DIM_Y * 0.8222 ){
    vel = [0,this.DIM_Y * 0.00222222222];
    //fall left
  } else if (xPos >= this.DIM_X * 0.1611 && xPos <= this.DIM_Y * 0.1889 ){
    vel = [0,this.DIM_Y * 0.00222222222];
  }
  this.pos =[ pos[0]+vel[0],  pos[1]+vel[1]];
};
```


### TODO
* confirm player movement
* falling
* climbing multiple levels
