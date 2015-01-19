/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';

lanj.controller('ProfessorController', function ($scope, $location, userFactory, backendFactory) {
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
    
    $scope.user = userFactory.getUser();
    //$scope.userVMs = $scope.user.vm;
    $scope.vm = {}; // vm variable for the creation
    $scope.toDisplay = { groupOfVMs: false };

    $scope.initVM = function () {
        console.log("initialize the vm");
        // version sans admin - deprecated
        $scope.vm = { nodename: "", vmName: "", description: "" , login: $scope.user.login, state: "off"}; // we suppose that by default the vm is off
        // version presque finale avec admin
        //$scope.vm = { nodename: "", description: "" , login: $scope.user.login, admin: $scope.user.admin, state: "off"}; // we suppose that by default the vm is off
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
                $scope.vm['cpu'] = 0; // POST data contains 'cpu' instead of 'cpus'
            }
            if ($scope.services.ipAddress.selected) {
                $scope.vm['ipAddress'] = "";
            }
            if ($scope.services.authentication.selected) {
                $scope.vm['password'] = "";
            }
        }
        
        showCreateVMPage = true;
        console.log("creating a new vm...");
        console.dir($scope.vm);
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
        showCreateVMPage = false;
        /*
         * TODO: Call the API: POST /{provider}/vm/{login}
         * Add the created VM to the list of VMs displayed
         */
        backendFactory.createVM($scope.vm).success(function(res){
            
            if(res.status){
                console.log("vm creation success");
                $scope.vm.vmId = res.vmId; // add a vm id
                $scope.vm.ipAddress = res.ipAddress; // add an vm ipAddress
                console.dir($scope.vm);
                $scope.user.vm.push($scope.vm);
            } else {
                // display a message : "the vm hasn't been created"
                console.error("mince il y a eu un problème à la création de la vm, pas de vm");
            }
        })
        .error(function(){
            console.error("vm creation fail");
            console.dir($scope.vm);
        })   
    };
    
    $scope.deleteVM = function (vm){
        backendFactory.deleteVM(vm.vmId).success(function(res){
            if (res.status){
                var index = $scope.user.vm.indexOf(vm);
                if (index > -1)
                    $scope.user.vm.slice(index,1);
                else
                    console.log("vm not found in userVMs");
            } else {
                console.error("ERROR : [deleteVM in professor.js] operation failed");
            }
        })
        .error(function(err){
            console.error("ERROR : [deleteVM in professor.js] " + err);
        })
    }

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

