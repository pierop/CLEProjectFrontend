/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';

lanj.controller('ProfessorController', function ($scope, userFactory, backendFactory) {
    // 0 for 'VMs' tab
    // 1 for 'Templates' tab
    var show = 0;
    // True is 'Create VM' page is shown
    // False if only the VMs page is shown
    var showCreateVMPage = false;
    // This will be initialized with the real services after authentication
    $scope.services = userFactory.getUser().services;
    /*$scope.services = {
     networkSelected: true,
     autoTemplates: {
     selected: true,
     templates: ['Template1', 'Template2', 'Template3']
     },
     manualTemplatesSelected: true,
     ram: {
     selected: true,
     min: "0",
     max: "10"
     },
     hdd: {
     selected: true,
     min: "",
     max: ""
     },
     os: {
     selected: true,
     templates: ['Linux', 'Windows', 'Mac']
     },
     swap: {
     selected: true,
     min: "",
     max: ""
     },
     cpus: {
     selected: true,
     min: "",
     max: ""
     },
     ipAddressSelected: true,
     authenticationSelected: true
     };
     */

    $scope.userVMs = userFactory.getUser().vms;
    $scope.vm = {}; // vm variable for the creation
    $scope.toDisplay = {groupOfVMs: false};

    $scope.initVM = function () {
        console.log("initialize the vm");
        $scope.vm = {login: "",
            vmName: ""
        };
        $scope.vm.login = userFactory.getUser().login;
        $scope.toDisplay.groupOfVMs = false;

        if ($scope.services.networkSelected) {
            $scope.vm['numberOfVMs'] = 1;
        }
        if ($scope.services.autoTemplates.selected) {
            $scope.vm['vmTemplate'] = "";
        }
        if ($scope.services.manualTemplatesSelected) {
            if ($scope.services.ram.selected) {
                $scope.vm['ram'] = 0;
            }
            if ($scope.services.hdd.selected) {
                $scope.vm['hdd'] = 0;
            }
            if ($scope.services.os.selected) {
                $scope.vm['os'] = "";
            }
            if ($scope.services.swap.selected) {
                $scope.vm['swap'] = 0;
            }
            if ($scope.services.cpus.selected) {
                $scope.vm['cpus'] = 0;
            }
            if ($scope.services.ipAddressSelected) {
                $scope.vm['ipAddress'] = "";
            }
            if ($scope.services.authenticationSelected) {
                $scope.vm['password'] = "";
            }
        }
        $scope.vm['student'] = "";

        showCreateVMPage = true;
        console.log($scope.vm);
    };

    $scope.isGroupOfVMsShown = function () {
        return $scope.toDisplay.groupOfVMs;
    };

    $scope.isRAMShown = function () {
        return $scope.services.ram.selected;
    };

    $scope.isHDDShown = function () {
        return $scope.services.hdd.selected;
    };

    $scope.isOSShown = function () {
        return $scope.services.os.selected;
    };

    $scope.isCPUsShown = function () {
        return $scope.services.cpus.selected;
    };

    $scope.isSWAPShown = function () {
        return $scope.services.swap.selected;
    };

    $scope.isIPAddressShown = function () {
        return $scope.services.ipAddressSelected;
    };

    $scope.isAuthenticationShown = function () {
        return $scope.services.authenticationSelected;
    };

    $scope.createVM = function () {
        console.log("create the vm");
        console.log($scope.vm);
        showCreateVMPage = false;
        // Call the API
        backendFactory.createVM($scope.vm).success(function (data) {
            if (data.success) {
                showMessage = true;
                $scope.message = "The virtual machine has been successfully created.";
            }
            else {
                showMessage = true;
                $scope.message = "The creation of the virtual machine has failed for some reason.";
            }
        })
                .error(function (error) {
                    showMessage = true;
                    $scope.message = "Ooops, I did it again: " + error.message + ".";
                });
    };

    $scope.showVMsTab = function () {
        show = 0;
        // By default, we see the list of VMs
        showCreateVMPage = false;
    };

    $scope.showTemplatesTab = function () {
        show = 1;
    };

    $scope.areVMsShown = function () {
        return show === 0;
    };

    $scope.areTemplatesShown = function () {
        return show === 1;
    };

    $scope.isAutoTemplatesServiceOffered = function () {
        return $scope.services.autoTemplates.selected;
    };

    $scope.isManualTemplatesServiceOffered = function () {
        return $scope.services.manualTemplatesSelected;
    };

    $scope.isNetworkServiceOffered = function () {
        return $scope.services.networkSelected;
    };

    $scope.isCreateVMPageShown = function () {
        return showCreateVMPage;
    };

    $scope.startVM = function (vm) {
        console.log("start vm with name " + vm.vmName + " and id " + vm.id);
        this.changeVMState(vm, "on");
    };

    $scope.stopVM = function (vm) {
        console.log("stop vm with name " + vm.vmName + " and id " + vm.id);
        this.changeVMState(vm, "off");
    };

    $scope.changeVMState = function (vm, state) {
        vm.state = state;
    };
});

