angular.module('app.directives', [])

.directive('popup', function(GetContentService) {
  return {
    restrict: 'E',
    scope: {
      id: "=",
      fn: '&'
    },
    templateUrl: 'templates/popup-template.html',
    link: function($scope, el, attrs) {
      var id = attrs.id;
      $scope.getContent = function(id) {
        $scope.content = GetContentService.getContent(id);
      }

      $scope.getContent(id);

    },
    controller: function($scope) {

    }

  }
});