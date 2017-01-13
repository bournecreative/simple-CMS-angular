var app = angular.module('gradeTable', []);

// we config default properties for $http
app.config(function($httpProvider){
  $httpProvider.defaults.headers.post = {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'};
});