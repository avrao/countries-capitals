angular.module('countriesResource', ['ngResource'])
	.factory('Geonamesfactory', ['$resource', function($resource) {
		var urlGeonames = 'http://api.geonames.org/countryInfoJSON';
		
		console.log ("Geonamesfactory");

		return $resource(urlGeonames, {username:"anitha" }, {
			query: {
                    isArray: false,
                    cache: true,
                    transformResponse: function (data) {
                        data = JSON.parse(data);
                        return {
                            geonamescfdata:data.geonames
                           };
                    }
            	}
        });
    }])
    .factory('Countryfactory', ['$resource', '$routeParams', function($resource, $routeParams) {   
    	var urlcountry = 'http://api.geonames.org/countryInfoJSON';
  		//var urlcountry = 'http://api.geonames.org/countryInfo?country=us&username=demo';

   		console.log ("country factory");
  		console.log($routeParams.country);

		return $resource(urlcountry, {country: $routeParams, maxRows: '1', username:"anitha"},  {
			query: {
					METHOD:'GET',
					isArray: false,
		            cache: true,
		            transformResponse: function (data) {
		                data = JSON.parse(data);
		                return {
		                    cfdata:data.geonames
		                   };
		            }
    			}
        });
	}])

	.factory('Neighborfactory', ['$resource', '$routeParams', function($resource, $routeParams) {   
    	var urlneighbors = 'http://api.geonames.org/neighboursJSON';
  		//var urlcountry = 'http://api.geonames.org/neighboursJSON?country=US&maxRows=3	&username=anitha';
		console.log ("neighbor factory");
  		console.log($routeParams.country);

		return $resource(urlneighbors, {country: $routeParams, maxRows:'3', username:"anitha"},  {
			query: {
					METHOD:"GET",
					isArray: false,
		            cache: true,
		            transformResponse: function (data) {
		                data = JSON.parse(data);
		                return {
		                    nfdata:data.geonames
		                   };
		            }
    			}
        });
	}])

	.factory('Capitalfactory', ['$resource', '$routeParams', '$rootScope', function($resource, $routeParams, $rootScope) {   
    	var urlcapitals = 'http://api.geonames.org/searchJSON';
    	//http://api.geonames.org/searchJSON?country=UK&q=london&name_equals=london&isNameRequired=true&maxRows=1&username=anitha
  		
  		console.log ("capital factory");
  		console.log($routeParams.country);
  		console.log($rootScope.capital);

		return $resource(urlcapitals, {country: $routeParams, q: $rootScope.capital, name_equals: $rootScope.capital, isNameRequired: true, maxRows: '1', username:"anitha"},  {
			query: {
					METHOD:"GET",
					isArray: false,
		            cache: true,
		            transformResponse: function (data) {
		                data = JSON.parse(data);
		                return {
		                    capfdata:data.geonames
		                   };
		            }
    			}
        });
	}]);	
	