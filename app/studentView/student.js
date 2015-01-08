/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
lanj.controller('StudentController', function($scope){
   this.userVMs = vms;
   
   this.startVM = function(vm){
       console.log("start vm with name " + vm.name + " and id " + vm.id);
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

var vms = [
    {
        id : "1",
        name: "VM1",
        ipAddress: "192.168.1.1",
        description: "vm pdlsoa",
        state: "off"
    },
    {
        id : "2",
        name: "VM2",
        ipAddress: "192.168.1.2",
        description: "vm amra",
        state: "on"
    },
    {
        id : "3",
        name: "VM3",
        ipAddress: "192.168.1.3",
        description: "vm cloud",
        state: "off"
    },
    {
        id : "4",
        name: "VM4",
        ipAddress: "192.168.1.4",
        description: "vm ri",
        state: "on"
    }
];