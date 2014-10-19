/**
 * Created by xhrdx on 10/16/14.
 */
var mapApp = angular.module('myMapDirectiveApp', []);

mapApp.directive('czMap', function () {
    return{

        restrict:'AE',
//        scope:true,


        // compile and template function differences:
        // http://stackoverflow.com/questions/20941568/what-are-the-benefits-of-a-directive-template-function-in-angularjs

        compile: function ( elem, attrs)
        {


            var attachHere;
            elem.append('<div id="map_canvas"></div>');

    //        attachHere=document.getElementById('map_canvas');


    //        console.log('update elem[0]:',elem.firstChild);


    //            attachHere = elem.getElementById('map_canvas');


    //        for (i=0;i<elem[0].children.length;i++)
    //        {
    //            console.log('child element:');
    //            console.log(elem[0].children);
    //            if(elem[0].children[i].id=='map_canvas') {
    //                console.log('found google-map class');
    //                attachHere = elem[0].children[i].gete;
    //            }
    //        }
    //        console.log('out of loop');

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


mapApp.directive('czMarkers', function () {
    return{
        restrict:'AE',
//        priority: 1, //<-- PRIORITY
        terminal :true, // this module will have the lowest priority. (It will be executed last)
        scope:{
            markers : '=markers'
        },
        // compile and template function differences:
        // http://stackoverflow.com/questions/20941568/what-are-the-benefits-of-a-directive-template-function-in-angularjs

        compile: function ( elem, attrs) {
            return{

                post: function some(scope, iterElement, attr) {
                    console.log('printing inside marker... ', 'elem: ', iterElement, 'attr: ', attr, 'scope', scope);

                    console.log('scope.markers:', scope.markers);

                    scope.$watch('markers',function( newValue, oldValue ) { //will execute after random markers are created
                        console.log('BOOM');
                        console.log('oldValue:',oldValue,'newValue',newValue);
                        console.log('newValue.markers',newValue.markers);
                        console.log('newValue.markers.length',newValue.markers.length);

                        for (i =0 ; i<newValue.markers.length;i++){
                            console.log('newValue.markers['+i+']',newValue.markers[i]);
                        }

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
                    });

                    scope.$watch('markers.length',function( newValue, oldValue ) {

                        console.log('BOOM BOOM');
                        console.log('oldValue:',oldValue,'newValue',newValue);
                        console.log('newValue',newValue);
                    });


                }
            }
        }
    }});

