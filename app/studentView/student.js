/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
lanj.controller('StudentController', function ($scope, $location, userFactory, backendFactory) {
    this.user = userFactory.getUser();
    this.showMessage = false;


    $scope.startVM = function (vm) {
        console.log("start vm with name " + vm.name + " and id " + vm.id);
        backendFactory.startVM(vm.id).success(function (res) {
            if (res.success === "true")
                $scope.changeVMState(vm, "on");
            else
                console.error("an error occured while trying to start vm");
        })
        .error(function () {
            $scope.showVMAlert = true;
        });
    };

    $scope.stopVM = function (vm) {
        console.log("stop vm with name " + vm.name + " and id " + vm.id);
        backendFactory.stopVM(vm.id).success(function (res) {
            if (res.success === "true")
                $scope.changeVMState(vm, "off");
            else
                console.error("an error occured while trying to stop vm");
        })
        .error(function () {
            $scope.showVMAlert = true;
        });
    };

    $scope.changeVMState = function (vm, state) {
        vm.state = state;
    };



    /*this.startVM = function (vm) {
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
*/
    this.logout = function () {
        userFactory.setUser(null);
        $location.path('/');
    };

    //window.setInterval(vmFactory.checkVMStates(), 500);
});