define([], function() {
  return ['$window', function ($window) {
    return {
      check: function () {
        if (localStorage.getItem("user.userName") === null || localStorage.getItem("user.userName") === undefined || localStorage.getItem("user.userName") === "") {
            $window.location.href= "enter.html";
        }
      }
    }
  }];
})
