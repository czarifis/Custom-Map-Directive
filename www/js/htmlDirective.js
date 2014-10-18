'use strict';
/**
 * Created by costas zarifis on 10/15/14.
 */
angular.module('htmldir',[])
    .controller('myController', function($scope){
        $scope.me = {
            name: 'Controller',
            lName: 'Inside'
        }
    })

    .directive('htmldirective',function(){
        return {
            scope:true,
            restrict:'AE',
            //'A' - only matches attribute name
            //'E' - only matches element name
            //'C' - only matches class name
            link:function(scope,e,a){
                scope.fullName = a.first + ' ' + a.last;
                scope.first=a.first;
                scope.last=a.last
            },
            template:"<i>{{me.lName}}{{last}}, {{me.name}}{{first}}</i>"
        }
    })



;