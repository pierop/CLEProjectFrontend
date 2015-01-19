/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
lanj.controller('StudentController', function($scope, $location, backendFactory, userFactory){
   this.userVMs =  userFactory.getUser().vm;
   this.showMessage = false;
   
   this.startVM = function(vm){
        console.log("start vm with name " + vm.name + " and id " + vm.vmId);
        backendFactory.startVM(vm.vmId).success(function(){
            this.changeVMState(vm,"on");
        })
        .error(function(){
            this.showMessage = true;
        });
   };
   
   this.stopVM = function(vm){
        console.log("stop vm with name " + vm.name + " and id " + vm.vmId);
        backendFactory.startVM(vm.vmId).success(function(){
            this.changeVMState(vm,"off");
        })
        .error(function(){
            this.showMessage = true;
        });
   };
   
   this.changeVMState = function (vm, state){
       vm.state = state;
   };
   
   this.logout = function (){
        userFactory.setUser(null);
        $location.path('/');
    };
});