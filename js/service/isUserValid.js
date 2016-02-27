define([], function() {
  return [function () {
    return {
      check: function () {
        if (localStorage.getItem("user.userName") === null || localStorage.getItem("user.userName") === undefined || localStorage.getItem("user.userName") === "") {
           window.location = "login.html";
        }
      }
    }
  }];
})
