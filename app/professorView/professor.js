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
   $scope.services = {
        network: {
            selected: true
        },
        autoTemplates: {
            selected: true,
            templates: ['Template1', 'Template2', 'Template3']
        },
        manualTemplates: {
            selected: true
        },
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
        ipAddress: {
            selected: true
        },
        authentication: {
            selected: true
        }};
    
    $scope.userVMs = userFactory.getUser().vms;
    $scope.vm = {}; // vm variable for the creation
    $scope.toDisplay = { groupOfVMs: false };

    $scope.initVM = function () {
        console.log("initialize the vm");
        $scope.vm = { name: "", description: "" };
        $scope.toDisplay.groupOfVMs = false;
        
        if ($scope.services.network.selected) {
            $scope.vm['numberOfVMs'] = 1;
        }
        if ($scope.services.autoTemplates.selected) {
            $scope.vm['usePredefinedTemplate'] = true;
            $scope.vm['template'] = "";
        }
        if ($scope.services.manualTemplates.selected) {
            $scope.vm['usePredefinedTemplate'] = false;
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
            if ($scope.services.ipAddress.selected) {
                $scope.vm['ipAddress'] = "";
            }
            if ($scope.services.authentication.selected) {
                $scope.vm['password'] = "";
            }
        }
        
        showCreateVMPage = true;
        console.log($scope.vm);
    };

    $scope.isGroupOfVMsShown = function () {
        return $scope.toDisplay.groupOfVMs;
    };
    
    $scope.isRAMShown = function() {
        return $scope.services.ram.selected;
    };
    
    $scope.isHDDShown = function() {
        return $scope.services.hdd.selected;
    };
    
    $scope.isOSShown = function() {
        return $scope.services.os.selected;
    };
    
    $scope.isCPUsShown = function() {
        return $scope.services.cpus.selected;
    };
    
    $scope.isSWAPShown = function() {
        return $scope.services.swap.selected;
    };
    
    $scope.isIPAddressShown = function() {
        return $scope.services.ipAddress.selected;
    };
    
    $scope.isAuthenticationShown = function() {
        return $scope.services.authentication.selected;
    };

    $scope.createVM = function () {
        console.log("create the vm");
        console.log($scope.vm);
        showCreateVMPage = false;
        // Call the API
        backendFactory.createVM($scope.vm).success(function(data) {
            
        })
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
        return $scope.services.manualTemplates.selected;
    };

    $scope.isNetworkServiceOffered = function () {
        return $scope.services.network.selected;
    };
    
    $scope.isCreateVMPageShown = function() {
        return showCreateVMPage;
    };
    
    $scope.startVM = function(vm){
       console.log("start vm with name " + vm.name + " and id " + vm.id);
       this.changeVMState(vm,"on");
   };
   
   $scope.stopVM = function(vm){
       console.log("stop vm with name " + vm.name + " and id " + vm.id);
       this.changeVMState(vm,"off");
   };
   
   $scope.changeVMState = function (vm, state){
       vm.state = state;
   };
});

