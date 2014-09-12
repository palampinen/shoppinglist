// Ionic shoplist App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'shoplist' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'shoplist.services' is found in services.js
// 'shoplist.controllers' is found in controllers.js
angular.module('shoplist', ['ionic', 'shoplist.controllers', 'shoplist.services','firebase'])

.value('fbURL', 'https://shoplister.firebaseio.com/ep/')

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html",
      controller: 'AppCtrl'
    })

    // Each tab has its own nav history stack:

    .state('tab.items', {
      url: '/items',
      views: {
        'tab-items': {
          templateUrl: 'templates/tab-items.html',
          controller: 'ItemsCtrl'
        }
      }
    })
    .state('tab.item-detail', {
      url: '/item/:itemId',
      views: {
        'tab-items': {
          templateUrl: 'templates/item-detail.html',
          controller: 'ItemDetailCtrl'
        }
      }
    })

    .state('tab.bought', {
      url: '/bought',
      views: {
        'tab-bought': {
          templateUrl: 'templates/tab-bought.html',
          controller: 'ItemsCtrl'
        }
      }
    })

    .state('tab.bought-detail', {
      url: '/bought/:itemId',
      views: {
        'tab-bought': {
          templateUrl: 'templates/item-detail.html',
          controller: 'ItemDetailCtrl'
        }
      }
    })

    .state('tab.login', {
      url: "/login",
      views: {
        'tab-login': {
          templateUrl: "templates/login.html",
          controller: 'LoginCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/items');

});

