define(['jquery'], function($) {
   return ['$scope','$timeout', function($scope, $timeout) {
     $scope.content = {};
     $scope.content.name = localStorage.getItem("user.userName").substring(0, localStorage.getItem("user.userName").indexOf("~"));
     $scope.messageTransferData = [];
     //Socket contenteditable
     socketio.on("message_to_client", function(data) {
        $scope.messageTransferData.push(data);
        $scope.$apply();
     });
     $scope.send = function (event) {
        if (event.keyCode === 13) {
           socketio.emit("message_to_server", {userName: $scope.content.name, message : $scope.content.msg, dateStr: new Date()});
           $scope.content.msg = "";
        }
     };
     $timeout(function() {
         $("#chat-target").addClass('visible bounceInUp');
     }, 200);
   }];
});
