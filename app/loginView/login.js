/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
lanj.controller('LoginController', function($scope, $location){
    this.login = "";
    this.password = "";
    this.users = users;
    
    this.logIn = function (){
        // try the authenticate the user
        if (this.isValidUser()) {
            console.log("authentication success");
            // Redirect url
            var type = this.login;
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
    
    // try to search the login/password among users ' data
    this.isValidUser = function () {
        var i = 0;
        var found = false;
        while (!found && i < this.users.length){
            //console.log("loop user password : " + this.users[i][this.login]);
            if (this.users[i][this.login] === this.password){
                found = true;
            }
            i++;
        }
        return found;
    }
});

var users = [ {"admin" : "admin"}, {"provider" : "provider"}, {"student" : "student"}, {"professor" : "professor"} ];
