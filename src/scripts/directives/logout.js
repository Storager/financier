import Drop from 'tether-drop';

angular.module('financier').directive('logout', ($compile, $timeout) => {
  return {
    restrict: 'A',
    controller: function($scope, $element, $attrs) {
      $element.on('click', () => {

        const template = require('./logout.html');
        let dropInstance;

        const wrap = angular.element('<div class="tooltip"></div>').append(template);
        const content = $compile(wrap)($scope);

        content.on('click', e => {
          dropInstance.close();
        });

        dropInstance = new Drop({
          target: $element[0],
          content: content[0],
          classes: 'drop-theme-arrows-bounce',
          openOn: 'click',
          position: $attrs.position || 'top center'
        });

        dropInstance.open();

        setTimeout(() => {
          dropInstance.position();
        });

        $scope.$on('drop:close', () => {
          dropInstance.close();
        });

        dropInstance.on('close', () => {
          $timeout(() => {
            dropInstance.destroy();
          });
        });

      });
    },
    controllerAs: 'logoutCtrl',
    bindToController: {
      logout: '&',
      logoutAndRemove: '&'
    }
  };
});
