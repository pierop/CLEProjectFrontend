/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
lanj.factory('userFactory', function(){
    var user = null;
    
    return {
        setUser : function(newUser){
            user = newUser;
        },
        getUser : function(){
            return user;
        }
    };
});
