var middlware = require('../middlware/counters');

function HelloWorld()
{
  document.writeln("Привет, Мир из скрипта! "+ middlware.counter());
}