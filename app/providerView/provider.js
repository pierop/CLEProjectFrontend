/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';

lanj.controller('ProviderController', function ($scope, $location, backendFactory, userFactory) {
    $scope.services = userFactory.getUser().services;
    $scope.services.networkSelected = ($scope.services.networkSelected === "true");
    $scope.services.autoTemplates.selected = ($scope.services.autoTemplates.selected === "true");
    $scope.services.autoTemplates.templates = [];
    $scope.services.manualTemplatesSelected = ($scope.services.manualTemplatesSelected === "true");
    $scope.services.ram.selected = ($scope.services.ram.selected === "true");
    $scope.services.hdd.selected = ($scope.services.hdd.selected === "true");
    //$scope.services.os = {};
    $scope.services.os.selected = ($scope.services.os.selected === "true");
    //$scope.services.os.templates = [];
    $scope.services.cpu.selected = ($scope.services.cpu.selected === "true");
    $scope.services.swap.selected = ($scope.services.swap.selected === "true");
    $scope.services.authenticationSelected = ($scope.services.authenticationSelected === "true");
    $scope.services.ipAddressSelected = ($scope.services.ipAddressSelected === "true");

    console.log("----- Initialisation");
    console.dir($scope.services);
    /*$scope.services = {
     networkSelected: false,
     autoTemplates: {
     selected: false,
     templates: []
     },
     manualTemplatesSelected: false,
     ram: {
     selected: false,
     min: "",
     max: ""
     },
     hdd: {
     selected: false,
     min: "",
     max: ""
     },
     os: {
     selected: false,
     templates: []
     },
     swap: {
     selected: false,
     min: "",
     max: ""
     },
     cpu: {
     selected: false,
     min: "",
     max: ""
     },
     ipAddressSelected: false,
     authenticationSelected: false
     };
     */

    $scope.admin = {login: "", password: "", email: ""};
    // 0 for 'Manage Services' tab
    // 1 for 'Create Admin' tab
    var show = 0;
    // If the provider has not saved the services he wants to use, he can not create a new admin
    // false before the first click on 'Save' button
    // true after
    var initServices = false;
    $scope.message = "";
    var showMessage = false;

    $scope.createAdminAccount = function () {
        console.log("----- Admin creation");
        console.log("login: " + $scope.admin.login + " - password: " + $scope.admin.password + " - email: " + $scope.admin.email);

        // Call to API
        backendFactory.createAdmin($scope.admin).succes(function (data) {
            if (data.success === "true") {
                $scope.message = "The admin account has been successfully created.";
                showMessage = true;
                console.log("Admin account creation succeeded");
            }
            else {
                $scope.message = "The admin creation has failed for some reason.";
                showMessage = true;
                console.log("Admin creation failed");
            }
        })
                .error(function (error) {
                    $scope.message = "Ooops, I did it again: " + error.message + ".";
                    showMessage = true;
                    console.log("Admin creation failed but it's due to backend");
                });

        // Reset admin
        $scope.admin = {login: "", password: "", email: ""};
    };

    $scope.isMessageShown = function () {
        return showMessage;
    };

    $scope.saveServices = function () {
        // Check that at least one service is selected
        if ((!$scope.services.networkSelected) && (!$scope.services.autoTemplates.selected) && (!$scope.services.manualTemplatesSelected)) {
            $scope.message = "You have to select at least one service!";
            showMessage = true;
        }
        // Check that the user have choosen between manual and auto templates
        else if ((!$scope.services.autoTemplates.selected) && (!$scope.services.manualTemplatesSelected)) {
            $scope.message = "You have to select manual or auto templates.";
            showMessage = true;
        }
        // Check that user have indicated at least one template
        else if (($scope.services.autoTemplates.selected) && $scope.services.autoTemplates.templates.length === 0) {
            $scope.message = "You should indicate at least one template.";
            showMessage = true;
        }
        else if (($scope.services.manualTemplatesSelected) && (!$scope.services.ram.selected) && (!$scope.services.hdd.selected)
                && (!$scope.services.os.selected) && (!$scope.services.swap.selected) && (!$scope.services.cpu.selected)
                && (!$scope.services.ipAddressSelected) && (!$scope.services.authenticationSelected)) {
            $scope.message = "You should select at least one field.";
            showMessage = true;
        }
        // Check that user have indicated at least one OS template
        else if (($scope.services.os.selected) && $scope.services.os.templates.length === 0) {
            $scope.message = "You should indicate at least one OS.";
            showMessage = true;
        }
        // Everything is ok
        else {
            // Put the fields in the correct format
            $scope.services.networkSelected = $scope.services.networkSelected.toString();
            $scope.services.autoTemplates.selected = $scope.services.autoTemplates.selected.toString();
            $scope.services.manualTemplatesSelected = $scope.services.manualTemplatesSelected.toString();
            $scope.services.ram.selected = $scope.services.ram.selected.toString();
            $scope.services.hdd.selected = $scope.services.hdd.selected.toString();
            $scope.services.os.selected = $scope.services.os.selected.toString();
            $scope.services.cpu.selected = $scope.services.cpu.selected.toString();
            $scope.services.swap.selected = $scope.services.swap.selected.toString();
            $scope.services.authenticationSelected = $scope.services.authenticationSelected.toString();
            $scope.services.ipAddressSelected = $scope.services.ipAddressSelected.toString();

            console.log("----- Init services");
            console.dir($scope.services);

            // Call to API
            backendFactory.selectServices($scope.services)
                    .success(function (data) {
                        if (data.success === "true") {
                            $scope.message = "Your choices have been saved. Yay!";
                            showMessage = true;
                            initServices = true;
                            console.log("Services initialisation ok");
                        }
                        else {
                            $scope.message = "Unable to save your choices, sorry.";
                            showMessage = true;
                            console.log("Services initialisation failed");
                        }
                    })
                    .error(function (error) {
                        $scope.message = "Unable to save your choices, sorry: " + error.message + ".";
                        showMessage = true;
                        console.log("Services initialisation failed but it's due to backend");
                    });
        }
    };

    $scope.manualTemplatesChoiceChanged = function () {
        $scope.services.autoTemplates.selected = false;
    };

    $scope.autoTemplatesChoiceChanged = function () {
        $scope.services.manualTemplatesSelected = false;
    };

    $scope.areAutoTemplatesShown = function () {
        return $scope.services.autoTemplates.selected;
    };

    $scope.areManualTemplatesShown = function () {
        return $scope.services.manualTemplatesSelected;
    };

    $scope.isRAMShown = function () {
        return $scope.services.ram.selected;
    };

    $scope.isHDDShown = function () {
        return $scope.services.hdd.selected;
    };

    $scope.isCPUsShown = function () {
        return $scope.services.cpu.selected;
    };

    $scope.isSWAPShown = function () {
        return $scope.services.swap.selected;
    };

    $scope.isOSShown = function () {
        return $scope.services.os.selected;
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
        $scope.services.os.templates.push({
            name: ""
        });
    };

    $scope.addAutoTemplate = function () {
        $scope.services.autoTemplates.templates.push({
            name: ""
        });
    };

    $scope.isMessageShown = function () {
        return showMessage;
    };

    $scope.logout = function () {
        userFactory.setUser(null);
        $location.path('/backend');
    };
});

