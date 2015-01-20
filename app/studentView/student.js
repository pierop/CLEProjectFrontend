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
                .success(function () {
                    console.log("vm started");
                    this.showMessage = false;
                })
                .error(function () {
                    this.showMessage = true;
                    console.log("error");
                });
    };
    // COULDDO : display a message in case of error

    this.stopVM = function (vm) {
        vmFactory.stopVM(vm)
                .success(function () {
                    console.log("vm stopptd");
                    this.showMessage = false;
                })
                .error(function () {
                    this.showMessage = true;
                    console.log("error");
                });
    };
    // COULDDO : display a message in case of error

    this.logout = function () {
        userFactory.setUser(null);
        $location.path('/');
    };

    window.setInterval(vmFactory.checkVMStates(), 500);
});