var app = angular.module('myApp', ['ui.router']);
app.config(['$urlRouterProvider', '$stateProvider', '$httpProvider', function ($urlRouterProvider, $stateProvider, $httpProvider) {
         //$urlRouterProvider.when("login", "/login");
         $urlRouterProvider.otherwise("/login");
         // $httpProvider.interceptors.push('AjaxErrorHandler');
         $stateProvider.state('login', {
             url: "/login",
             templateUrl: "html/login.html",
             controller: 'loginController'
         });
}]);
app.controller('loginController', ['$scope', function($scope) {
      $scope.error = false;
      $scope.user = {};
      $scope.userEnter = function () {
          if ($scope.user.userName&&$scope.user.mobile !== "" && $scope.user.userName&&$scope.user.mobile !== undefined && $scope.user.userName&&$scope.user.mobile !== null) {
             if ($scope.user.userName.toString().length <= 2) {
                 $scope.error = true;
                 return;
             }
             /*localStorage.setItem("user.userId", Math.floor(Math.random()*100));*/
             localStorage.setItem("user.mobile", $scope.user.mobile);
             localStorage.setItem("user.userName", $scope.user.userName + "~" + Math.floor(Math.random()*100));
             //User Joined Emit
             /*socketio.emit("userJoined_to_server", {userId: localStorage.getItem("user.userId"), userName: localStorage.getItem("user.userName").substring(0, localStorage.getItem("user.userName").indexOf("~")), message : "Joined the chat", dateStr: new Date()});*/
             window.location = "index.html";
          }
      };
      $scope.keyEnter = function ($event) {
         if ($event.keyCode === 13) {
           $scope.userEnter();
         }
      };
}]);
