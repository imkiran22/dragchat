define(function() {
  return [function () {
      return function (input) {
         return input + new Date().getMonth();
      }
  }];
});
