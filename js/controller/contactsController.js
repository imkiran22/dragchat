define([], function() {
  return ['$scope','$timeout', 'isUserValid', function($scope, $timeout, isUserValid) {
      var timeDelay = "";
      $timeout(function() {
          $("#contacts-target").addClass('visible bounceInUp');
      }, 200);
      $scope.getUserList = function(keyword) {
        if (timeDelay !== "" && timeDelay !== null && timeDelay !== undefined) {
          $timeout.cancel(timeDelay);
        }
        timeDelay = $timeout(function() {
           isUserValid.getUserList(keyword).then(function(response) {
             $scope.userContacts = response;
           });
        }, 1000);
      };
  }];
});
