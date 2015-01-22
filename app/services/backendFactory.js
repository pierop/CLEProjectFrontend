/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
lanj.factory('backendFactory', function ($http, userFactory) {
    var baseUrl = 'http://localhost:9001/api';
    return {
        /* User endpoints */
        authenticate: function (login, password) {
            return $http.post(baseUrl + '/users/authenticate', {login: login, password: password});
        },
        authenticateProvider: function (login, password) {
            return $http.post(baseUrl + '/providers/authenticate', {login: login, password: password});
        },
        createAdmin: function (admin) {
            var provider = userFactory.getUser().provider;
            return $http.post(baseUrl + '/' + provider + '/users/admins', admin);
        },
        createProfessor: function (professor) {
            var provider = userFactory.getUser().provider;
            return $http.post(baseUrl + '/' + provider + '/users/professors', professor);
        },
        createStudent: function (student) {
            var provider = userFactory.getUser().provider;
            return $http.post(baseUrl + '/' + provider + '/users/students', student);
        },
        /* Services endpoints */
        createVM: function (vm) {
            var user = userFactory.getUser();
            return $http.post(baseUrl + '/' + user.provider + '/vm', vm);
        },
        createSubnet: function (vm) {
            var user = userFactory.getUser();
            return $http.post(baseUrl + '/' + user.provider + '/subnets', vm);
        },
        updateVM: function (vm) {
            var user = userFactory.getUser();
            return $http.put(baseUrl + '/' + user.provider + '/vm/' + vm.id, vm);
        },
        deleteVM: function (vmid) {
            var user = userFactory.getUser();
            /*var body = { "login": user.login };*/
            return $http.delete(baseUrl + '/' + user.provider + '/vm/' + vmid);
        },
        startVM: function (vmid) {
            var provider = userFactory.getUser().provider;
            return $http.post(baseUrl + '/' + provider + '/vm/' + vmid + '/start', {}); // à tester sans argument
        },
        stopVM: function (vmid) {
            var provider = userFactory.getUser().provider;
            return $http.post(baseUrl + '/' + provider + '/vm/' + vmid + '/stop', {}); // à tester sans argument
        },
        getVMState: function (vmid) {
            var provider = userFactory.getUser().provider;
            return {status: "running"};//$http.get(baseUrl + '/' + provider + '/vm/' + vmid + '/state');
        },
        /* Fait */
        selectServices: function (services) {
            var provider = userFactory.getUser().login;
            var data = {services: services};
            console.dir(data);
            return $http.post(baseUrl + '/' + provider + '/services', data);
        },
        // return { success : true/false, services : {} }
        getServices: function () {
            var provider = userFactory.getUser().provider;
            return $http.get(baseUrl + '/' + provider + '/services');
        }
    };   
});