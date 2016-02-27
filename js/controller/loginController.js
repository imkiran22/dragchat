angular.module('myApp', []).controller('loginController', ['$scope', function($scope) {
      $scope.error = false;
      $scope.userEnter = function () {
          if ($scope.userName !== "" && $scope.userName !== undefined && $scope.userName !== null) {
             if ($scope.userName.toString().length <= 2) {
                 $scope.error = true;
                 return;
             }
             localStorage.setItem("user.userName", $scope.userName + "~" + Math.floor(Math.random()*100));
             window.location = "index.html";
          }
      };
      $scope.keyEnter = function ($event) {
         if ($event.keyCode === 13) {
           $scope.userEnter();
         }
      };
}]);
