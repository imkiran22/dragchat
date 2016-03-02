define(['jquery'], function($) {
   return ['$scope', '$timeout', '$sce', function($scope, $timeout, $sce) {
     $scope.content = {};
     $scope.showSmiley = false;
     $scope.smileyArray = ['smiley/smiley/1.png', 'smiley/smiley/32_1.png', 'smiley/smiley/32_2.png', 'smiley/clock/32_5.png'];
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
        data.message = $sce.trustAsHtml(data.message);
        $scope.messageTransferData.push(data);
        $scope.$apply();
        $("#chat-window").animate({scrollTop: $('#chat-window').prop("scrollHeight")}, 850);
     });
     socketio.on("userJoined_to_client", function(data) {
        $scope.messageTransferData.push(data);
        $scope.$apply();
     });
     $scope.send = function (event) {
        if (event.keyCode === 13) {
           var messageHTML = event.target.innerHTML.replace('<br><br>', "");
           messageHTML = messageHTML.replace('<div><br></div>', "");
           socketio.emit("message_to_server", {userId: $scope.content.userId, userName: $scope.content.name, message : $.trim(messageHTML), dateStr: new Date()});
           /*$scope.content.msg = "";*/
           $("#contentMessage").html("");
        }
     };
     $scope.sendSmiley = function (src) {
             $("#contentMessage").append('<img style="width: 30px;" src="'+ src + '"/>' );
             $("#contentMessage").focus();
     };
     $timeout(function() {
         $("#chat-target").addClass('visible bounceInUp');
     }, 200);
   }];
});
