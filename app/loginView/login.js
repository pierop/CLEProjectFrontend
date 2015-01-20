/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
lanj.controller('LoginController', function ($location, backendFactory, userFactory) { //authenticationFactory
    this.login = "";
    this.password = "";

    this.logIn = function () {
        // try the authenticate the user
        //var getUser = authenticationFactory(this.login, this.password);
        var authentication = backendFactory.authenticate(this.login, this.password);
        authentication.success(function (user) {
            if (user.success) {
                console.log("authentication success for " + user.user.role);
                userFactory.setUser(user.user);
                
                var isAdmin = (user.user.role === "admin");
                var isProf = (user.user.role === "professeur");
                var isStudent = (user.user.role === "etudiant");
                var role = null;
                if (isAdmin)
                    $location.path('/' + user.user.role);
                else if (isProf){
                    role = "professor";
                    $location.path('/' + role);
                } else if (isStudent){
                    role = "student";
                    $location.path('/' + role);
                } else 
                    $location.path('/404');
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
