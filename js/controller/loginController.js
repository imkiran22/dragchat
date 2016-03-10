define([],  function() {
   return ['$scope','$state', function($scope, $state) {
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
                localStorage.setItem("user.userName", $scope.user.userName);
                //User Joined Emit
                socketio.emit("userJoined_to_server", {userId: localStorage.getItem("user.mobile"), userName: localStorage.getItem("user.userName")});
                /*window.location = "index.html";*/
                $state.go('base.chat');
             }
         };
         $scope.keyEnter = function ($event) {
            if ($event.keyCode === 13) {
              $scope.userEnter();
            }
         };
   }];
});
