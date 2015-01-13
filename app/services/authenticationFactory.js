/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

lanj.factory('authenticationFactory', ['$http', function($http){
    var userProvider = {
        login : "provider", 
        password : "provider",
        type : "provider"
    };
    var userAdmin = {
        login : "admin",
        password : "admin",
        type : "admin",
        vms : [{
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
        }]
    };
    var userProf = {
        login : "professor",
        password : "professor",
        type : "professor",
        vms : [{
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
        }]
    };
    var userStudent = {
        login : "student", 
        password : "student",
        type : "student",
        vms : [{
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
        ]
    };
    
    return function(login, password){
        var data = { login : login, password : password };
        return $http.post('http://localhost:9001/api/users/authenticate', data);//.
        /*success(function(user){
            console.log(user.login);
             if (user == null){
                console.log("error user undefined");
                return null;
            }else{
                return user;
            }
        }).
        error(function(data, status, headers, config){
            console.log("data" + data + " status " + status);
            return null;
        });*/
        
        /*var isProvider = (login === userProvider.login && password === userProvider.password);
        var isAdmin = (login === userAdmin.login && password === userAdmin.password);
        var isProf = (login === userProf.login && password === userProf.password);
        var isStudent = (login === userStudent.login && password === userStudent.password);
        if (isProvider)
            return userProvider;
        else if (isAdmin)
            return userAdmin;
        else if (isProf)
            return userProf;
        else if (isStudent)
            return userStudent;
        else
            return null;*/
    }; 
}]);