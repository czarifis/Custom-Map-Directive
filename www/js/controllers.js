/**
 * Created by Costas Zarifis on 10/16/14.
 */

angular.module('controllers',[]).controller('MapCtrl', function ($scope) {

    var MARKERS_NO = 100;
    var SOON_TO_BE_MODIFIED_PERCENTAGE = 0.1;

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

    $scope.modifyMarkers = function(){
        for(var marki=0;marki<$scope.randomMarkersAboutToChange.length;marki++){
//            console.log('about to get modified:',$scope.randomMarkersAboutToChange[marki]);
            $scope.randomMarkersAboutToChange[marki].coords.latitude = $scope.randomMarkersAboutToChange[marki].coords.latitude+5;
            $scope.randomMarkersAboutToChange[marki].coords.longitude = $scope.randomMarkersAboutToChange[marki].coords.longitude+5;
        }
    }

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

            sth:{
              sthelse: 'val',
              moreComplex: {
                  dis: {
                      is: {
                          a: {
                              damn: 'complex structure',
                              fora: 'simple marker'
                          }

                      }
                  },
                  so: {
                      what:{
                          is:'gonna happen',
                          here: '?',
                          let:{
                              us: {
                                  find: 'out',
                                  by : 'adding even',
                                  more: 'stuff in here'
                              }
                          }
                      }
                  }
              },

                "servlet": [
                    {
                        "servlet-name": "cofaxCDS",
                        "servlet-class": "org.cofax.cds.CDSServlet",
                        "init-param": {
                            "configGlossary:installationAt": "Philadelphia, PA",
                            "configGlossary:adminEmail": "ksm@pobox.com",
                            "configGlossary:poweredBy": "Cofax",
                            "configGlossary:poweredByIcon": "/images/cofax.gif",
                            "configGlossary:staticPath": "/content/static",
                            "templateProcessorClass": "org.cofax.WysiwygTemplate",
                            "templateLoaderClass": "org.cofax.FilesTemplateLoader",
                            "templatePath": "templates",
                            "templateOverridePath": "",
                            "defaultListTemplate": "listTemplate.htm",
                            "defaultFileTemplate": "articleTemplate.htm",
                            "useJSP": false,
                            "jspListTemplate": "listTemplate.jsp",
                            "jspFileTemplate": "articleTemplate.jsp",
                            "cachePackageTagsTrack": 200,
                            "cachePackageTagsStore": 200,
                            "cachePackageTagsRefresh": 60,
                            "cacheTemplatesTrack": 100,
                            "cacheTemplatesStore": 50,
                            "cacheTemplatesRefresh": 15,
                            "cachePagesTrack": 200,
                            "cachePagesStore": 100,
                            "cachePagesRefresh": 10,
                            "cachePagesDirtyRead": 10,
                            "searchEngineListTemplate": "forSearchEnginesList.htm",
                            "searchEngineFileTemplate": "forSearchEngines.htm",
                            "searchEngineRobotsDb": "WEB-INF/robots.db",
                            "useDataStore": true,
                            "dataStoreClass": "org.cofax.SqlDataStore",
                            "redirectionClass": "org.cofax.SqlRedirection",
                            "dataStoreName": "cofax",
                            "dataStoreDriver": "com.microsoft.jdbc.sqlserver.SQLServerDriver",
                            "dataStoreUrl": "jdbc:microsoft:sqlserver://LOCALHOST:1433;DatabaseName=goon",
                            "dataStoreUser": "sa",
                            "dataStorePassword": "dataStoreTestQuery",
                            "dataStoreTestQuery": "SET NOCOUNT ON;select test='test';",
                            "dataStoreLogFile": "/usr/local/tomcat/logs/datastore.log",
                            "dataStoreInitConns": 10,
                            "dataStoreMaxConns": 100,
                            "dataStoreConnUsageLimit": 100,
                            "dataStoreLogLevel": "debug",
                            "maxUrlLength": 500}},
                    {
                        "servlet-name": "cofaxEmail",
                        "servlet-class": "org.cofax.cds.EmailServlet",
                        "init-param": {
                            "mailHost": "mail1",
                            "mailHostOverride": "mail2"}},
                    {
                        "servlet-name": "cofaxAdmin",
                        "servlet-class": "org.cofax.cds.AdminServlet"},

                    {
                        "servlet-name": "fileServlet",
                        "servlet-class": "org.cofax.cds.FileServlet"},
                    {
                        "servlet-name": "cofaxTools",
                        "servlet-class": "org.cofax.cms.CofaxToolsServlet",
                        "init-param": {
                            "templatePath": "toolstemplates/",
                            "log": 1,
                            "logLocation": "/usr/local/tomcat/logs/CofaxTools.log",
                            "logMaxSize": "",
                            "dataLog": 1,
                            "dataLogLocation": "/usr/local/tomcat/logs/dataLog.log",
                            "dataLogMaxSize": "",
                            "removePageCache": "/content/admin/remove?cache=pages&id=",
                            "removeTemplateCache": "/content/admin/remove?cache=templates&id=",
                            "fileTransferFolder": "/usr/local/tomcat/webapps/content/fileTransferFolder",
                            "lookInContext": 1,
                            "adminGroupID": 4,
                            "betaServer": true}}],
                "servlet-mapping": {
                    "cofaxCDS": "/",
                    "cofaxEmail": "/cofaxutil/aemail/*",
                    "cofaxAdmin": "/admin/*",
                    "fileServlet": "/static/*",
                    "cofaxTools": "/tools/*"}
            },

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
    $scope.randomMarkersAboutToChange = [];
// Get the bounds from the map once it's loaded
    $scope.$watch(function () {
        return $scope.map;
    }, function () {
        console.log('creating random markers');
        // Only need to regenerate once
//        if (!ov.southwest && nv.southwest) {
            var markers = [];
            var markersAboutToChange = [];
//                console.log($scope.map.bounds);
            var modif = MARKERS_NO*SOON_TO_BE_MODIFIED_PERCENTAGE;
            for (var i = 0; i < MARKERS_NO; i++) {



                $scope.mm = createRandomMarker(i);

                if(i<modif){
                    markersAboutToChange.push($scope.mm);

                }
                markers.push($scope.mm);

//            }
//                $scope.randomMarkers = JSON.stringify(markers);


            $scope.randomMarkers = markers;
            $scope.randomMarkersAboutToChange = markersAboutToChange;
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