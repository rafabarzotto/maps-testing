angular.module('app.controllers', [])

.controller('MapCtrl', function($scope, $http, $location, $geolocation, $compile, leafletData) {

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
        events: {
            map: {
                enable: ['zoomstart', 'drag', 'click', 'mousemove', 'popupopen'],
                logic: 'emit'
            }
        }
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
                    console.log(value);
                    $scope.markers.push({
                        title: value.geo.title,
                        lat: value.geo.coords[0],
                        lng: value.geo.coords[1],
                        placa: value.properties.placa,
                        icon: local_icons.default_icon
                    });
                });
            }, function(error) {
                console.log("erro");
            });
    }

    // $scope.$on('leafletDirectiveMap.popupopen', function(event) {
    //     console.log(event);
    // });

    var showPopup = function(marker_id) {
        var marker = $scope.markers[marker_id];
        console.log(marker);

        var _templateScope;
        if (!_templateScope) { //only if your using one window for all markers
            _templateScope = $scope.$new();
        }

        _templateScope.model = {
        };

        var content = "<popup id=\'"+ marker.placa + "\'></popup>";
        var compiled = $compile(content)(_templateScope);

        // plae the popup template on the map
        var latLng = [marker.lat, marker.lng];
        var popup = L.popup({
            className: 'custom-popup'
        }).setContent(compiled[0]).setLatLng(latLng);

        // // open the template
        leafletData.getMap().then(function(map) {
            popup.openOn(map);
        });

    };



    $scope.$on('leafletDirectiveMarker.click', function(e, args) {
        showPopup(args.modelName);
    });

});