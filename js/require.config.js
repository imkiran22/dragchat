requirejs.config({
    baseUrl: 'js',
    paths: {
        app: 'app',
        lib: 'lib',
        jquery: 'lib/jquery',
        angular: 'lib/angular-1.4.8',
        uiRouter: 'lib/angular-ui-router',
        main: 'main',
        dragdrop: 'lib/angular-dragdrop',
        dragdropController: 'controller/dragdropController',
        chatController: 'controller/chatController',
        profileController: 'controller/profileController',
        emptyCheckFilter: 'filter/emptyCheckFilter',
        globalDirective: 'directive/globalDirective',
        angularMocks: 'lib/angular-mocks',
        unitTestService: 'service/unitTestService',
        isUserValid: 'service/isUserValid',
        dateFormatFilter: 'filter/dateFormatFilter'
    },
    shim: {
        angular: {
            exports: 'angular'
        },
        uiRouter: {
          deps: ['angular']
        },
        dragdrop: {
          deps: ['angular']
        }
    }
});
requirejs(['main'], function (main) {
   main.init();
});
