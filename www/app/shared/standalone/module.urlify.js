'use strict';
/*global angular*/

angular.module('hushtag.shared.urlify', [])

    .factory('Urlify', [function () {
        var api = {};

        /**
         * Returns a URL for a mailto-link
         * @param  {Object} opts         - Options to construct the URL
         * @param  {String} opts.to      - recepient email address
         * @param  {String} opts.cc      - Cc recepient email address (optional)
         * @param  {String} opts.bcc     - Bcc recepient email address (optional)
         * @param  {String} opts.subject - Email subject (optional)
         * @param  {String} opts.body    - Email body (optional). Separate lines with the newline character (\n)
         * @return {String}              - Returns the URL to put into the href-attribute of a mailto link
         */
        api.mailto = function (opts) {
            var link = "mailto:";
            var params = [];
            angular.forEach(opts, function (value, key) {
                params.push(key.toLowerCase() + "=" + window.encodeURIComponent(value));
            });
            if (params.length > 0) {
                link += "?" + params.join("&");
            }
            return link;
        };

        return api;
    }])

;
