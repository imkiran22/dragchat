define([], function() {
  return ['$window','$http','$q', function ($window, $http, $q) {
    function handleSuccess( response ) {
            return( response.data );
    }
    function handleError( response ) {
                    // The API response from the server should be returned in a
                    // nomralized format. However, if the request was not handled by the
                    // server (or what not handles properly - ex. server error), then we
                    // may have to normalize it on our end, as best we can.
                    if (
                        ! angular.isObject( response.data ) ||
                        ! response.data.message
                        ) {
                        return( $q.reject( "An unknown error occurred." ) );
                    }
                    // Otherwise, use expected error message.
                    return( $q.reject( response.data.message ) );
    }

    function getUserList(keyword) {
      var request = $http({
                        method: "get",
                        url: "getUserList?keyword=" + keyword/*,
                        data: query*/
                      });
      return( request.then( handleSuccess, handleError ) );
    }
    return {
      check: function () {
        if (localStorage.getItem("user.userName") === null || localStorage.getItem("user.userName") === undefined || localStorage.getItem("user.userName") === "") {
            $window.location.href= "enter.html";
        }
      },
      getUserList: getUserList
    }
  }];
})
