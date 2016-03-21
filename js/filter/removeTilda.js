define([], function () {
  return [function () {
      return function (input) {
         return input.substring(input.lastIndexOf("/")+1, input.length);
      }
  }];
})
