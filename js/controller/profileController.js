define(['jquery'], function($) {
    return ['$scope','$timeout', function($scope, $timeout) {
        $scope.text = "You are viewing Profile state in Crazy Chat";
        $scope.private = [];
        $timeout(function() {
            $("#profile-target").addClass('visible bounceInUp');
        }, 200);
    }];
});
