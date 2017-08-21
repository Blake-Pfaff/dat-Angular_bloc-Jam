
(function() {
    function seekBar($document) {

      // * @function caluclatePrecent
      // * @desc determines the precent that the seek bar is filled
      // * @param {Object} seekBar and event

     var calculatePercent = function(seekBar, event) {
         var offsetX = event.pageX - seekBar.offset().left;
         var seekBarWidth = seekBar.width();
         var offsetXPercent = offsetX / seekBarWidth;
         offsetXPercent = Math.max(0, offsetXPercent);
         offsetXPercent = Math.min(1, offsetXPercent);
         return offsetXPercent;
      };

      return {
        templateUrl: '/templates/directives/seek_bar.html',
        replace: true,
        restrict: 'E',
        scope: { },
        link: function(scope, element, attributes) {
            scope.value = 0;
            scope.max = 100;
            // jQuery object
            var seekBar = $(element);

            // * @function precentString
            // * @desc caluclates the precent of a string?
            // * @param none

            var percentString = function () {
                var value = scope.value;
                var max = scope.max;
                var percent = value / max * 100;
                return percent + "%";
            };
            // * @function fillStyle
            // * @desc sets the play bars % as the width from %strng
            // * @param {Object} song
            scope.fillStyle = function() {
                return {width: percentString()};
            };

            // * @function onClickSeekBar
            // * @desc sets horz % of the bar based on the click & drag
            // * @param {Object} event
            scope.onClickSeekBar = function(event) {
                var percent = calculatePercent(seekBar, event);
                scope.value = percent * scope.max;
            };
            // * @function trackTHumb
            // * @desc tracks were the thumb is on the playerbar
            // * @param none
            scope.trackThumb = function() {
                $document.bind('mousemove.thumb', function(event) {
                    var percent = calculatePercent(seekBar, event);
                    scope.$apply(function() {
                    scope.value = percent * scope.max;
         });
     });


     $document.bind('mouseup.thumb', function() {
         $document.unbind('mousemove.thumb');
         $document.unbind('mouseup.thumb');
     });
 };

       }
    }
};
    angular
        .module('blocJams')
        .directive('seekBar', ['$document', seekBar]);
})();
