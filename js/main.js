define(['angular', 'dragdropController','chatController' , 'profileController' ,'jquery', 'dragdrop', 'uiRouter'], function(angular, dragdropController, chatController, profileController, $) {
   'use strict';
   var app = angular.module('myApp', ['ui.router','ngDragDrop']);
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
                controller: 'chatController'
            }).state('profile', {
                url: "/profile",
                templateUrl: "html/profile.html",
                controller: 'profileController'
            });
   }]);
   app.controller('chatController', chatController);
   app.controller('profileController', profileController);
   app.controller('dragdropController', dragdropController);
   return app;
});
