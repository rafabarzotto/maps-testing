angular.module('app.directives', [])

.directive('popup', function (GetContentService) {
  return {
    restrict: 'A',
    templateUrl: 'templates/popup-template.html',
    scope: {
    },
    controller: function($scope, $timeout, GetContentService) {
      
      $scope.getContent = function() {
        // Simulate a call to the server to get data
        $timeout(function() {
            $scope.content = GetContentService.getContent();
        }, 200)
      }
    }
  }
});