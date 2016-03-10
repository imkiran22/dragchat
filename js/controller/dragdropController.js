define(['jquery'], function($) {
  return ['$scope','$state','$timeout','isUserValid', '$window', function($scope, $state, $timeout, isUserValid, $window) {
    isUserValid.check();
    $scope.men = [
    {
      name: "chat",
      path: 'base.chat'
    }, {
      name: "profile",
      path: 'base.profile'
    }, {
      name: "contacts",
      path: 'base.contacts'
    }, {
      name: "logout",
      path: ''
    }
    ];
    /*$scope.logoutMe = 'logout';*/
    $scope.names = [];
    $scope.onDrop = function(event, data) {
          if (data === 'logout') {
             $scope.logout();
          }
          var dragId = $(event.currentTarget.children).attr('id');
          if ($state.current.name !== data) {
              $("#" + dragId).addClass("bounceOutRight");
              $timeout(function() {
                $state.transitionTo(data);
              }, 500);
          }
    };
    /*Logout*/
    $scope.logout = function() {
      socketio.emit('disconnect');
      /*localStorage.clear();
      $state.go('login');*/
      /*$window.location.href= "enter.html";*/
    };
  }];
});
