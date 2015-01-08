/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';

lanj.controller('ProfessorController', function($scope) {
    // 0 for 'VMs' tab
    // 1 for 'Templates' tab
    $scope.show = 0;
    // This will be initialized with the real list of available templates after authentication
    $scope.availableTemplates = ['Template1', 'Template2', 'Template3'];
    // This will be initialized with the real services after authentication
    $scope.services = { network: true,
        autoTemplates: true,
        manualTemplates: true,
        ram: true,
        hdd: true,
        os: true,
        swap: true,
        cpu: true,
        ipAddress: true,
        authentication: true };
    
    $scope.showVMsTab = function() {
        $scope.show = 0;
    };
    
    $scope.showTemplatesTab = function() {
        $scope.show = 1;
    };
    
    $scope.areVMsShown = function() {
       return $scope.show === 0;
   };
   
   $scope.areTemplatesShown = function() {
       return $scope.show === 1;
   };
   
   $scope.isTemplatesServiceOffered = function() {
     return $scope.services.autoTemplates;  
   };
});

