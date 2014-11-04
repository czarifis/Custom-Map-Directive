/**
 * Created by Costas Zarifis on 10/16/14.
 */
var mapApp = angular.module('myMapDirectiveApp', ['services']);

mapApp.directive('czMap', function () {
    return{

        restrict:'AE',
        transclude: true,
        template: '<div id="map_canvas" ng-transclude></div>',
//        scope:true,


        // compile and template function differences:
        // http://stackoverflow.com/questions/20941568/what-are-the-benefits-of-a-directive-template-function-in-angularjs

        compile: function ( elem, attrs)
        {
            var mapOptions,
                latitude = attrs.latitude,
                longitude = attrs.longitude,
                zm = attrs.zoom;
            //            map;

            //        console.log('lat:',latitude,'long:',longitude);

            latitude = parseFloat(latitude); //|| 43.074688;
            longitude = parseFloat(longitude); //|| -89.384294;
            zm = parseFloat(zm);
            mapOptions = {
                zoom: zm,
                center: new google.maps.LatLng(latitude, longitude)
            };

            map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

            var marker = new google.maps.Marker({
                position:  new google.maps.LatLng(latitude,longitude),
                map: map,
                title: 'Hello World!'
//                icon: iconBase+(Math.floor(Math.random() * 3) + 1)+'.png'
            });


        }


    }});




mapApp.directive('czMarker', function () {
    return{
        restrict:'AE',
        priority: 100, //<-- PRIORITY
        scope:{
            latitude : '=',
            longitude : '='

        },
        // compile and template function differences:
        // http://stackoverflow.com/questions/20941568/what-are-the-benefits-of-a-directive-template-function-in-angularjs

        compile: function ( elem, attrs)
        {

            return {
                post: function post(scope, iterElement, attr)
                {
                    console.log('printing insidemarker... ', 'elem: ', iterElement, 'attr: ', attr, 'scope', scope);

                    var mapOptions,
                        latitude = scope.latitude,
                        longitude = scope.longitude;

                    console.log('map:', map);

                    latitude = parseFloat(latitude);
                    longitude = parseFloat(longitude);

                    console.log('Marker', 'lat:', latitude, 'long:', longitude);

                    var marker = new google.maps.Marker({
                        position: new google.maps.LatLng(latitude, longitude),
                        map: map,
                        icon: iconBase  ,
                        title: 'Hello World!'
                    });
                }
            }
        }
    }});


mapApp.directive('czPolylines', function(){

    var allPolylines = [];

    return{
        restrict:'AE',
        terminal :true, // this module will have the lowest priority. (It will be executed last)
        scope:{
            polylines : '=polylines'
        },

        link: function link(scope, iterElement, attr, ctrl) {

            console.log('scope.polylines',scope.polylines);

            /**
             * will run after the polylines get initialized and after each modification on the list (itself)
             * that holds the polylines
             *
             */
            scope.$watchCollection('polylines',function( newValue, oldValue ) {


                if(allPolylines.length==0) {
                    // Polyline initialization
                    console.log('initialization');
                    for (var j = 0; j < newValue.length; j++) {


                        scope.$watch('polylines['+j+']', function (newValue1, oldValue1 ) {

                            // add a watch on each polyline


//                            if(newValue1 === oldValue1){
//                                return
//                            }
//                            var listOfpositions = [];
////                            console.log('this polyline changed', newValue1);
////                            console.log('is this valid:', newValue1.idkey);
////                            console.log('newValue1', newValue1, 'oldValue1', oldValue1);
//
//                            // generating a list of LatLngs that form the polylines
//                            for (var i = 0; i < newValue1.lineString.length; i++) {
//                                //                                console.log(newValue1.lineString[i][1],newValue1.lineString[i][0]);
//                                listOfpositions.push(new google.maps.LatLng(newValue1.lineString[i][1], newValue1.lineString[i][0]));
//                            }
//
//                            var googlePolyline = new google.maps.Polyline({
//                                path: listOfpositions,
//                                geodesic: true,
//                                strokeColor: '#00000F',
//                                strokeOpacity: 1.0,
//                                strokeWeight: 5
//                            });
//
//                            allPolylines[newValue1.idkey] =googlePolyline;
//                            allPolylines[newValue1.idkey].setMap(map);
                        },true);
//

                        var pLine = scope.polylines[j].lineString;
                        var listOfpositions = [];
                        for (var i = 0; i < pLine.length; i++) {
//                            console.log(pLine[i][1], pLine[i][0]);
                            listOfpositions.push(new google.maps.LatLng(pLine[i][1], pLine[i][0]));
                        }
//                        console.log(listOfpositions);

                        var googlePolyline = new google.maps.Polyline({
                            path: listOfpositions,
                            geodesic: true,
                            strokeColor: '#000000',
                            strokeOpacity: 1.0,
                            strokeWeight: 1
                        });

//                        googlePolyline.setMap(map);

                        allPolylines[scope.polylines[j].idkey] = googlePolyline;
                        allPolylines[scope.polylines[j].idkey].setMap(map);

                    }
                }

//                    scope.$watch('markerz['+i+'].coords', function (newValue1, oldValue1 ) {

            });
        }
    }

});

mapApp.directive('czLinkmarkers', ['MyMarkers',function (MyMarkers,_) {
    var allMarkers = [];
    var allMarkersModel = [];

    // This function returns the difference between two arrays [a,b,c,d].diff([a,b]) = [c,d]
    Array.prototype.diff = function(a) {
        return this.filter(function(i) {return a.indexOf(i) < 0;});
    };


    function diffArray(a, b) {
        var seen = [], diff = [];
        for ( var i = 0; i < b.length; i++)
            seen[b[i]] = true;
        for ( var i = 0; i < a.length; i++)
            if (!seen[a[i]])
                diff.push(a[i]);
        return diff;
    }
    return{
        restrict:'AE',
//        priority: 1, //<-- PRIORITY
        terminal :true, // this module will have the lowest priority. (It will be executed last)
        scope:{
            markerz : '=markers'
        },

        link: function link(scope, iterElement, attr, ctrl) {
            console.log('printing inside marker... ', 'elem: ', iterElement, 'attr: ', attr, 'scope', scope);
            console.log('got this from scope:',scope.markerz);

            scope.$watchCollection('markerz',function( newValue, oldValue ) { //will execute after random markers are created

                console.log('watchCollection');
                console.log('scope:',scope);
                console.log('map:', map);
                var iconBase = 'img/truck';


                if(allMarkers==0) {
                    // Then this is the initialization stage
                    for (var i = 0; i < newValue.length; i++) {
                        var mapOptions,
                            latitude = newValue[i].coords.latitude,
                            longitude = newValue[i].coords.longitude;
                        latitude = parseFloat(latitude);
                        longitude = parseFloat(longitude);

                        console.log('adding marker');
                        var marker = new google.maps.Marker({
                            position: new google.maps.LatLng(latitude, longitude),
                            map: map,
                            icon: iconBase+(Math.floor(Math.random() * 3) + 1)+'.png'  ,
                            title: 'Hello World!'
                        });
                        allMarkers.push(marker);

                        scope.$watch('markerz['+i+'].coords', function (newValue1, oldValue1 ) {
//                            console.log('Inner Watch!');
////                            console.log('oldValue:',oldValue1,'newValue',newValue1,'allMarkersModel',allMarkersModel);
//
//
//                            for(avar = 0; avar<allMarkersModel.length;avar++) {
////                                console.log(allMarkersModel[avar].coords,newValue1)
//                                if (angular.equals(allMarkersModel[avar].coords, newValue1)) {
////                                    console.log('previous element:',oldValue[avar].coords,'current element:',newValue[avar].coords);
////                                    console.log('allMarkers[avar]',allMarkers[avar]);
////
//                                    var lats = newValue[avar].coords.latitude,
//                                        longs = newValue[avar].coords.longitude;
//                                    lats = parseFloat(lats);
//                                    longs = parseFloat(longs);
//                                    var position = new google.maps.LatLng(lats, longs)
//
//
//                                    allMarkers[avar].setPosition(position);
////                                    console.log('found changed element');
//                                }
//                            }
                        },true);

                    }

                    console.log('NOT!!! Inner Watch!');

                    allMarkersModel=newValue.slice(0);


                }
                else{
                    // We need to figure out if the user added, removed or updated a marker
                    if(newValue.length>oldValue.length){

                        console.log(newValue,oldValue);
                        console.log('The user added a marker:');
                        var addedMarker = newValue[newValue.length-1];
                        console.log(addedMarker);

                        var lats = addedMarker.coords.latitude,
                            longs = addedMarker.coords.longitude;
                        lats = parseFloat(lats);
                        longs = parseFloat(longs);





                        console.log('adding new marker');
                        var upmarker = new google.maps.Marker({
                            position: new google.maps.LatLng(lats, longs),
                            map: map,
                            icon: iconBase+(Math.floor(Math.random() * 3) + 1)+'.png'  ,
                            title: 'Hello World!'
                        });
                        allMarkers.push(upmarker);
                        allMarkersModel=newValue.slice(0);




                    }else if(newValue.length<oldValue.length){
                        console.log('The user removed a marker');
                        var delMarkerModel = oldValue.diff(newValue)[0];
                        console.log('allMarkers',allMarkers);
                        console.log('delMarkerModel',delMarkerModel);
                        console.log('allMarkersModel',allMarkersModel);
                        for(kk=0; kk<allMarkersModel.length;kk++) {
//                                    console.log('allMarkersModel[kk].idKey',allMarkersModel[kk].idKey);
                            if(allMarkersModel[kk].idKey == delMarkerModel.idKey){
                                // found the marker delete it from the map
                                console.log('GOT IT');
                                console.log('allMarkers[kk]',allMarkers[kk]);
                                allMarkers[kk].setMap(null);
                                allMarkers.splice(kk, 1);

                            }
                        }
                        allMarkersModel=newValue.slice(0);

                    }
                    else if(newValue.length==oldValue.length) {

                        console.log('The user updated a marker');
                        var updatedMarker = oldValue.diff(newValue)[0];
                        console.log(updatedMarker);

                        console.log(diffArray(newValue,oldValue));

                        for(var avar = 0; avar<newValue.length;avar++){
                            if(!angular.equals(newValue[avar].coords, oldValue[avar].coords)){
                                console.log('previous element:',oldValue[avar].coords,'current element:',newValue[avar].coords);
                                console.log('allMarkers[avar]',allMarkers[avar]);

                                var lats = newValue[avar].coords.latitude,
                                    longs = newValue[avar].coords.longitude;
                                lats = parseFloat(lats);
                                longs = parseFloat(longs);
                                var position = new google.maps.LatLng(lats, longs)


                                allMarkers[avar].setPosition(position);
                            }
                            if(!angular.equals(newValue[avar].checked, oldValue[avar].checked)){
                                console.log('went from:',newValue[avar].checked,'to:',oldValue[avar].checked);
                                allMarkers[avar].setVisible(newValue[avar].checked);

                            }
                        }
                        allMarkersModel=newValue.slice(0);



                    }

                }
                // store the current array at the allMarkersModel variable

                console.log('--------------------------------------------------');
            });








//            scope.$watch('markerz',function( newValue, oldValue ) { //will execute after random markers are created
//
//                console.log('scope:',scope);
//                console.log('deep watch');
//                console.log('map:', map);
//
//                if(allMarkers==0) {
//                    // Then this is the initialization stage
//                    for (i = 0; i < newValue.length; i++) {
//                        var mapOptions,
//                            latitude = newValue[i].coords.latitude,
//                            longitude = newValue[i].coords.longitude;
//                        latitude = parseFloat(latitude);
//                        longitude = parseFloat(longitude);
//
//                        console.log('adding marker')
//                        var marker = new google.maps.Marker({
//                            position: new google.maps.LatLng(latitude, longitude),
//                            map: map,
//                            title: 'Hello World!'
//                        });
//                        allMarkers.push(marker);
//
//                        scope.$watch('markerz['+i+'].coords.latitude', function (newValue1, oldValue1 ) {
//                            console.log('Inner Watch!');
//                            console.log('oldValue:',oldValue1,'newValue',newValue1);
//                        },true);
//
//                    }
//
//
//
//                }
//                else{
//                    // We need to figure out if the user added, removed or updated a marker
//                    if(newValue.length>oldValue.length){
//
//                        console.log(newValue,oldValue);
//                        console.log('The user added a marker:');
//                        var addedMarker = newValue[newValue.length-1];
//                        console.log(addedMarker);
//
//                        var lats = addedMarker.coords.latitude,
//                            longs = addedMarker.coords.longitude;
//                        lats = parseFloat(lats);
//                        longs = parseFloat(longs);
//                        console.log('adding new marker')
//                        var upmarker = new google.maps.Marker({
//                            position: new google.maps.LatLng(lats, longs),
//                            map: map,
//                            title: 'Hello World!'
//                        });
//                        allMarkers.push(upmarker);
//
//
//
//
//                    }else if(newValue.length<oldValue.length){
//                        console.log('The user removed a marker');
//                        var delMarkerModel = oldValue.diff(newValue)[0];
//                        console.log('allMarkers',allMarkers);
//                        console.log('delMarkerModel',delMarkerModel);
//                        console.log('allMarkersModel',allMarkersModel);
//                        for(kk=0; kk<allMarkersModel.length;kk++) {
////                                    console.log('allMarkersModel[kk].idKey',allMarkersModel[kk].idKey);
//                            if(allMarkersModel[kk].idKey == delMarkerModel.idKey){
//                                // found the marker delete it from the map
//                                console.log('GOT IT');
//                                console.log('allMarkers[kk]',allMarkers[kk]);
//                                allMarkers[kk].setMap(null);
//                                allMarkers.splice(kk, 1);
//
//                            }
//                        }
//                    }
//                    else if(newValue.length==oldValue.length) {
//
//                        console.log('The user updated a marker');
//                        var updatedMarker = oldValue.diff(newValue)[0];
//                        console.log(updatedMarker);
//
//                        console.log(diffArray(newValue,oldValue));
//
//                        for(var avar = 0; avar<newValue.length;avar++){
//                            if(!angular.equals(newValue[avar].coords, oldValue[avar].coords)){
//                                console.log('previous element:',oldValue[avar].coords,'current element:',newValue[avar].coords);
//                                console.log('allMarkers[avar]',allMarkers[avar]);
//
//                                var lats = newValue[avar].coords.latitude,
//                                    longs = newValue[avar].coords.longitude;
//                                lats = parseFloat(lats);
//                                longs = parseFloat(longs);
//                                var position = new google.maps.LatLng(lats, longs)
//
//
//                                allMarkers[avar].setPosition(position);
//                            }
//                            if(!angular.equals(newValue[avar].checked, oldValue[avar].checked)){
//                                console.log('went from:',newValue[avar].checked,'to:',oldValue[avar].checked);
//                                allMarkers[avar].setVisible(newValue[avar].checked);
//
//                            }
//                        }
//
//
//                    }
//
//                }
//                // store the current array at the allMarkersModel variable
//                allMarkersModel=newValue.slice(0);
//
//                console.log('--------------------------------------------------');
//            },true);


//                    scope.$watch('markerz',function( newValue, oldValue ) {
//
//                        console.log('watch markers');
//                        console.log('oldValue:',oldValue,'newValue',newValue);
//                        console.log('newValue[0].idKey',newValue[0].idKey);
//                    });


        }
//            }
//        }
    }}]);







// This directive doesn't need to declare any watches somehow the markers array is there before this
// code cicks in. The only difference from the czLinkmarkers is that the list with the markers comes
// from a factory
//mapApp.directive('czLinkmarkersfromfactory', ['MyMarkers', function (MyMarkers) {
//    return{
//        restrict:'AE',
//        terminal :true, // this module will have the lowest priority. (It will be executed last)
//        scope:{
//            markers : '=markers'
//        },
//
//        link: function link(scope, iterElement, attr) {
//            console.log('printing inside marker... ', 'elem: ', iterElement, 'attr: ', attr, 'scope', scope);
//
//            console.log('got this from Service:',MyMarkers.list);
//            markerz = MyMarkers.list;
//            for ( i =0 ; i<markerz.length;i++){
//
//
//                var mapOptions,
//                    latitude = markerz[i].coords.latitude,
//                    longitude = markerz[i].coords.longitude;
//
//                latitude = parseFloat(latitude);
//                longitude = parseFloat(longitude);
//                var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
//
//                var marker = new google.maps.Marker({
//                    position: new google.maps.LatLng(latitude, longitude),
//                    map: map,
//                    icon: iconBase  ,
//                    title: 'Hello World!'
//                })}
//        }
//    }}]);
//
