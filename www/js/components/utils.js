/**
 * @author jevgeni dot virves at regio dot ee
 * @since 2019-05-13
 */

define([
  "jquery",
  "./namespace"
], function ($, namespace) {
  "use strict";

  var utils = {

    replaceTemplatePlaceholders: function (template, data) {
      var isString = true;
      data = data || {};
      if (typeof template !== "string") {
        var div = $("<div />");
        div.html(template);
        template = div.html();
        isString = false;
      }
      template = template.replace(/\{\w+\}/g, function (key) {
        key = key.replace("{", "").replace("}", "");
        var value = data[key] !== undefined ? data[key] : null;
        return value === null ? "" : value;
      }.bind(this));
      if (!isString) {
        template = $(template);
      }
      return template;
    }
    
  };

  namespace.utils = utils;

  return utils;

});
