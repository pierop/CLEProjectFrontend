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

    $scope.user = {login: "", password: "", email: "", admin: ""};
    $scope.userVMs = userFactory.getUser().vm;
    var showMessage = false;

    $scope.isMessageShown = function () {
        return showMessage;
    };

    $scope.createUserAccount = function () {
        // L'admin est l'utilisateur actuel
        $scope.user.admin = userFactory.getUser().login;
        console.log("------ Attempt to create a user ---------");
        console.log("------ Parameters -------");
        console.log("login: " + $scope.user.login 
                    + " - password: " + $scope.user.password
                    + " - email: " + $scope.user.email
                    + " - password: " + $scope.user.admin);
        console.dir($scope.user);

        switch ($scope.select.selectedType.toLowerCase()) {
            case 'professor':
                // Create a professor account
                // Call to API: POST /{provider}/professor
                console.log("----------- The user to create is a : [Database data] " + $scope.select.selectedType);
                console.log("---------- Call to the API ----------------");
                backendFactory.createProfessor($scope.user).success(function (data) {
                    if (data.success === "true") {
                        console.log("------- operation [add professor ] successful ----------");
                        $scope.message = "The professor account has been successfully created.";
                        showMessage = true;
                    } else {
                        console.log("------- operation [add professor ] failed ----------");
                        $scope.message = "The professor creation has failed.";
                        showMessage = true;
                    }
                })
                        .error(function () {
                            $scope.message = "Oooops, an error occured when calling the api";
                            showMessage = true;
                        });
                break;
            case 'student':
                // Create a student account
                // Call to API: POST /{provider}/student
                console.log("----------- The user to create is a : [Database data] " + $scope.select.selectedType);
                console.log("---------- Call to the API ----------------");
                backendFactory.createStudent($scope.user).success(function (data) {
                    if (data.success === "true") {
                        console.log("------- operation [add student] successful ----------");
                        $scope.message = "The student account has been successfully created.";
                        showMessage = true;
                    } else {
                        console.log("------- operation [add student] failed ----------");
                        $scope.message = "The student creation has failed.";
                        showMessage = true;
                    }
                })
                        .error(function () {
                            $scope.message = "Oooops, an error occured: ";
                            showMessage = true;
                        });
                break;
            default:
                console.log("Unknown user type : +" + $scope.select.selectedType);
        }

        //Reset the user object
        $scope.user = {login: "", password: "", email: "", admin: ""};
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

    $scope.deleteVM = function (vm) {
        console.log("----------- The vm to delete is ----------\n\n\n");
        console.dir(vm);
        console.log("\n\n\n");
        console.log("---------- Call to the API ----------------");
        backendFactory.deleteVM(vm.id).success(function (data) {
            if (data.success === "true") {
                console.log("------- operation [delete vm] successful ----------");
                var index = $scope.user.vm.indexOf(vm);
                if (index > -1)
                    $scope.user.vm.slice(index, 1);
                else
                    console.log("------- vm not found in userVMs - cannot delete -----------");
            } else {
                console.log("------- operation [delete vm] successful ----------");
            }
        })
                .error(function () {
                    $scope.message = "Oooops, an error occured: ";
                    showMessage = true;
                    console.error("ERROR : [deleteVM] bad request");
                });
    };

    $scope.startVM = function (vm) {
        console.log("----------- The vm to start is ----------\n\n\n");
        console.dir(vm);
        console.log("\n\n\n");
        console.log("---------- Call to the API ----------------");
        console.log("start vm with name " + vm.name + " and id " + vm.id);
        backendFactory.startVM(vm.id).success(function (res) {
            if (res.success === "true"){
                console.log("------- operation [start vm] successful ----------");
                $scope.changeVMState(vm, "on");
            } else {
                console.log("------- operation [start vm] failed ----------");
                console.error("ERROR : [startVM] operation failed in backend");
            }
        })
                .error(function () {
                    $scope.message = "Oooops, an error occured: ";
                    showMessage = true;
                    console.error("ERROR : [deleteVM] bad request");
                });
    };

    $scope.stopVM = function (vm) {
        console.log("----------- The vm to stop is ----------\n\n\n");
        console.dir(vm);
        console.log("\n\n\n");
        console.log("---------- Call to the API ----------------");
        backendFactory.stopVM(vm.id).success(function (res) {
            if (res.success === "true"){
                $scope.changeVMState(vm, "off");
                console.log("------- operation [stop vm] successful ----------");
            } else {
                console.log("------- operation [stop vm] failed ----------");
            }
        })
                .error(function () {
                    $scope.message = "Oooops, an error occured: ";
                    showMessage = true;
                });
    };

   $scope.getVMState = function (id){
        console.log("get vm state");
        /*
         * { status:  running/stopped} running stopped
         */
        console.log("----------- Request to get vm state with id " + id);
        console.log("---------- Call to the API ----------------");
        backendFactory.getVMState(id).success(function(data){
            if(data.success === "true"){
                console.log("------- operation [getVMState] successful ----------");
                return data;
            }else{
                console.log("------- operation [getVMState] failed ----------");
                return null;
            }
        })
        .error(function(data){
            $scope.message = "Oooops, an error occured: ";
            showMessage = true;
        });
   };

    $scope.changeVMState = function (vm, state) {
        vm.state = state;
    };

    $scope.logout = function () {
        userFactory.setUser(null);
        $location.path('/');
    };
});
