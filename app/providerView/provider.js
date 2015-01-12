/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';

lanj.controller('ProviderController', function ($scope, $document) {
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
    var show = 0;
    // If the provider has not saved the services he wants to use, he can not create a new admin
    // false before the first click on 'Save' button
    // true after
    var initServices = false;
    $scope.osTemplates = [];
    $scope.autoTemplates = [];
    $scope.ram = {min: "", max: ""};
    $scope.hdd = {min: "", max: ""};
    $scope.swap = {min: "", max: ""};
    $scope.cpus = {min: "", max: ""};
    $scope.message = "";
    var showMessage = false;

    $scope.createAdminAccount = function () {
        console.log("login: " + $scope.admin.login + " - password: " + $scope.admin.password);
        // Reset admin
        $scope.admin = {login: "", password: ""};
        showMessage = true;
        // Call to API: POST /{provider}/admin
    };

    $scope.isMessageShown = function () {
        return showMessage;
    };

    $scope.saveServices = function () {
        // Check that at least one service is selected
        if (!$scope.services.network && !$scope.services.autoTemplates && !$scope.services.manualTemplates) {
            showMessage = true;
            $scope.message = "You have to select at least one service!";
        }
        // Check that the user have choosen between manual and auto templates
        else if (!$scope.services.autoTemplates && !$scope.services.manualTemplates) {
            showMessage = true;
            $scope.message = "You have to select manual or auto templates.";
        }
        // Check that user have indicated at least one template
        else if ($scope.services.autoTemplates && $scope.autoTemplates.length === 0) {
            showMessage = true;
            $scope.message = "You should indicate at least one template.";
        }
        else if ($scope.services.manualTemplates && !$scope.services.ram && !$scope.services.hdd
                && !$scope.services.os && !$scope.services.swap && !$scope.services.cpus
                && !$scope.services.ipAddress && !$scope.services.authentication) {
            showMessage = true;
            $scope.message = "You should select at least one field.";
        }
        // Check that user have indicated at least one OS template
        else if ($scope.services.os && $scope.osTemplates.length === 0) {
            $scope.message = "You should indicate at least one OS.";
        }
        // Everything is ok
        else {
            initServices = true;
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

            if ($scope.services.os) {
                console.log("OS templates:");
                for (var i = 0; i < $scope.osTemplates.length; i++) {
                    console.log($scope.osTemplates[i].name);
                }
            }
            if ($scope.services.ram) {
                console.log("ram: min: " + $scope.ram.min + " - max: " + $scope.ram.max);
            }
            if ($scope.services.hdd) {
                console.log("hdd: min: " + $scope.hdd.min + " - max: " + $scope.hdd.max);
            }
            if ($scope.services.swap) {
                console.log("swap: min: " + $scope.swap.min + " - max: " + $scope.swap.max);
            }
            if ($scope.services.cpus) {
                console.log("cpus: min: " + $scope.cpus.min + " - max: " + $scope.cpus.max);
            }
            if ($scope.services.autoTemplates) {
                console.log("templates:");
                for (var i = 0; i < $scope.autoTemplates.length; i++) {
                    console.log($scope.autoTemplates[i].name);
                }
            }

            showMessage = true;
            $scope.message = "Your choices have been saved.";
        }
    };

    $scope.manualTemplatesChoiceChanged = function () {
        $scope.services.autoTemplates = false;
    };

    $scope.autoTemplatesChoiceChanged = function () {
        $scope.services.manualTemplates = false;
    };

    $scope.areAutoTemplatesShown = function () {
        return $scope.services.autoTemplates;
    };

    $scope.areManualTemplatesShown = function () {
        return $scope.services.manualTemplates;
    };

    $scope.isRAMShown = function () {
        return $scope.services.ram;
    };

    $scope.isHDDShown = function () {
        return $scope.services.hdd;
    };

    $scope.isCPUsShown = function () {
        return $scope.services.cpus;
    };

    $scope.isSWAPShown = function () {
        return $scope.services.swap;
    };

    $scope.isOSShown = function () {
        return $scope.services.os;
    };

    $scope.areServicesInitialized = function () {
        return initServices;
    };

    $scope.showManageServicesTab = function () {
        show = 0;
    };

    $scope.showCreateAdminTab = function () {
        show = 1;
    };

    $scope.isManageServicesShown = function () {
        return show === 0;
    };

    $scope.isCreateAdminShown = function () {
        return show === 1;
    };

    $scope.addOSTemplate = function () {
        $scope.osTemplates.push({
            name: ""
        });
    };

    $scope.addAutoTemplate = function () {
        $scope.autoTemplates.push({
            name: ""
        });
    };

    $scope.isMessageShown = function () {
        return showMessage;
    };
});

