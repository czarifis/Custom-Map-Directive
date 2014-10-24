var mapServices = angular.module('services', []);

mapServices.factory('MyMarkers', function(){
    var createRandomMarker = function (i, idKey) {
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
                draggable: true

            },
            checked: true,
            title: 'marker: ' + i
        };
        ret[idKey] = i;


        return ret;
    };

    var randomMarkers = [];

    console.log('creating random markers');
    var markers = [];
//                console.log($scope.map.bounds);
    for (var i = 0; i < 20; i++) {

        mm = createRandomMarker(i);
        markers.push(mm);

//                $scope.randomMarkers = JSON.stringify(markers);


        randomMarkers = markers;
    }
    return{
        list:randomMarkers
    }
});

mapServices.factory('scopeMarkers',function(){


    scopeMarkers.generateMarker = function(){
        var createRandomMarker = function (i, idKey) {
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
                    draggable: true

                },
                checked: true,
                title: 'marker: ' + i
            };
            ret[idKey] = i;


            return ret;

    }

}})