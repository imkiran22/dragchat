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
        loginController: 'controller/loginController',
        dragdropController: 'controller/dragdropController',
        mainChatController: 'controller/mainChatController',
        chatController: 'controller/chatController',
        profileController: 'controller/profileController',
        emptyCheckFilter: 'filter/emptyCheckFilter',
        globalDirective: 'directive/globalDirective',
        angularMocks: 'lib/angular-mocks',
        isUserValid: 'service/isUserValid',
        dateFormatFilter: 'filter/dateFormatFilter',
        angularSanitize: 'lib/angular-sanitize',
        smileyService: 'service/smileyService',
        removeTilda: 'filter/removeTilda',
        contactsController: 'controller/contactsController',
        privateController: 'controller/privateController',
        contactDirective: 'directive/contactDirective',
        angularAnimate: 'lib/angular-animate',
        angularAria: 'lib/angular-aria',
        angularMessages: 'lib/angular-messages',
        angularMaterial: 'lib/angular-material',
        songsController: 'controller/songsController'
    },
    shim: {
        angular: {
            exports: 'angular'
        },
        uiRouter: {
          deps: ['angular']
        },
        angularSanitize: {
          deps: ['angular']
        },
        angularAnimate: {
          deps: ['angular']
        },
        angularAria: {
          deps: ['angular','angularAnimate']
        },
        angularMessages: {
          deps: ['angular','angularAnimate']
        },
        angularMaterial: {
          deps: ['angular', 'angularAnimate','angularAria', 'angularMessages']
        },
        dragdrop: {
          deps: ['angular']
        }
    }
});
requirejs(['main'], function (main) {
   main.init();
});
