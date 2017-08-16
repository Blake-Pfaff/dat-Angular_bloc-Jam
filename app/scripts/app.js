(function() {
// whats the deal with IFFES?




    function config($stateProvider, $locationProvider) {
// are $stateProvider & locationProvider provided by Angular or UI.router?  I think they are provided by UI.router
      $locationProvider
           .html5Mode({
               enabled: true,
               requireBase: false
           });

      $stateProvider
            .state('landing', {
                url: '/',
                controller: 'LandingCtrl as landing',
                // this is why we can use landing in the h1 with landing.heroTitle? I think
                templateUrl: '/templates/landing.html'
            })
            .state('collection', {
              url: '/collection',
              controller: 'CollectionCtrl as collection',
              templateUrl: '/templates/collection.html'
            })
            .state('album', {
              url: '/album',
              controller: 'AlbumCtrl as album',
              templateUrl: '/templates/album.html'
            });
    }


    angular
        .module('blocJams', ['ui.router'])
        // is .config an Angular Method?
        .config(config);
        //  this calls the config function?







})();
