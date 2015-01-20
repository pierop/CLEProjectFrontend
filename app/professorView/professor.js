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
    var showMessage = false;
    var isVMCreated = false;
    $scope.message = "";

    var showStudentsArray = false;

    // This will be initialized with the real services after authentication
    
    backendFactory.getServices()
            .success(function(data){
                if (data.success){
                    $scope.services = data.services;
                }
                else {
                    console.log("getServices failed");
                }
    })
            .error(function(){
                console.log("error in getServices");
    });
    /*$scope.services = {
        networkSelected: true,
        autoTemplates: {
            selected: true,
            templates: [
                {name: 'Template1'},
                {name: 'Template2'},
                {name: 'Template3'}]
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
            templates: [
                {name: 'Linux'},
                {name: 'Windows'},
                {name: 'Mac'}]
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
    };*/

    $scope.toDisplay = {groupOfVMs: false};
    
    $scope.initVM = function () {
        console.log("initialize the vm");

        isVMCreated = true;

        $scope.vm = {login: "",
            admin: "",
            name: ""
        };
        $scope.vm.admin = $scope.user.admin;
        $scope.vm.login = $scope.user.login;

        $scope.toDisplay.groupOfVMs = false;

        if ($scope.services.networkSelected) {
            $scope.vm['nbVm'] = 1;
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

    $scope.initStudentsArray = function () {
        $scope.vm['students'] = [];
        for (var i = 0; i < $scope.vm.nbVM; i++) {
            $scope.vm.students.push({name: ""});
        }
        showStudentsArray = true;
    };

    $scope.isStudentsArrayShown = function () {
        return showStudentsArray;
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
       
        // Si on veut créer une nouvelle vm
        if (!isVMCreated) {
             // Si on veut créer un réseau
            if (showStudentsArray) {
                backendFactory.createSubnet($scope.vm).success(function(data) {
                    if (data.success) {
                        showMessage = true;
                        $scope.message = "The subnet has been successfully created.";
                        $scope.vm.id = data.id; // add a vm id
                        $scope.vm.vmProviderID = data.vmProviderID;
                        $scope.vm.ipAddress = data.ipAddress; // add an vm ipAddress
                        $scope.user.vm.push($scope.vm);
                    }
                    else {
                        showMessage = true;
                        $scope.message = "The creation of the subnet has failed for some reason.";
                    }
                })
                        .error(function(error) {
                            showMessage = true;
                    $scope.message = "Ooops, I did it again: " + error.message + ".";
                });
            }
            // Si on veut créer une seule VM
            else {
                backendFactory.createVM($scope.vm).success(function (data) {
                    if (data.success) {
                        showMessage = true;
                        $scope.message = "The subnet has been successfully created.";
                        /*$scope.vm.subID = data.subId; // add a vm id
                        $scope.vm.vmProviderID = data.vmProviderID;
                        $scope.vm.ipAddress = data.ipAddress; // add an vm ipAddress
                        $scope.user.vm.push($scope.vm);*/
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
            } 
        }
        // Si on veut modifier une vm déjà existante
        else {
            // Si on veut créer une seule vm
            if (!showStudentsArray) {
                // Appel au backend
                backendFactory.updateVM($scope.vm).success(function (data) {
                    if (data.success) {
                        showMessage = true;
                        $scope.message = "The virtual machine has been successfully updated.";
                        var vmIndex = $scope.user.vm.indexOf($scope.vm);
                        $scope.user.vm[vmIndex] = $scope.vm;
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
            }             
        }
    };

    $scope.updateVM = function (vm) {
        showCreateVMPage = true;
        isVMCreated = false;
        $scope.vm = vm;
    };

    $scope.deleteVM = function (vm) {
        backendFactory.deleteVM(vm.vmId).success(function (res) {
            if (res.status) {
                var index = $scope.user.vm.indexOf(vm);
                if (index > -1)
                    $scope.user.vms.slice(index, 1);
                else
                    console.log("vm not found in $scope.user.vms");
            } else {
                console.error("ERROR : [deleteVM in professor.js] operation failed");
            }
        })
                .error(function (err) {
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

    $scope.startVM = function (vm) {
        console.log("start vm with name " + vm.name + " and id " + vm.vmId);
        backendFactory.startVM(vm.vmId).success(function (res) {
            if (res.status)
                $scope.changeVMState(vm, "on");
            else
                console.error("an error occured while trying to start vm");
        })
        .error(function () {
            $scope.showVMAlert = true;
        });
    };

    $scope.stopVM = function (vm) {
        console.log("stop vm with name " + vm.name + " and id " + vm.vmId);
        backendFactory.startVM(vm.vmId).success(function (res) {
            if (res.status)
                $scope.changeVMState(vm, "off");
            else
                console.error("an error occured while trying to stop vm");
        })
        .error(function () {
            $scope.showVMAlert = true;
        });
    };

    $scope.changeVMState = function (vm, state) {
        vm.state = state;
    };

    $scope.isMessageShown = function () {
        return showMessage;
    };

    $scope.logout = function () {
        userFactory.setUser(null);
        $location.path('/');
    };
});

