'use strict';

// Declare app level module which depends on views, and components
var lanj = angular.module('lanjApp', ['ngRoute']);

lanj.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
                .when('/provider', {
                    templateUrl: 'providerView/provider.html',
                    controller: 'ProviderController'
                })
                .when('/admin', {
                    templateUrl: 'adminView/admin.html',
                    controller: 'AdminController'
                })
                .when('/professor', {
                    templateUrl: 'professorView/professor.html',
                    controller: 'ProfessorController'
                })
                .when('/student', {
                    templateUrl: 'studentView/student.html'
                })
                .otherwise({redirectTo: '/view1'});
    }]);
