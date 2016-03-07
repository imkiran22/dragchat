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
                      /*https://www.facebook.com/typeahead/search/facebar/query/?__pc=EXP1%3ADEFAULT&value=[%22Bhaarath%2Vijay%22]&context=facebar&grammar_version=29f4adb6672e30a0cc06d04e413ba01ec838852f&content_search_mode&viewer=1843797496&rsp=search&qid=14&max_results=13&sid=0.8977250699039039&__user=1843797496&__a=1&__dyn=5V5yAW8-aloAwmgDxyIGzGomyrhEK5EK8GAFp8yeqrYw8popyui9zob4q8zUK5UcU-2CEaUZ7xti28cZ1eUJkiVWxeUlxi9G4EK3uiuumm2uVEOmFEW2PxOcx2q5omw&__req=1a&__rev=2215361*/
                      return 'msg';
                    };
                }
            };
  }];
});
