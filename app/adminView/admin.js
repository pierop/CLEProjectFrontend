/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';

lanj.controller('AdminController', function ($scope, backendFactory, userFactory) {
    // 0 for 'VMs' tab
    // 1 for 'Create User' tab
    $scope.show = 0;
    $scope.userRoles = ['Professor', 'Student'];
    $scope.select = {selectedType: $scope.userRoles[0]};

    $scope.user = {login: "", password: ""};
    $scope.userVMs = userFactory.getUser().vms;
    $scope.showMessage = false;

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
                backendFactory.createProfessor($scope.user).success(function (data) {
                    if (data.success === 1) {
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
                console.log("user account created.");
                backendFactory.createStudent($scope.user).success(function (data) {
                    if (data.success === 1) {
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

    $scope.startVM = function (vm) {
        console.log("start vm with name " + vm.name + " and id " + vm.id);
        this.changeVMState(vm, "on");
    };

    $scope.stopVM = function (vm) {
        console.log("stop vm with name " + vm.name + " and id " + vm.id);
        this.changeVMState(vm, "off");
    };

    $scope.changeVMState = function (vm, state) {
        vm.state = state;
    };
});

