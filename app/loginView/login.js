/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
lanj.controller('LoginController', function($location, authenticationFactory, userFactory){
    this.login = "";
    this.password = "";
    
    this.logIn = function (){
        // try the authenticate the user
        var user = authenticationFactory(this.login, this.password);
        if (user){
            console.log("authentication success");
            userFactory.setUser(user);
            // Redirect url
            var type = user.type;
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
        }
        // reset the form
        this.login =  "";
        this.password = "";
    }
});
