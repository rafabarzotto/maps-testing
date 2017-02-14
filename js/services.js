angular.module('app.services', [])

.factory('GetContentService', function() {
  var service = {};
  
  service.getContent = function() {
    return {
      title: "Hello",
      content: "Some content, way to looooooooooooooooonnnnnnnnnnnnngggggggggg."
    }
  }
  
  return service;
});