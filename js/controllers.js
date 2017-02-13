angular.module('app.controllers', [])

.controller('MapCtrl', function($scope, $http, $location, $geolocation) {

    //Define Icones
    var local_icons = {
        default_icon: {
            iconUrl: 'images/marker-icon.png',
            shadowUrl: 'images/marker-shadow.png'
                // iconSize: [38, 95], // size of the icon
                // shadowSize: [50, 64], // size of the shadow
                // iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
                // shadowAnchor: [4, 62], // the same for the shadow
                // popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
        }
    };

    //configuracoes
    angular.extend($scope, {
        center: {
            lat: -15.45,
            lng: -57.12,
            zoom: 4
        },
        defaults: {
            scrollWheelZoom: false
        },
        controls: {
            scale: true,
            fullscreen: {
                position: 'topleft'
            }
        },
        icons: local_icons
    });

    $scope.markers = new Array();

    //Iniciar na posicao escolhida..
    // $scope.$on("centerUrlHash", function(event, centerHash) {
    //     $location.search({
    //         c: centerHash
    //     });
    // });

    //Aproximar - tem que passar a lat e lng como parametro no funcao do ng-click
    $scope.changeLocation = function() {
        $geolocation.getCurrentPosition({
            timeout: 60000
        }).then(function(position) {
            console.log(position.coords.latitude + ":" + position.coords.longitude + ":" + 13);
            $location.search({
                c: position.coords.latitude + ":" + position.coords.longitude + ":" + 13
            });
            $scope.myPosition = position;
        });
    };

    //puxa do servidor os carros
    $scope.carregarCarros = function() {
        $http.get('json/carros.json')
            .then(function(response) {
                angular.forEach(response.data, function(value, key) {
                    $scope.markers.push(value.title, value);
                });
            }, function(error) {
                console.log("erro");
            });
    }

});