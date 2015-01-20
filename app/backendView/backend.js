/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
lanj.controller('BackendController', function ($location, backendFactory, userFactory) { //authenticationFactory
    this.login = "";
    this.password = "";

    this.logIn = function () {
        // try the authenticate the user
        //var getUser = authenticationFactory(this.login, this.password);
        var authentication = backendFactory.authenticateProvider(this.login, this.password);
        authentication.success(function (user) {
            if (user.success) {
                console.log("authentication success for " + user.provider);
                userFactory.setUser(user.provider);
                
                // Redirect url
                $location.path('/provider');
            } else {
                console.log("authentication fail");
                document.getElementById("logAlert").innerHTML = "Invalid login or password";
            }

            // reset the form
            this.login = "";
            this.password = "";
        })
                .error(function () {
                    console.log("ERROR : [login.js - logIn] an error occured on post");
                });
    };
});
