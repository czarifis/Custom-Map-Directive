/**
 * Created by xhrdx on 10/16/14.
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
                        title: 'Hello World!'
                    });
                }
            }
        }
    }});


mapApp.directive('czLinkmarkers', ['MyMarkers', function (MyMarkers) {
    var allMarkers = [];
    var allMarkersModel = [];

    // This function returns the difference between two arrays [a,b,c,d].diff([a,b]) = [c,d]
    Array.prototype.diff = function(a) {
        return this.filter(function(i) {return a.indexOf(i) < 0;});
    };
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

//            scope.$watchCollection('markerz',function( newValue, oldValue ) { //will execute after random markers are created
//
//                console.log('watchCollection');
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
//
//                    }
//                }
//                else{
//                    // We need to figure out if the user added or removed a marker
//                    if(newValue.length>oldValue.length){
//                        console.log('The user added a marker:');
//                        var addedMarker = newValue.diff(oldValue)[0]
//                        console.log(addedMarker);
//                        var mapOptions,
//                            latitude = addedMarker.coords.latitude,
//                            longitude = addedMarker.coords.longitude;
//                        latitude = parseFloat(latitude);
//                        longitude = parseFloat(longitude);
//                        console.log('adding new marker')
//                        var upmarker = new google.maps.Marker({
//                            position: new google.maps.LatLng(latitude, longitude),
//                            map: map,
//                            title: 'Hello World!'
//                        });
//                        allMarkers.push(upmarker);
//
//
//
//
//                    }else{
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
//
//                }
//                // store the current array at the allMarkersModel variable
//                allMarkersModel=newValue.slice(0);
//            });







            scope.$watch('markerz',function( newValue, oldValue ) { //will execute after random markers are created

                console.log('watchCollection');
                console.log('map:', map);

                if(allMarkers==0) {
                    // Then this is the initialization stage
                    for (i = 0; i < newValue.length; i++) {
                        var mapOptions,
                            latitude = newValue[i].coords.latitude,
                            longitude = newValue[i].coords.longitude;
                        latitude = parseFloat(latitude);
                        longitude = parseFloat(longitude);

                        console.log('adding marker')
                        var marker = new google.maps.Marker({
                            position: new google.maps.LatLng(latitude, longitude),
                            map: map,
                            title: 'Hello World!'
                        });
                        allMarkers.push(marker);


                    }
                }
                else{
                    // We need to figure out if the user added or removed a marker
                    if(newValue.length>oldValue.length){
                        console.log('The user added a marker:');
                        var addedMarker = newValue.diff(oldValue)[0]
                        console.log(addedMarker);
                        var mapOptions,
                            latitude = addedMarker.coords.latitude,
                            longitude = addedMarker.coords.longitude;
                        latitude = parseFloat(latitude);
                        longitude = parseFloat(longitude);
                        console.log('adding new marker')
                        var upmarker = new google.maps.Marker({
                            position: new google.maps.LatLng(latitude, longitude),
                            map: map,
                            title: 'Hello World!'
                        });
                        allMarkers.push(upmarker);




                    }else{
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
                    }

                }
                // store the current array at the allMarkersModel variable
                allMarkersModel=newValue.slice(0);

                console.log('--------------------------------------------------');
            },true);


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
mapApp.directive('czLinkmarkersfromfactory', ['MyMarkers', function (MyMarkers) {
    return{
        restrict:'AE',
        terminal :true, // this module will have the lowest priority. (It will be executed last)
        scope:{
            markers : '=markers'
        },

        link: function link(scope, iterElement, attr) {
            console.log('printing inside marker... ', 'elem: ', iterElement, 'attr: ', attr, 'scope', scope);

            console.log('got this from Service:',MyMarkers.list);
            markerz = MyMarkers.list;
            for ( i =0 ; i<markerz.length;i++){


                var mapOptions,
                    latitude = markerz[i].coords.latitude,
                    longitude = markerz[i].coords.longitude;

                latitude = parseFloat(latitude);
                longitude = parseFloat(longitude);

                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(latitude, longitude),
                    map: map,
                    title: 'Hello World!'
                })};
        }
    }}]);

