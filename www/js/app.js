// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngMaterial'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})



.controller('AppCtrl', function ($scope , $http){

	$scope.datasongs = {}
	$scope.has_play = false;
	$scope.has_search = false;

	$scope.search = function (val)
	{
		if (val === undefined) {
			console.log('No hay dato a buscar');
			return 0;
		}
		$scope.has_search = true;
		$scope.has_play = false;
		$http({
			method: 'GET',
			url: 'http://ivndevi.ddns.net/goearapi/search.php',
			params: {q:val}
		})
		.success(function (data) {
			$scope.datasongs = data;
			console.log(data);
			$scope.has_search = false;
		})
		.error(function (err) {
			alert("No ha sido posible traer los datos :c");
			$scope.has_search = false;
		});
	}

	$scope.play = function (id) {
		// alert(id);
		$scope.has_play = true;
		var url = "http://www.goear.com/action/sound/get/";
		var player = document.getElementById('reproductor');
		player.setAttribute('src', url + id);
		player.play();
	}

	$scope.getJsonString = function (jsn) 
	{
		return JSON.stringify(jsn);
	}

})