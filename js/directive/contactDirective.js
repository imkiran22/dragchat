define([], function() {
  "use strict";
  return [function () {
            return {
                restrict: 'E',
                templateUrl: 'html/contactList.html',
                scope: {
                    userContacts: '=contact',
                    loadContact: '&'
                },
                link: function ($scope) {
                  $scope.getUserList = function() {
                    var keyword = document.getElementById("userList").value;
                    if(keyword !== null && keyword !== undefined && keyword.toString().length >= 3) {
                      $scope.loadContact({keyword: keyword});
                      $scope.$watch('userContacts', function() {
                         $scope.list = $scope.userContacts;
                      })
                    }
                  };
                  $scope.connect = function(user) {
                      console.log(user);
                  };
                }
            };
  }];
});
