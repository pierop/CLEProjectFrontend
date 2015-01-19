/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';

lanj.controller('ProfessorController', function ($scope, $location, userFactory, backendFactory) {
    $scope.user = userFactory.getUser();
    // 0 for 'VMs' tab
    // 1 for 'Templates' tab
    var show = 0;
    // True is 'Create VM' page is shown
    // False if only the VMs page is shown
    var showCreateVMPage = false;
    // True if an error occured when trying to start/stop a vm
    // False if no error occured when trying to start/stop a vm
    $scope.showVMAlert = false;
       
    // This will be initialized with the real services after authentication
    $scope.services = $scope.user.services;
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
    $scope.vm = {}; // vm variable for the creation
    $scope.toDisplay = {groupOfVMs: false};

    $scope.initVM = function () {
        console.log("initialize the vm");
        $scope.vm = {login: "",
            admin: "",
            vmName: ""
        };
        $scope.vm.admin = $scope.user.admin;
        $scope.vm.login = $scope.user.login;

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
                $scope.vm['cpu'] = 0; // POST data contains 'cpu' instead of 'cpus'
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
        console.log("creating a new vm...");
        console.dir($scope.vm);
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
        showCreateVMPage = false;
        // Call the API
        backendFactory.createVM($scope.vm).success(function (data) {
            if (data.success) {
                showMessage = true;
                $scope.message = "The virtual machine has been successfully created.";
                $scope.vm.vmId = data.vmId; // add a vm id
                $scope.vm.ipAddress = data.ipAddress; // add an vm ipAddress
                $scope.user.vms.push($scope.vm);
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
    
    $scope.deleteVM = function (vm){
        backendFactory.deleteVM(vm.vmId).success(function(res){
            if (res.status){
                var index = $scope.user.vms.indexOf(vm);
                if (index > -1)
                    $scope.user.vms.slice(index,1);
                else
                    console.log("vm not found in $scope.user.vms");
            } else {
                console.error("ERROR : [deleteVM in professor.js] operation failed");
            }
        })
        .error(function(err){
            console.error("ERROR : [deleteVM in professor.js] " + err);
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
    
    $scope.startVM = function(vm){
        console.log("start vm with nodename " + vm.nodename + " and id " + vm.vmId);
        backendFactory.startVM(vm.vmId).success(function(res){
            if(res.status)
                $scope.changeVMState(vm,"on");
            else
                console.error("an error occured while trying to start vm");
        })
        .error(function(){
            $scope.showVMAlert = true;
        });
   };
   
   $scope.stopVM = function(vm){
        console.log("stop vm with nodename " + vm.nodename + " and id " + vm.vmId);
        backendFactory.startVM(vm.vmId).success(function(res){
            if(res.status)
                $scope.changeVMState(vm,"off");
            else
                console.error("an error occured while trying to stop vm");
        })
        .error(function(){
            $scope.showVMAlert = true;
        });
   };
   
   $scope.changeVMState = function (vm, state){
        vm.state = state;
   };
   
   $scope.logout = function (){
        userFactory.setUser(null);
        $location.path('/');
    };
});

