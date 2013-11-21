require.config({
    paths: {
        underscore: 'lib/underscore-amd/underscore',
        jquery:     'lib/jquery/jquery',
        bootstrap:  'lib/bootstrap/dist/js/bootstrap',
        moment:     'lib/moment/moment',
        angular:    'lib/angular/angular',
        ngCookies:  'lib/angular-cookies/angular-cookies',
        ngAnimate:  'lib/angular-animate/angular-animate',
        ngMoment:   'lib/angular-moment/angular-moment'
    },
    shim: {
        underscore:     {
            exports: '_'
        },
        jquery:     {
            exports: '$'
        },
        bootstrap:  {
            deps: ['jquery']
        },
        moment:     {
            exports: 'moment'
        },
        angular:    {
            exports: 'angular',
            deps:    ['jquery']
        },
        ngCookies:  {
            deps:    ['angular']
        },
        ngAnimate:  {
            deps:    ['angular']
        },
        ngMoment:   {
            deps:    ['angular', 'moment']
        }
    },
    map: {
        '*': {
            'less': 'lib/require-less/less',
            'html': 'lib/requirejs-text/text'
        }
    }
});

require(['underscore', 'jquery', 'angular', 'bootstrap', 'ngCookies', 'ngAnimate', 'ngMoment']
, function (_, $, angular) {

    'use strict';

    var app = angular.module('app', ['ngCookies', 'ngAnimate', 'angularMoment']);

    app.config(['$httpProvider'
    , function (http_provider) {

        var http_error_handler = ['$q', '$location', '$cookieStore', function(q, location, cookie) {

            var success = function (response) {
                return response;
            };

            var error = function(response) {
                var status = response.status;
                switch(status)
                {
                    case 401:
                        if (location.path() !== '/about') {
                            cookie.put('path', location.path());
                        }
                        location.path('/about');
                        return q.reject(response);

                    default:
                        return q.reject(response);
                };
            };

            return function(promise) {
                return promise.then(success, error);
            };
        }];

        http_provider.responseInterceptors.push(http_error_handler);
    }]);

    app.config(['$locationProvider'
    , function (location_provider) {

        location_provider.html5Mode(true).hashPrefix('!');
    }])

    app.run(['$http', '$location', '$cookieStore', '$rootScope', '$injector', '$compile'
    , function (http, location, cookie, root_scope, injector, compile) {

        root_scope.signout = function () {
            http.post('signout').
            then(function () {
                root_scope.user = undefined;
                location.path('/about');
            });
        }

        root_scope.$on('$locationChangeSuccess'
        , function (event, next, prev) {

            var n_path = next.split('/').pop().split('#');
            var p_path = prev.split('/').pop().split('#');

            if (n_path[0] == p_path[0] && n_path[1] != p_path[1]) {
                root_scope.$broadcast('$hashChange', n_path[1], p_path[1]);
                return;
            }

            var path = n_path[0];
            if (!path) {
                path = 'dashboard';
            }

            var view  = $('body');
            var scope = view.scope();
            var files = [
                'html!templates/' + path + '.html',
                'controllers/'    + path,
                'less!styles'     // Yeah, we load one and the same style sheet
                                  // for all the views.  A style sheet per view
                                  // just doesn't work.
            ];

            require(files
            , function (template, controller) {

                scope.$apply(function () {
                    view.html(template);
                    compile(view.contents())(scope);
                    injector.invoke(controller, scope);
                });
            });
        });

        http.get('whoami').then(function (response) {
            var user = response.data;
            if (user) {
                var path = cookie.get('path');
                if (path) {
                    location.path(path);
                    cookie.remove('path');
                }
                root_scope.user = user;
            }
        });
    }]);

    angular.bootstrap(document, [app['name']]);
});
