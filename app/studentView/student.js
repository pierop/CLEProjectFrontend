/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
lanj.controller('StudentController', function($scope, backendFactory, userFactory){
   this.userVMs =  userFactory.getUser().vms;
   
   this.startVM = function(vm){
       console.log("start vm with name " + vm.name + " and id " + vm.id);
       backendFactory.startVM
       this.changeVMState(vm,"on");
   };
   
   this.stopVM = function(vm){
       console.log("stop vm with name " + vm.name + " and id " + vm.id);
       this.changeVMState(vm,"off");
   };
   
   this.changeVMState = function (vm, state){
       vm.state = state;
   };
});