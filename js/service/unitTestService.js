define([], function() {
  return [function() {
      // function serviceCallValue() {
      //   return $http.get('json/test.json');
      // }
      function dummyValue(param) {
         return { "content": param + ' Mass' };
      }
      return ({
          //  serviceCallValue: serviceCallValue,
           dummyValue: dummyValue
      });
  }];
});
