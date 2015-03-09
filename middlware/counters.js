function makeCounter() {
  // currentCount можно считать "статической переменной" счётчика
  var currentCount = 0;

  return function() {
    currentCount++;
    return currentCount;
  };
}

counter = makeCounter();

module.exports.counter = counter;
