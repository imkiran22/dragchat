define([], function() {
   return ['$scope', '$timeout','$stateParams', function($scope, $timeout, $stateParams) {
       $scope.privateMessageList = [];
       $scope.userId = $stateParams.userId;
       $scope.send = function (event) {
          if (event.keyCode === 13) {
             var messageHTML = event.target.innerHTML.replace('<br><br>', "");
             messageHTML = messageHTML.replace('<div><br></div>', "");
             socketio.emit("privateMessage", {from: localStorage.getItem("user.mobile"), to: $stateParams.userId, message : $.trim(messageHTML)}, function(data) {
                console.log(data);
             });
             /*Send to MongoDB*/
             $("#privateMessage").html("");
          }
       };
       socketio.on("new_priv_msg", function(data) {
           if(data.to == localStorage.getItem("user.mobile") || data.from == localStorage.getItem("user.mobile")) {
             $scope.privateMessageList.push(data);
             $scope.$apply();
           }
       });
   }];
});
