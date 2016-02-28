define(['jquery'], function($) {
  return ['$scope','$state','$timeout','isUserValid', '$window', function($scope, $state, $timeout, isUserValid, $window) {
    isUserValid.check();
    $scope.men = [
    'chat',
    'profile'
    ];
    $scope.names = [];
    $scope.onDrop = function(event, data) {
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
      localStorage.clear();
      $window.location.href= "login.html";
    }
  }];
});
