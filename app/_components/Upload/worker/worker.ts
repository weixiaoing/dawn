// worker.js
self.onmessage = function (e) {
  var num = e.data;
  var sum = 0;
  for (var i = 1; i <= num; i++) {
    sum += i;
  }
  self.postMessage(sum);
};
