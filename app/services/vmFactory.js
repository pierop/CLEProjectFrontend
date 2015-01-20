/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
lanj.factory('vmFactory', function (userFactory, backendFactory) {

    this.createVM = function (vm) {
        var user = userFactory.getUser();
        backendFactory.createVM($scope.vm)
        .success(function (data) {
            if (data.success) {
                vm.id = data.id; // add a vm id
                vm.vmProviderID = data.vmProviderID;
                vm.ipAddress = data.ipAddress; // add an vm ipAddress
                user.vm.push(vm);
                userFactory.setUser(user);
                return "true";
            }
            else {
                return "false";
            }
        })
        .error(function () {
            return "false";
        });

    };

    /* Update the VM and return success : true/false */
    this.updateVM = function (vm) {
        var user = userFactory.getUser();
        backendFactory.updateVM(vm)
        .success(function (data) {
            if (data.success){
                var vmIndex = user.vm.indexOf(vm);
                user.vm[vmIndex] = vm;
                userFactory.setUser(user);
                return "true";
            } else {
                return "false";
            }
        })
        .error(function () {
            return "false";
        });
    };

    /* Delete the vm and */
    this.deleteVM = function (vm) {
        var user = userFactory.getUser();
        backendFactory.deleteVM(vm.id)
        .success(function (res) {
            if (res.success) {
                var index = user.vm.indexOf(vm);
                if (index > -1){
                    user.vm.slice(index, 1);
                    userFactory.setUser(vm);
                }                    
                else{
                    console.log("vm not found in userVMs");
                }
            } else {
                console.error("ERROR : [deleteVM in professor.js] operation failed");
            }
            return res.success;
        })
        .error(function (err) {
            console.error("ERROR : [deleteVM in professor.js] " + err.message);
            return res.success;
        });
    };

    this.startVM = function (vm) {
        return backendFactory.startVM(vm.id);
    };

    this.stopVM = function (vm) {
       return backendFactory.startVM(vm.id);
    };

    this.checkVMStates = function () {
        var user = userFactory.getUser();
        var i;
        for (i = 0; i < user.vm; i++) {
            backendFactory.getVMState(user.vm[i])
            .success(function (data) {
                if (data.status === "running")
                    user.vm[i].state = "on";
                else if (data.status === "stopped")
                    user.vm[i].state = "off";
                userFactory.setUser(user);
            })
            .error(function () {
                console.error("[Periodic state update] Cannot update the vm state, no arm no chocolate");
            });
        }
    };

    return {
        createVM: this.createVM,
        updateVM: this.updateVM,
        deleteVM: this.deleteVM,
        startVM: this.startVM,
        stopVM: this.stopVM,
        checkVMStates: this.checkVMStates
    };
});