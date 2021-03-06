(function(angular) {
  'use strict';
  angular.module('ngIsoConstants.filters')
  /**
   * @brief converts Alpha2 or NumericCode to Name
   * @details Returns original input if unable to convert
   *
   * @param  input - numeric Country code or alpha2
   * @return Country name
   */
  .filter('isoCountry', ['ISO3166', function(ISO3166) {
    return function(input) {
      var result = null;
      if (isNumeric(input) && typeof(input) !== 'string') {
        result = ISO3166.getCountryObjFromCountryCode(input);

      } else if (typeof(input) === 'string') {
        if (input.length === 2) {
          result = ISO3166.getCountryObjFromAlpha2(input.toUpperCase());

        } else if (input.length === 3 && !isNaN(input)) {
          console.log('input: ', input);
          result = ISO3166.getCountryObjFromNumericString(input);
          console.log('result: ', result);

        } else if (input.length === 3) {
          result = ISO3166.getCountryObjFromAlpha3(input.toUpperCase());

        }
      }

      return (result) ? result.name: input;

      function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
      }
    };
  }]);
})(angular);
