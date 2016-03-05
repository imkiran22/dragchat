define(['angular', 'dragdropController','mainChatController', 'chatController' , 'profileController' , 'jquery','isUserValid' ,'dateFormatFilter' ,'smileyService' , 'removeTilda', 'dragdrop', 'uiRouter', 'angularSanitize'], function(angular, dragdropController, mainChatController, chatController, profileController, $, isUserValid, dateFormatFilter,smileyService, removeTilda) {
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
                templateUrl: "html/mainChat.html",
                controller: 'mainChatController'
            }).state('profile', {
                url: "/profile",
                templateUrl: "html/profile.html",
                controller: 'profileController'
            }).state('chat.hub', {
            url: '/:chatId',
            templateUrl: 'html/chat.html',
            controller: 'chatController',
            resolve: {
              app: function(smileyService) {
                return smileyService.getSmiley().then(function (response) {
                   return response;
                });
              }
            }
        });
   }]);
   app.controller('mainChatController', mainChatController);
   app.controller('chatController', chatController);
   app.controller('profileController', profileController);
   app.controller('dragdropController', dragdropController);
   app.service('isUserValid', isUserValid);
   app.service('smileyService', smileyService);
   app.filter('dateFormatFilter', dateFormatFilter);
   app.filter('removeTilda', removeTilda);
   return app;
});
