angular.module('home', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider){
		$routeProvider
			.when('/',{
				templateUrl: 'components/home/home.html',
				controller: 'HomeCtrl'
			});
	}])
	.controller('HomeCtrl', [function(){

	}]);