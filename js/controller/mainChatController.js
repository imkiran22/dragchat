define(['jquery'], function($) {
   return ['$scope', '$timeout', 'smileyService', function($scope, $timeout, smileyService) {
       $scope.chatRoomList = [];
       $scope.error = false;
       $scope.success = false;
       $scope.group = "";
       $timeout(function() {
           $("#chat-target").addClass('visible bounceInUp');
           $scope.getChatRoomList();
       }, 200);
       $scope.createNewGroup = function (groupName) {
          if(groupName === null || groupName === undefined || groupName.toString().length < 3) {
            $scope.error = true;
            return;
          }
          $scope.error = false;
          var group = {};
          group.groupId = groupName + "~" + Math.floor(Math.random()*100);
          group.groupName = groupName;
          group.date = new Date();
          group.creator = localStorage.getItem("user.userName").substring(0, localStorage.getItem("user.userName").indexOf("~"));
          smileyService.createNewGroup(group).then(function(response) {
             console.log("Inserted Successfully");
             $scope.success = true;
             $scope.getChatRoomList();
             document.getElementById("group").value = "";
             $timeout(function() {
                $scope.success = false;
             }, 5000);
          });
       };
       $scope.triggerClick = function (event) {
         if (event.keyCode === 13) {
           $scope.createNewGroup(document.getElementById("group").value);
         }
       };
       $scope.getChatRoomList = function () {
          smileyService.getChatRoomList().then(function(response) {
             $scope.chatRoomList = response;
          });
       };
   }];
});
