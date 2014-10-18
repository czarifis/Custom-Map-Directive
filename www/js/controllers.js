/**
 * Created by xhrdx on 10/16/14.
 */

angular.module('controllers',[]).controller('MapCtrl', function ($scope) {



    var createRandomMarker = function (i, idKey) {

//            var lat_min = bounds.southwest.latitude,
//                lat_range = bounds.northeast.latitude - lat_min,
//                lng_min = bounds.southwest.longitude,
//                lng_range = bounds.northeast.longitude - lng_min;

        var lat_min = -90,
            lat_range = 90 - lat_min,
            lng_min = -180,
            lng_range = 180 - lng_min;

        if (idKey == null) {
            idKey = "id";
        }

        var latitude = lat_min + (Math.random() * lat_range);
        var longitude = lng_min + (Math.random() * lng_range);
        var ret = {
            idKey: i,


            coords: {
                latitude: latitude,
                longitude: longitude
            },
            options: {
                title: 'The White House',
//                    labelContent : '<br />Overlapse',
                draggable: true

            },
            checked: true,
            title: 'marker: ' + i
//                events: {
//                    dragend: function (marker) {
//                        console.log('you moved the marker 2', marker);
//
//                    }
//                }


        };
        ret[idKey] = i;


        return ret;
    };

    $scope.randomMarkers = [];
// Get the bounds from the map once it's loaded
    $scope.$watch(function () {
        return $scope.map;
    }, function () {
        console.log('creating random markers');
        // Only need to regenerate once
//        if (!ov.southwest && nv.southwest) {
            var markers = [];
//                console.log($scope.map.bounds);
            for (var i = 0; i < 20; i++) {

                $scope.mm = createRandomMarker(i);
                markers.push($scope.mm);

//            }
//                $scope.randomMarkers = JSON.stringify(markers);


            $scope.randomMarkers = markers;
//                markers.push({events: {
//                    dragend: function (marker) {
//
//                        console.log('marker dragend');
//
//                    }}}
//                );

//            console.log(JSON.stringify(markers));

            $scope.randomMarkers = markers;
        }
    }, true);

})