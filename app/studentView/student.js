/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
lanj.controller('StudentController', function ($location, userFactory, vmFactory) {
    this.user = userFactory.getUser();
    this.showMessage = false;

    this.startVM = function (vm) {
        vmFactory.startVM(vm)
                .success(function (data) {
                    if (data.success === "true"){
                        console.log("vm started");
                        this.showMessage = false;
                    } else {
                        this.showMessage = true;
                        console.log("error on backend start request");
                    }
                })
                .error(function () {
                    this.showMessage = true;
                    console.log("error on start request");
                });
    };
    // COULDDO : display a message in case of error

    this.stopVM = function (vm) {
        vmFactory.stopVM(vm)
                .success(function () {
                    if (data.success === "true"){
                        console.log("vm stopped");
                        this.showMessage = false;
                    } else {
                        this.showMessage = true;
                        console.log("error on backend stop request");
                    }
                })
                .error(function () {
                    this.showMessage = true;
                    console.log("error on stop request");
                });
    };
    // COULDDO : display a message in case of error

    this.logout = function () {
        userFactory.setUser(null);
        $location.path('/');
    };

    window.setInterval(vmFactory.checkVMStates(), 500);
});