define([], function() {
  "use strict";
  return [function () {
            return {
                restrict: 'E',
                templateUrl: 'html/global.html',
                scope: {
                    myTitle: '@',
                    content: '=content'
                },
                link: function ($scope) {
                    $scope.change = function(msg) {
                      $scope.content = msg;
                      return 'msg';
                    };
                }
            };
  }];
});
