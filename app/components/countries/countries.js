angular.module('countries', ['ngRoute','countriesResource'])
	.config(['$routeProvider', function($routeProvider){
		$routeProvider
			.when('/countries',{
				templateUrl: 'components/countries/countries.html',
				controller: 'CountriesCtrl'
			})
			.when('/countries/:country/capital',{
				templateUrl:'components/countries/country-capital.html',
				controller: 'CountriesCtrl',
			})
			.when('/countries/:country/capital',{
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
	.controller('CountriesCtrl', ['$scope', '$rootScope', '$route', '$routeParams', 
		'$location', 'Geonamesfactory', 'Countryfactory', 'Neighborfactory', 'Capitalfactory',
		function($scope, $rootScope, $route, $routeParams, $location, Geonamesfactory, Countryfactory, Neighborfactory, Capitalfactory){

		$scope.gopage = function(pagepath){
			$location.path(pagepath);
		}

		$scope.gopagecountry = function(pagepath){
			$location.path('/countries/'+ pagepath + '/capital');
		}

		$scope.gopagecaps = function(capital){
			$rootScope.capital = capital;
			console.log($rootScope.capital);
		}
		$rootScope.capital;

		// $rootScope.$on('$routeChangeSuccess', function(){
		// 	//console.log ("In routeChangeSuccess:" + $routeParams.country);	
		// 	return $routeParams.country;
		// });
		// $rootScope.param = $routeParams.country;
		// console.log ("2. routeparams country:" + $routeParams.country + ":rootScope param:"+ $rootScope.param);		
		

		if (typeof $routeParams.country === 'undefined') {
			console.log("if part");
			$scope.results = Geonamesfactory.query();
		}
		else
		{
			console.log ("Else part");
			Countryfactory.country = $routeParams.country;
			Countryfactory.query();	
			$scope.countryresults = Countryfactory.query({country: $routeParams.country});

			Neighborfactory.country = $routeParams.country;
			$scope.neighborresults=[];	
			
			Neighborfactory.query({country: $routeParams.country}).$promise.then(function(neighbors){
				
				neighbors.nfdata.forEach(function(neighbor){
					//console.log(neighbor.countryCode);
					Countryfactory.query({country:neighbor.countryCode}).$promise.then(function(country){
						neighbor.capital = country.cfdata[0].capital;
						$scope.neighborresults.push(neighbor);
						console.log($scope.neighborresults);
					})


				});	
			})
			


			Capitalfactory.capital = $rootScope.capital;
			Capitalfactory.q = $rootScope.capital;
			Capitalfactory.name_equals = $rootScope.capital;
			Capitalfactory.country = $routeParams.country;
			Capitalfactory.query();	
			$scope.capitalresults = Capitalfactory.query({country: $routeParams.country, capital: $rootScope.capital, q: $rootScope.capital, name_equals: $rootScope.capital});

		}
	}]);



