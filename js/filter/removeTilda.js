define([], function () {
  return [function () {
      return function (input) {
         return input.substring(0, input.indexOf("~"));
      }
  }];
})
