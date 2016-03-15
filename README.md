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
  if (Math.floor(pos[1]) > 208 && Math.floor(pos[1]) < 249 ) {
    vel = [-2.025, 0.1323];
    // level 4 ramp
  } else if (Math.floor(pos[1]) > 343 && Math.floor(pos[1]) < 384 ) {
    vel = [2.025, 0.1323];
    // level 3 ramp
  } else if (Math.floor(pos[1]) > 478 && Math.floor(pos[1]) < 519 ) {
    vel = [-2.025, 0.1323];
    // level 2 ramp
  } else if (Math.floor(pos[1]) > 613 && Math.floor(pos[1]) < 654 ) {
    vel = [2.025, 0.1323];
    // bottom ramp
  } else if (Math.floor(pos[1]) > 745 && Math.floor(pos[1]) < 786 ) {
    vel = [-2.025, 0.1323];
    //falling ball
  } else if (Math.floor(pos[0]) >= 723 && Math.floor(pos[0]) <= 740 ){
    vel = [0,2];
  } else if (Math.floor(pos[0]) >= 145 && Math.floor(pos[0]) <= 170 ){
    vel = [0,2];
  }
  this.pos =[ pos[0]+vel[0],  pos[1]+vel[1]];
};
```
