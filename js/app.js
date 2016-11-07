var app = angular.module('ngschool', ['ngRoute']);
app.conf=function ($routeProvider) { 
  $routeProvider 
    .when('/', { 
      templateUrl: 'views/home.html' 
    })
    .when('/persone', { 
      controller: 'PersoneController', 
      templateUrl: 'views/persone.html' 
    })
    .when('/persone/:id', { 
      controller: 'PersoneController', 
      templateUrl: 'views/persone.html' 
    }) 	
    .otherwise({ 
      redirectTo: '/' 
    }); 
}
app.config(app.conf);
app.constant("swInfo", {
    "version": "1.0.1"
});
