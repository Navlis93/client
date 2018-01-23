'use strict';

var getTemplateUrl = function(name) {
  var templateName = 'annotation-' + name + '.html';
  return 'templates/' + templateName;
}

module.exports = ["$http", "$templateCache", "$compile", "$parse", "settings", function($http, $templateCache, $compile, $parse, settings) {
  return {
    restrict: 'E',
    link: function(scope , iElement, iAttrs) {
      var name = $parse(iAttrs.name)(scope);
      var url = getTemplateUrl(name);
      var cb = function(response){
        var tplContent = response.data;
        iElement.replaceWith($compile(tplContent)(scope));
      };
      $http.get(url, {cache: $templateCache}).then(cb, function(error) {
        return $http.get(settings.assetRoot + getTemplateUrl('default'), {cache: $templateCache}).then(cb);
      });
    }
  }
}];
