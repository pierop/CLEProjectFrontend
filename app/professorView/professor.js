/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';

lanj.controller('ProfessorController', function ($scope) {
    // 0 for 'VMs' tab
    // 1 for 'Templates' tab
    $scope.show = 0;
    // True is 'Create VM' page is shown
    // False if only the VMs page is shown
    $scope.showCreateVMPage = false;
    // This will be initialized with the real list of available templates after authentication
    $scope.availableTemplates = ['Template1', 'Template2', 'Template3'];
    $scope.osTemplates = ['Linux', 'Windows', 'Mac'];
    // This will be initialized with the real services after authentication
    $scope.services = {network: true,
        autoTemplates: true,
        manualTemplates: true,
        ram: true,
        hdd: true,
        os: false,
        swap: false,
        cpus: true,
        ipAddress: true,
        authentication: true};

    $scope.vm = {name: "", description: ""};
    $scope.toDisplay = { groupOfVMs: false,
        ram: false,
        hdd: false,
        os: false,
        swap: false,
        cpus: false,
        ipAddress: false,
        authentication: false };

    $scope.initVM = function () {
        if ($scope.services.network) {
            $scope.vm['numberOfVMs'] = 1;
        }
        if ($scope.services.autoTemplates) {
            $scope.vm['usePredefinedTemplate'] = true;
            $scope.vm['template'] = "";
        }
        if ($scope.services.manualTemplates) {
            $scope.vm['usePredefinedTemplate'] = false;
            if ($scope.services.ram) {
                $scope.vm['ram'] = 0;
                $scope.toDisplay.ram = true;
            }
            if ($scope.services.hdd) {
                $scope.vm['hdd'] = 0;
                $scope.toDisplay.hdd = true;
            }
            if ($scope.services.os) {
                $scope.vm['os'] = "";
                $scope.toDisplay.os = true;
            }
            if ($scope.services.swap) {
                $scope.vm['swap'] = 0;
                $scope.toDisplay.swap = true;
            }
            if ($scope.services.cpus) {
                $scope.vm['cpus'] = 0;
                $scope.toDisplay.cpus = true;
            }
            if ($scope.services.ipAddress) {
                $scope.vm['ipAddress'] = "";
                $scope.toDisplay.ipAddress = true;
            }
            if ($scope.services.authentication) {
                $scope.vm['password'] = "";
                $scope.toDisplay.authentication = true;
            }
        }
        
        $scope.showCreateVMPage = true;
        console.log($scope.vm);
    };

    $scope.isGroupOfVMsShown = function () {
        return $scope.toDisplay.groupOfVMs;
    };
    
    $scope.isRAMShown = function() {
        return $scope.toDisplay.ram;
    };
    
    $scope.isHDDShown = function() {
        return $scope.toDisplay.hdd;
    };
    
    $scope.isOSShown = function() {
        return $scope.toDisplay.os;
    };
    
    $scope.isCPUsShown = function() {
        return $scope.toDisplay.cpus;
    };
    
    $scope.isSWAPShown = function() {
        return $scope.toDisplay.swap;
    };
    
    $scope.isIPAddressShown = function() {
        return $scope.toDisplay.ipAddress;
    };
    
    $scope.isAuthenticationShown = function() {
        return $scope.toDisplay.authentication;
    };

    $scope.createVM = function () {
        console.log($scope.vm);
        $scope.initVM();
        $scope.showCreateVMPage = false;
        /*
         * TODO: Call the API: POST /{provider}/vm/{login}
         * Add the created VM to the list of VMs displayed
         */
    };

    $scope.showVMsTab = function () {
        $scope.show = 0;
    };

    $scope.showTemplatesTab = function () {
        $scope.show = 1;
    };

    $scope.areVMsShown = function () {
        return $scope.show === 0;
    };

    $scope.areTemplatesShown = function () {
        return $scope.show === 1;
    };

    $scope.isAutoTemplatesServiceOffered = function () {
        return $scope.services.autoTemplates;
    };

    $scope.isManualTemplatesServiceOffered = function () {
        return $scope.services.manualTemplates;
    };

    $scope.isNetworkServiceOffered = function () {
        return $scope.services.network;
    };
    
    $scope.isCreateVMPageShown = function() {
        return $scope.showCreateVMPage;
    };
});

