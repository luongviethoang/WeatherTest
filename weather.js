'use strict';
var weatherApp = angular.module('weatherApp', []);
weatherApp.controller('WeatherCtrl', function ($scope, $http){
    $scope.submit = function (){
        const lat = document.getElementById("lat").value;
        const lon = document.getElementById("lon").value;

        $http.get("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=a7a8a7ed30f023bb3a86e4d12a23ef3b&units=metric")
            .success(function (data){
                if (data){
                    $scope.country = data.sys.country;
                    $scope.name = data.name;
                    $scope.current = data.main.temp;
                    $scope.temp_min = data.main.temp_min;
                    $scope.temp_max = data.main.temp_max;
                    $scope.wind_speed = data.wind.speed;
                    $scope.wind_deg = data.wind.deg;
                    $scope.clouds = data.clouds ? data.clouds.all : undefined;

                    var baseUrl =  'https://openweathermap.org/img/';

                    if ($scope.clouds < 20) {
                        $scope.img_url = baseUrl + 'wn/01d.png';
                    } else if ($scope.clouds < 90){
                        $scope.img_url = baseUrl + 'wn/10d@2x.png';
                    }else {
                        $scope.img_url = baseUrl + 'wn/04d@2x.png';
                    }
                }
            })
            .error(function (data, status){
                console.log(data);
            });
    }
});
