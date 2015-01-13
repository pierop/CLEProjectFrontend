/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
lanj.controller('LoginController', function($location, backendFactory, userFactory){ //authenticationFactory
    this.login = "";
    this.password = "";
    
    this.logIn = function (){
        // try the authenticate the user
        //var getUser = authenticationFactory(this.login, this.password);
        var authentication = backendFactory.authenticate(this.login, this.password);
        authentication.success(function(user){
            if (user.success !== "false"){
                console.log("authentication success");
                userFactory.setUser(user);
                // Redirect url
                var type = user.role;
                if (type === 'admin'){
                    $location.path("/admin");
                } else if (type === 'student'){
                    $location.path("/student");
                } else if (type === 'provider'){
                    $location.path("/provider");
                } else if (type === 'professor') {
                    $location.path("/professor");
                } else {
                    console.error("unknown user type");
                }
            } else {
                console.log("authentication fail");
                document.getElementById("logAlert").innerHTML = "Invalid login or password";
                setTimeout(function(){
                    document.getElementById("logAlert").innerHTML = ""
                },3000);
            }
            
            // reset the form
            this.login =  "";
            this.password = "";
        }).
        error(function(){
            console.log("ERROR : [login.js - logIn] an error occured on post");
        });
    }
});
