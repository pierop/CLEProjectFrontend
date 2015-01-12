/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
lanj.factory('backendFactory', function($http){
    var baseUrl = 'http://localhost:9001/api';
    return {
        /* User endpoints */
        authenticate : function(login, password){
            return $http.post(baseUrl + '/users/authenticate', { login : login, password : password });
        },
        createAdmin : function(admin){
            return $http.post(baseUrl + '/:provider/users/admins', admin);
        },
        createProfessor : function(professor){
            return $http.post(baseUrl + '/:provider/users/professors', professor);
        },
        createStudent : function(student){
            return $http.post(baseUrl + '/:provider/users/students', student);
        },        
        /* Services endpoints */
        createVM : function(vm){
            return $http.post(baseUrl + '/:provider/vm/:login', vm);
        },
        deleteVM : function(){
            return $http.delete(baseUrl + '/:provider/vm/:vmid');
        },
        startVM : function(){
            return $http.get(baseUrl + '/:provider/vm/:vmid/start');
        },
        stopVM : function(){
            return $http.get(baseUrl + '/:provider/vm/:vmid/stop');
        }
        /* endpoint restants
         * getVMState
         * GET /{provider}/vm/{vmid}/state
         * 
         * selectServices
         * POST /{provider}/services
         * 
         * getOSTemplates
         * GET /{provider}/templates/OS
         * 
         * getTemplates
         * GET /{provider}/templates/{user}
         */
    };   
});