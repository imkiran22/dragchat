define(['jquery'], function($) {
   return ['$scope','$stateParams', '$timeout', '$sce', 'app','smileyService', function($scope, $stateParams, $timeout, $sce, app, smileyService) {
     $scope.content = {};
     $scope.chatId = $stateParams.chatId;

     $scope.showSmiley = false;
     $scope.content.name = localStorage.getItem("user.userName").substring(0, localStorage.getItem("user.userName").indexOf("~"));
     $scope.content.userId = localStorage.getItem("user.userId");
     $scope.messageTransferData = [];
     //Set contenteditable height
     $("#contentMessage").css({"position": "fixed", "top": $(window).height() - 70, "width": $(document).width() - 400});
     //Set Chat Window Height
     $("#chat-window").height($(window).height() - $("#contentMessage").height() - 100);
     //("#chat-window").height($(window).height() - 140);
     //Socket contenteditable
     socketio.on("message_to_client", function(data) {
        //sanitising css class
        if (data.chatId !== $scope.chatId) {
          return ;
        }
        data.message = $sce.trustAsHtml(data.message.toString());
        $scope.messageTransferData.push(data);
        $scope.$apply();
        animate();
     });
     socketio.on("userJoined_to_client", function(data) {
        $scope.messageTransferData.push(data);
        $scope.$apply();
        animate();
     });

     function animate() {
        $("#chat-window").animate({scrollTop: $('#chat-window').prop("scrollHeight")}, 1500);
     }
     $scope.send = function (event) {
        if (event.keyCode === 13) {
           var messageHTML = event.target.innerHTML.replace('<br><br>', "");
           messageHTML = messageHTML.replace('<div><br></div>', "");
           socketio.emit("message_to_server", {userId: $scope.content.userId, userName: $scope.content.name, message : $.trim(messageHTML), dateStr: new Date(), chatId: $scope.chatId});
           /*Send to MongoDB*/
           smileyService.insertResult(
              {userId: $scope.content.userId, userName: $scope.content.name, message : $.trim(messageHTML), dateStr: new Date(), chatId: $scope.chatId}
           ).then(function(response) {
              console.log("Inserted One chat row ", response);
           });
           $("#contentMessage").html("");
        }
     };
     $scope.sendSmiley = function (src) {
             $("#contentMessage").append('<img style="width: 30px;" src="'+ src + '"/>' );
             $("#contentMessage").focus();
             $scope.showSmiley = false;
     };
     $timeout(function() {
         $("#chat-target").addClass('visible bounceInUp');
     }, 200);
     $scope.smileyArray = app.fileName;
     /*Retrieve Chat*/
     $scope.selectResult = function () {
        smileyService.selectResult($scope.chatId).then(function (response) {
           $scope.messageTransferData = response;
        });
     };
     $scope.selectResult();
   }];
});
