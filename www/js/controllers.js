/**
 * Created by xhrdx on 10/16/14.
 */

angular.module('controllers',[]).controller('MapCtrl', function ($scope) {

    $scope.deleteMarker = function(marker){
        console.log('we should delete marker:',marker);
        var i = $scope.randomMarkers.indexOf(marker);
        $scope.randomMarkers.splice(i, 1);
    };

    $scope.addRandomMarker = function(){
        console.log('add random marker');

        console.log($scope.randomMarkers[$scope.randomMarkers.length-1].idKey);
        var rmark = createRandomMarker(new Date().getUTCMilliseconds());
        $scope.randomMarkers.push(rmark);

    };

    $scope.model = {hasChecked:true, keyID: undefined, currLat: 0, currLong: 0};

    $scope.clickedOnMarker = function(selMarker){
        console.log('clicked on marker ',selMarker);
        $scope.model.hasChecked = selMarker.checked;
        $scope.model.keyID = selMarker.idKey;
        $scope.isChecked = selMarker.checked;
        console.log('isChecked variable:',$scope.isChecked);


        $scope.model.currLat = selMarker.coords.latitude;
        $scope.model.currLong = selMarker.coords.longitude;
    };


    $scope.changeLat = function(){
        var item = {};
        for(var i=0;i<$scope.randomMarkers.length;i++){
            if($scope.randomMarkers[i].idKey==$scope.model.keyID){
                item = $scope.randomMarkers[i];
            }
        }
        item.coords.latitude = $scope.model.currLat;

    };

    $scope.changeLong = function(id){
        var item = {};
        for(var i=0;i<$scope.randomMarkers.length;i++){
            if($scope.randomMarkers[i].idKey==$scope.model.keyID){
                item = $scope.randomMarkers[i];
            }
        }
        item.coords.longitude = $scope.model.currLong;
        console.log('item:',item);
    };

    $scope.doRandom = function(){
        for (var i=0;i<10;i++){
            console.log('add random marker within doRandom');

            console.log($scope.randomMarkers[$scope.randomMarkers.length-1].idKey);
            var rmark = createRandomMarker(new Date().getUTCMilliseconds());
            $scope.randomMarkers.push(rmark);
            $scope.$apply();
        }

        var variab = {};
        for(var j=0;j<5;j++){
//            console.log($scope.randomMarkers[i]);
            variab = $scope.randomMarkers[j];
            console.log(variab);
            console.log('was variab.checked:',variab.checked);
            console.log(variab);
            //variab.checked = $scope.isChecked;
            if (variab.checked==true){
//                dummyVar = false;
//                $scope.model.hasChecked = false;
                variab.checked = false;
            }
            else{
//                dummyVar = true;
//                $scope.model.hasChecked = true;

                variab.checked = true;
            }
            $scope.$apply();
//            console.log('is isChecked:',dummyVar);
            console.log('variab now is:',variab);
        }
    };

    $scope.pushshowhide = function(key) {

        console.log('Push show/hide Change');
//        var variab = $scope.randomMarkers[key];
        var variab = {};
        for(var i=0;i<$scope.randomMarkers.length;i++){
//            console.log($scope.randomMarkers[i]);
            if($scope.randomMarkers[i].idKey==$scope.model.keyID){
                variab = $scope.randomMarkers[i];
                console.log(variab);
            }
        }

        console.log('was variab.checked:',variab.checked);
        console.log(variab);

        //variab.checked = $scope.isChecked;
        if (variab.checked==true){
//                dummyVar = false;
//                $scope.model.hasChecked = false;
            variab.checked = false;
        }
        else{
//                dummyVar = true;
//                $scope.model.hasChecked = true;

            variab.checked = true;
        }
//            console.log('is isChecked:',dummyVar);
        console.log('variab now is:',variab);
//        $scope.randomMarkers[$scope.model.keyID] = variab;
        //$scope.keyID = varID;

        console.log('scope.keyID now is:',$scope.model.keyID);

    };


    var createRandomMarker = function (i, idKey) {

//            var lat_min = bounds.southwest.latitude,
//                lat_range = bounds.northeast.latitude - lat_min,
//                lng_min = bounds.southwest.longitude,
//                lng_range = bounds.northeast.longitude - lng_min;

//        console.log('i:',i);
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
//        console.log('ret:',ret);

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