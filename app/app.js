'use strict';

// Declare app level module which depends on views, and components
var lanj = angular.module('lanjApp', ['ngRoute']);

lanj.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
                .when('/provider', {
                    templateUrl: 'providerView/provider.html'
                })
                .when('/admin', {
                    templateUrl: 'adminView/admin.html'
                })
                .when('/professor', {
                    templateUrl: 'professorView/professor.html'
                })
                .when('/student', {
                    templateUrl: 'studentView/student.html'
                })
                .otherwise({redirectTo: '/view1'});
    }]);
