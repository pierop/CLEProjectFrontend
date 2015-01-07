/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';

lanj.controller('ProviderController', function($scope) {
    $scope.admin = { login: "", password: ""};
    // 0 for 'Manage Services' tab
    // 1 for 'Create Admin' tab
    $scope.show = 0;
    // If the provider has not saved the services he wants to use, he can not create a new admin
    // false before the first click on 'Save' button
    // true after
    $scope.initServices = false;
    
    $scope.createAdminAccount = function() {
      console.log("login: " + $scope.admin.login + " - password: " + $scope.admin.password);  
    };
    
    $scope.saveServices = function() {
        $scope.initServices = true;
        console.log("your services have been saved.");
    };
    
    $scope.areServicesInitialized = function() {
      return $scope.initServices;  
    };
    
    $scope.showManageServicesTab = function() {
      $scope.show = 0;  
    };
    
    $scope.showCreateAdminTab = function() {
        $scope.show = 1;
    };
    
    $scope.isManageServicesShown = function() {
        return $scope.show === 0;
    };
    
    $scope.isCreateAdminShown = function() {
        return $scope.show === 1;
    };
});

