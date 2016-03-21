define(['jquery'], function($) {
   return ['$scope', '$timeout','$stateParams','app', function($scope, $timeout, $stateParams, app) {
       $scope.privateMessageList = [];
       $scope.userId = $stateParams.userId;
       $scope.userMobile = localStorage.getItem("user.mobile");
       $scope.showSmiley = false;
       $scope.send = function (event) {
          if (event.keyCode === 13) {
             var messageHTML = event.target.innerHTML.replace('<br><br>', "");
             messageHTML = messageHTML.replace('<div><br></div>', "");
             if (messageHTML !== "" && !messageHTML.startsWith("<div><br></div>")) {
               socketio.emit("privateMessage", {from: localStorage.getItem("user.mobile"), to: $stateParams.userId, message : $.trim(messageHTML), dateStr: new Date()}, function(data) {
                  console.log(data);
               });
               /*Send to MongoDB*/
               $("#privateMessage").html("");
             }
          }
       };
       socketio.on("new_priv_msg", function(data) {
           if((data.to == localStorage.getItem("user.mobile") && data.from == $stateParams.userId) || (data.from == localStorage.getItem("user.mobile") && data.to == $stateParams.userId)) {
             $scope.privateMessageList.push(data);
             $scope.$apply();
           }
       });
       $scope.smileyArray = app.fileName;
       $scope.sendSmiley = function (src) {
               $("#privateMessage").append('<img style="width: 30px;" src="'+ src + '"/>' );
               $("#privateMessage").focus();
               $scope.showSmiley = false;
       };
       $("#contentEdit").css("top", $(window).height());
   }];
});
