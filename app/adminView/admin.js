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
    $scope.userTypes = [{name: 'Professor', value: 0},
        {name: 'Student', value: 1}];
    $scope.select = {selectedType: $scope.userTypes[0]};
    
    $scope.user = {type: "", login: "", password: ""};
    $scope.userVMs = userFactory.getUser().vms;

    $scope.createUserAccount = function () {
        $scope.user.type = $scope.select.selectedType.value;
        console.log("userType: " + $scope.user.type +
                " - login: " + $scope.user.login +
                " - password: " + $scope.user.password);

        switch ($scope.user.type) {
            case 0:
                // Create a professor account
                // Call to API: POST /{provider}/professor
                console.log("professor account created.");
                break;
            case 1:
                // Create a student account
                // Call to API: POST /{provider}/student
                console.log("user account created.");
                /*$scope.user = backendFactory.createStudent($scope.user).success(function(){
                    console.log("student added");
                });*/
                break;
            default:
                console.log("User type unknown.");
        }

        //Reset the user object
        $scope.user = {type: "", login: "", password: ""};
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

