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
    $scope.services.manualTemplatesSelected = ($scope.services.manualTemplatesSelected === "true");
    $scope.services.ram.selected = ($scope.services.ram.selected === "true");
    $scope.services.hdd.selected = ($scope.services.hdd.selected === "true");
    $scope.services.os = {};
    $scope.services.os.selected = ($scope.services.osSelected.selected === "true");
    $scope.services.cpu.selected = ($scope.services.cpu.selected === "true");
    $scope.services.swap.selected = ($scope.services.swap.selected === "true");
    $scope.services.authenticationSelected = ($scope.services.authenticationSelected === "true");
    $scope.services.ipAddressSelected = ($scope.services.ipAddressSelected === "true");
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
     };*/

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
        console.log("login: " + $scope.admin.login + " - password: " + $scope.admin.password);
        // Reset admin
        $scope.admin = {login: "", password: "", email: ""};
        // Call to API: POST /{provider}/admin
        backendFactory.createAdmin($scope.admin).succes(function (data) {
            if (data.success === "true") {
                showMessage = true;
                $scope.message = "The admin account has been successfully created.";
            }
            else {
                showMessage = true;
                $scope.message = "The admin creation has failed for some reason.";
            }
        })
                .error(function (error) {
                    showMessage = true;
                    $scope.message = "Ooops, I did it again: " + error.message + ".";
                });
    };

    $scope.isMessageShown = function () {
        return showMessage;
    };

    $scope.saveServices = function () {
        // Check that at least one service is selected
        if ((!$scope.services.networkSelected) && (!$scope.services.autoTemplates.selected) && (!$scope.services.manualTemplatesSelected)) {
            showMessage = true;
            $scope.message = "You have to select at least one service!";
        }
        // Check that the user have choosen between manual and auto templates
        else if ((!$scope.services.autoTemplates.selected) && (!$scope.services.manualTemplatesSelected)) {
            showMessage = true;
            $scope.message = "You have to select manual or auto templates.";
        }
        // Check that user have indicated at least one template
        else if (($scope.services.autoTemplates.selected) && $scope.services.autoTemplates.templates.length === 0) {
            showMessage = true;
            $scope.message = "You should indicate at least one template.";
        }
        else if (($scope.services.manualTemplatesSelected) && (!$scope.services.ram.selected) && (!$scope.services.hdd.selected)
                && (!$scope.services.os.selected) && (!$scope.services.swap.selected) && (!$scope.services.cpu.selected)
                && (!$scope.services.ipAddressSelected) && (!$scope.services.authenticationSelected)) {
            showMessage = true;
            $scope.message = "You should select at least one field.";
        }
        // Check that user have indicated at least one OS template
        else if (($scope.services.os.selected) && $scope.services.os.templates.length === 0) {
            $scope.message = "You should indicate at least one OS.";
        }
        // Everything is ok
        else {
            initServices = true;
            console.log("your services have been saved.");
            console.log("network: " + $scope.services.networkSelected
                    + " - autoTemplates: " + $scope.services.autoTemplates.selected
                    + " - manualTemplates: " + $scope.services.manualTemplatesSelected
                    + " - ram: " + $scope.services.ram.selected
                    + " - hdd: " + $scope.services.hdd.selected
                    + " - os: " + $scope.services.os.selected
                    + " - swap: " + $scope.services.swap.selected
                    + " - cpu: " + $scope.services.cpu.selected
                    + " - ipAddress: " + $scope.services.ipAddressSelected
                    + " - authentication: " + $scope.services.authenticationSelected);

            if ($scope.services.os.selected) {
                console.log("OS templates:");
                for (var i = 0; i < $scope.services.os.templates.length; i++) {
                    console.log($scope.services.os.templates[i].name);
                }
            }
            if ($scope.services.ram.selected) {
                console.log("ram: min: " + $scope.services.ram.min + " - max: " + $scope.services.ram.max);
            }
            if ($scope.services.hdd.selected) {
                console.log("hdd: min: " + $scope.services.hdd.min + " - max: " + $scope.services.hdd.max);
            }
            if ($scope.services.swap.selected) {
                console.log("swap: min: " + $scope.services.swap.min + " - max: " + $scope.services.swap.max);
            }
            if ($scope.services.cpu.selected) {
                console.log("cpu: min: " + $scope.services.cpu.min + " - max: " + $scope.services.cpu.max);
            }
            if ($scope.services.autoTemplates.selected) {
                console.log("templates:");
                for (var i = 0; i < $scope.services.autoTemplates.templates.length; i++) {
                    console.log($scope.services.autoTemplates.templates[i].name);
                }
            }

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

            console.dir($scope.services);

            // Call to API
            backendFactory.selectServices($scope.services)
                    .success(function (data) {
                        if (data.success === "true") {
                            showMessage = true;
                            $scope.message = "Your choices have been saved. Yay!";
                        }
                        else {
                            showMessage = true;
                            $scope.message = "Unable to save your choices, sorry.";
                        }
                    })
                    .error(function (error) {
                        showMessage = true;
                        $scope.message = "Unable to save your choices, sorry: " + error.message + ".";
                    });

            showMessage = true;
            $scope.message = "Your choices have been saved.";
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

