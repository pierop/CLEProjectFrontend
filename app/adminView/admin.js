/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';

lanj.controller('AdminController', function ($scope, $location, backendFactory, userFactory) {
    // 0 for 'VMs' tab
    // 1 for 'Create User' tab
    $scope.show = 0;
    $scope.userRoles = ['Professor', 'Student'];
    $scope.select = {selectedType: $scope.userRoles[0]};

    $scope.user = {login: "", password: "", admin: ""};
    // L'admin est l'utilisateur actuel
    $scope.user.admin = userFactory.getUser().login;
    $scope.userVMs = userFactory.getUser().vm;
    $scope.showMessage = false;
    $scope.showVMAlert = false;

    $scope.isMessageShown = function () {
        return $scope.showMessage;
    };

    $scope.createUserAccount = function () {
        //$scope.user.role = $scope.select.selectedType.toLowerCase();
        console.log("login: " + $scope.user.login +
                " - password: " + $scope.user.password);
        console.dir($scope.user);

        switch ($scope.select.selectedType) {
            case 'Professor':
                // Create a professor account
                // Call to API: POST /{provider}/professor
                backendFactory.createProfessor($scope.user).success(function(data) {
                    if (data.success) {
                        console.log("professor added");
                        $scope.message = "The professor account has been successfully created.";
                        $scope.showMessage = true;
                    } else {
                        console.log("professor creation failed");
                        $scope.message = "The professor creation has failed.";
                        $scope.showMessage = true;
                    }
                })
                .error(function (error) {
                    $scope.message = "Oooops, an error occured: " + error.message;
                    $scope.showMessage = true;
                });
                break;
            case 'Student':
                // Create a student account
                // Call to API: POST /{provider}/student
                console.log("student account created.");
                
                backendFactory.createStudent($scope.user).success(function(data) {
                    if (data.success) {
                        console.log("student added");
                        $scope.message = "The student account has been successfully created.";
                        $scope.showMessage = true;
                    } else {
                        console.log("student creation failed");
                        $scope.message = "The student creation has failed.";
                        $scope.showMessage = true;
                    }
                })
                        .error(function (error) {
                            $scope.message = "Oooops, an error occured: " + error.message;
                            $scope.showMessage = true;
                        });
                break;
            default:
                console.log("User type unknown.");
        }

        //Reset the user object
        $scope.user = {login: "", password: ""};
        $scope.showMessage = true;
    };

    $scope.showVMsTab = function () {
        $scope.show = 0;
    };

    $scope.showCreateUserTab = function () {
        $scope.show = 1;
    };

    $scope.areVMsShown = function () {
        return $scope.show === 0;
    };

    $scope.isCreateUserShown = function () {
        return $scope.show === 1;
    };

    $scope.deleteVM = function (vm){
        backendFactory.deleteVM(vm.vmId).success(function(res){
            if (res.success){
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
            console.error("ERROR : [deleteVM in professor.js] " + err.message);
        });
    };

    $scope.startVM = function(vm){
        console.log("start vm with nodename " + vm.nodename + " and id " + vm.vmId);
        backendFactory.startVM(vm.vmId).success(function(res){
            if(res.success)
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
            if(res.success)
                $scope.changeVMState(vm,"off");
            else
                console.error("an error occured while trying to stop vm");
        })
        .error(function(){
            $scope.showVMAlert = true;
        });
   };
   
   $scope.getVMState = function (vmId){
        console.log("get vm state");
        /*
         * { status:  running/stopped} running stopped
         */
        backendFactory.getVMState(vmId).success(function(data){
            if(data.success)
                return data;
            else
                return null;
        })
        .error(function(data){
            
        });
   };

    $scope.changeVMState = function (vm, state) {
        vm.state = state;
    };
    
    $scope.logout = function (){
        userFactory.setUser(null);
        $location.path('/');
    };
});

