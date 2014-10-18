/**
 * Created by xhrdx on 10/16/14.
 */
var mapApp = angular.module('myMapDirectiveApp', []);

mapApp.directive('mymap', function () {
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




mapApp.directive('mymarker', function () {
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

            return function(scope, iterElement, attr) {
                console.log('printing inside marker... ', 'elem: ', iterElement, 'attr: ', attr, 'scope', scope);

                console.log('scope:', scope.latitude);


                iterElement.append('<div class="google-map-marker"></div>');


                console.log('update marker elem[0]:', iterElement[0]);

                var mapOptions,
                    latitude = scope.latitude,
                    longitude = scope.longitude;

                console.log('map:', map);
                //                map;


                latitude = parseFloat(latitude); //|| 43.074688;
                longitude = parseFloat(longitude); //|| -89.384294;

                console.log('Marker', 'lat:', latitude, 'long:', longitude);


                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(latitude, longitude),
                    map: map,
                    title: 'Hello World!'
                });
            }


        }


    }});

