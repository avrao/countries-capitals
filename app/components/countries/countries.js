angular.module('countries', ['ngRoute','countriesResource'])
	.config(['$routeProvider', function($routeProvider){
		$routeProvider
			.when('/countries',{
				templateUrl: 'components/countries/countries.html',
				controller: 'CountriesCtrl'
			})
			.when('/countries/:country',{
				templateUrl:'components/countries/country-capital.html',
				controller: 'CountriesCtrl',
			})
			.otherwise({
				redirectTo: '/error',
			})
			.when('/error', {
    			template : '<p>Error Page Not Found</p>'
			});
	}])
	.controller('CountriesCtrl', ['$scope', '$rootScope', '$route', '$routeParams', '$location', 'Geonamesfactory', 'Countryfactory',
		function($scope, $rootScope, $route, $routeParams, $location, Geonamesfactory, Countryfactory){

		$scope.gopage = function(pagepath){
			$location.path(pagepath);
		}
		$scope.gopagecaps = function(pagepath){
			$location.path('/countries/'+ pagepath);
		}


		$rootScope.$on('$routeChangeSuccess', function(){
			console.log ("In routeChangeSuccess:" + $routeParams.country);	
			return $routeParams.country;
		});
		$rootScope.param = $routeParams.country;
		console.log ("2. routeparams country:" + $routeParams.country + ":rootScope param:"+ $rootScope.param);			
		if (typeof $routeParams.country === 'undefined') {
			$scope.results = Geonamesfactory.query();
		}
		else
		{
			console.log ("Else part");
			$scope.countryresults = Countryfactory.query({country:$routeParams.country});
			//		$scope.results = Geonamesfactory.query();			
		}
	}]);



