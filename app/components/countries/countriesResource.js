angular.module('countriesResource', ['ngResource'])
	.constant('COUNTRY_CODE_JSON_FILE', './country-code.json')
	.constant('CC_API_PREFIX','http://api.geonames.org/countryInfoJSON')
	.constant('CC_COUNTRY_PATH', '/?country={{ country }}')
  	.constant('CC_FIND_COUNTRY_PATH', '/?q={{ q }}')

	.factory('libcountrycode', ['$http', '$q', 'COUNTRY_CODE_JSON_FILE',
	               function($http, $q, COUNTRY_CODE_JSON_FILE) {
		return function() {
		  var defer = $q.defer();
		  $http.get(COUNTRY_CODE_JSON_FILE, { cache : true })
		    .success(function(countrycodes) {
		      defer.resolve(countrycodes);
		      
		    });
		  return defer.promise;
	}
	}])
	.factory('ccRequest', ['$http', '$q', 'CC_API_PREFIX',
                  function($http,   $q,   CC_API_PREFIX) {
	    return function(path) {
	      var defer = $q.defer();
	      $http.get(CC_API_PREFIX + path)
	        .success(function(data) {
	          defer.resolve(data);
	        })
	      return defer.promise;
    }
  	}])
  	.factory('ccFindCountry',    ['ccRequest', '$interpolate', 'CC_FIND_COUNTRY_PATH', 'CC_COUNTRY_PATH',
                      function(ccRequest,   $interpolate,   CC_FIND_COUNTRY_PATH,   CC_COUNTRY_PATH) {
	    return function(q) {
	      var path;
	      if(q.match(/^\[A-Z]{2}+$/)) {
	        path = $interpolate(CC_COUNTRY_PATH)({
	          country : q
	        });
	      } else {
	        path = $interpolate(CC_FIND_COUNTRY_PATH)({
	          q : q
	        });
	      }
	      return ccRequest(path);
    }
  	}])
	.factory('Geonamesfactory', ['$resource', function($resource) {
		var urlGeonames = 'http://api.geonames.org/countryInfoJSON';
		var urlcapital = 'http://api.geonames.org/searchJSON?q=london&maxRows=10&username=anitha';
		var urlneighbors = 'http://api.geonames.org/neighbours?geonameId=2658434&username=demo';

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
    .factory('Countryfactory', ['$resource', function($resource) {   
    	var urlcountry = 'http://api.geonames.org/searchJSON';
  		
  		console.log ("country factory");
  		console.log( "routeParams.country");

		return $resource(urlcountry, {country: 'AF', maxRows: '1', username:"anitha"},  {
			query: {
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
	}]);