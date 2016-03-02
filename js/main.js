define(['angular', 'dragdropController','chatController' , 'profileController' , 'jquery','isUserValid' ,'dateFormatFilter' ,'smileyService' ,'dragdrop', 'uiRouter', 'angularSanitize'], function(angular, dragdropController, chatController, profileController, $, isUserValid, dateFormatFilter,smileyService) {
   'use strict';
   var app = angular.module('myApp', ['ui.router','ngDragDrop', 'ngSanitize']);
   app.init = function () {
      angular.bootstrap(document, ['myApp']);
   };
   app.config(['$urlRouterProvider', '$stateProvider', '$httpProvider', function ($urlRouterProvider, $stateProvider, $httpProvider) {
            $urlRouterProvider.when("/", "/chat");
            $urlRouterProvider.otherwise("/chat");
            // $httpProvider.interceptors.push('AjaxErrorHandler');
            $stateProvider.state('chat', {
                url: "/chat",
                templateUrl: "html/chat.html",
                controller: 'chatController',
                resolve: {
                  app: function(smileyService) {
                    return smileyService.getSmiley().then(function (response) {
                       return response;
                    });
                  }
                }
            }).state('profile', {
                url: "/profile",
                templateUrl: "html/profile.html",
                controller: 'profileController'
            });
   }]);
   app.controller('chatController', chatController);
   app.controller('profileController', profileController);
   app.controller('dragdropController', dragdropController);
   app.service('isUserValid', isUserValid);
   app.service('smileyService', smileyService);
   app.filter('dateFormatFilter', dateFormatFilter);
   return app;
});
