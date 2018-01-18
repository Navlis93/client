'use strict';

module.exports = ["$http", "$templateCache", "$compile", "$parse", function($http, $templateCache, $compile, $parse) {
  return {
    restrict: 'E',
    link: function(scope , iElement, iAttrs) {
      var url = $parse(iAttrs.url)(scope);
      $http.get(url, {cache: $templateCache}).success(function(tplContent){
        iElement.replaceWith($compile(tplContent)(scope));
      });
    }
  }
}];
