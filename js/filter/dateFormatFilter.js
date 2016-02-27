define([], function() {
   return [function() {
     return function (input) {
        return new Date(input).getHours() + ":" + new Date(input).getMinutes() +
         " " + new Date(input).getDate() + "/" + new Date(input).getMonth() + "/" + new Date(input).getFullYear();
     }
   }];
});
