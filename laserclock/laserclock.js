var tessel = require('tessel');

var portone = tessel.port['A'];
var oneone = portone.pin['G1'];
var onetwo = portone.pin['G2'];

var porttwo = tessel.port['B'];
var twoone = porttwo.pin['G1'];
var twotwo = porttwo.pin['G2'];

oneone.write(1);
onetwo.write(0);

twoone.write(1);
twotwo.write(0);

//  coil current direction: true = 1-->2, false = 2-->1
//  no sense staying in a state where the coils aren't both energized
//  
//  1 0 1 0   true, true    11  3  ccw
//  0 0 1 0                         |
//  0 1 1 0   false, true   01  1   V
//  0 1 0 0
//  0 1 0 1   false, false  00  0
//  0 0 0 1                         ^
//  1 0 0 1   true, false   10  2   |
//  1 0 0 0                        cw

var state = 3;
var position = 0; //  stepper ticks
var angle = 0;
var iteration = 0;
var move = true;  //  are we moving?
var dir = true;   //  counter clockwise
var pins = [oneone, onetwo, twoone, twotwo];

var reverse = function() {
  dir = !dir;
  console.log('reverse!');
}

//  call with if (move)
var step = function () {
  switch (state) {
    case 0:
      if (dir) {
        pins[1].toggle();
        pins[0].toggle();
        state = 2;
      } else {
        pins[3].toggle();
        pins[2].toggle();
        state = 1;
      }
      break;

    case 1:
      if (dir) {
        pins[2].toggle();
        pins[3].toggle();
        state = 0;
      } else {
        pins[1].toggle();
        pins[0].toggle();
        state = 3;
      }
      break;

    case 2:
      if (dir) {
        pins[3].toggle();
        pins[2].toggle();
        state = 3;
      } else {
        pins[0].toggle();
        pins[1].toggle();
        state = 0;
      }
      break;

    case 3:
      if (dir) {
        pins[0].toggle();
        pins[1].toggle();
        state = 1;
      } else {
        pins[2].toggle();
        pins[3].toggle();
        state = 2;
      }
      break;
  }
  position += (dir ? 1 : -1);
  angle = ((position % 200) * 1.8 + 360) % 360;
  iteration += 1;
}

setInterval(function () {
  step();
  console.log(iteration, '\t', position, '\t', angle);
}, 20);

var turnAround = function (argument) {
  setTimeout(function () {
    reverse();
    turnAround();
  }, Math.random() * 1000);
}

turnAround();