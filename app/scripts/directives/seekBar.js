
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
        scope: {
          onChange: '&'
        },
        link: function(scope, element, attributes) {
            scope.value = 0;
            scope.max = 100;
            // jQuery object
            var seekBar = $(element);
            // notify the direcvive of changes to the attribute values w/ $observe
            attributes.$observe('value', function(newValue) {
                scope.value = newValue;
            });

            attributes.$observe('max', function(newValue) {
                scope.max = newValue;
            });

            // * @function precentString
            // * @desc caluclates the precent of a string?
            // * @param none

            var percentString = function () {
                var value = scope.value;
                var max = scope.max;
                var percent = value / max * 100;
                return percent + "%";
            };

            // * @function notifyOnChange
            // * @desc notify onChange that  scope.value has changed
            // * @param newValue

            var notifyOnChange = function(newValue) {
                if (typeof scope.onChange === 'function') {
                    scope.onChange({value: newValue});
                }
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
            scope.thumbStyle = function() {
                return {left: percentString()};
            };
            scope.onClickSeekBar = function(event) {
                var percent = calculatePercent(seekBar, event);
                scope.value = percent * scope.max;
                notifyOnChange(scope.value);
            };
            // * @function trackTHumb
            // * @desc tracks were the thumb is on the playerbar
            // * @param none
            scope.trackThumb = function() {
                $document.bind('mousemove.thumb', function(event) {
                    var percent = calculatePercent(seekBar, event);
                    scope.$apply(function() {
                        scope.value = percent * scope.max;
                        notifyOnChange(scope.value);
                    });
            });



            // * @function
            // * @desc tracks were the thumb is on the playerbar
            // * @param none
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
