var tessel = require('tessel');
var hardware = tessel.port('a');
var g1 = hardware.gpio(1)
          .output()
          .low();
var g2 = hardware.gpio(2)
          .input();
var delay = 0;

process.on('message', function (data) {
  // console.log(data.substring(1, data.length-1));
  delay = parseInt(data.substring(1, data.length - 1));
});
          
console.log('waiting for trigger...');

setInterval(function()
{
  1;
}, 1000);

g2.watch("rise");

g2.on("rise", function()
{
  // tessel.sleep(parseInt(delay));
  g1.high();
  // console.log(delay);
  console.log('beep');
  tessel.sleep(5000);
  g1.low();
  console.log('boop');
})
