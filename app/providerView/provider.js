/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';

lanj.controller('ProviderController', function ($scope) {
    $scope.services = {network: false,
        autoTemplates: false,
        manualTemplates: false,
        ram: false,
        hdd: false,
        os: false,
        swap: false,
        cpus: false,
        ipAddress: false,
        authentication: false};
    $scope.admin = {login: "", password: ""};
    // 0 for 'Manage Services' tab
    // 1 for 'Create Admin' tab
    $scope.show = 0;
    // If the provider has not saved the services he wants to use, he can not create a new admin
    // false before the first click on 'Save' button
    // true after
    $scope.initServices = false;

    $scope.createAdminAccount = function () {
        if (($scope.admin.login !== "" && $scope.admin.login !== undefined)
                && ($scope.admin.password !== "" && $scope.admin.password !== undefined)) {
            console.log("login: " + $scope.admin.login + " - password: " + $scope.admin.password);
            // Call to API: POST /{provider}/admin
        }
        else {
            console.log("you should specify a correct login and a correct password.");
        }
    };

    $scope.saveServices = function () {
        $scope.initServices = true;
        console.log("your services have been saved.");
        console.log("network: " + $scope.services.network
                + " - autoTemplates: " + $scope.services.autoTemplates
                + " - manualTemplates: " + $scope.services.manualTemplates
                + " - ram: " + $scope.services.ram
                + " - hdd: " + $scope.services.hdd
                + " - os: " + $scope.services.os
                + " - swap: " + $scope.services.swap
                + " - cpus: " + $scope.services.cpus
                + " - ipAddress: " + $scope.services.ipAddress
                + " - authentication: " + $scope.services.authentication);
    };

    $scope.manualTemplatesChoiceChanged = function () {
        $scope.services.autoTemplates = false;
    };

    $scope.autoTemplatesChoiceChanged = function () {
        $scope.services.manualTemplates = false;
    };

    $scope.manualTemplatesShown = function () {
        return $scope.services.manualTemplates;
    };

    $scope.areServicesInitialized = function () {
        return $scope.initServices;
    };

    $scope.showManageServicesTab = function () {
        $scope.show = 0;
    };

    $scope.showCreateAdminTab = function () {
        $scope.show = 1;
    };

    $scope.isManageServicesShown = function () {
        return $scope.show === 0;
    };

    $scope.isCreateAdminShown = function () {
        return $scope.show === 1;
    };
});

