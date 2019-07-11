/**
 * @author jevgeni dot virves at regio dot ee
 * @since 2019-07-03
 */

define(function (require) {
  "use strict";

  var
    $         = require("jquery"),
    message   = require("./message"),
    namespace = require("./namespace");


  function Api () {
    this.initialize();
    namespace.api = this;
  }


  Api.prototype = {

    initialize: function () {
      $.ajaxSetup({
        url:          "",
        method:       "GET",
        dataType:     "json",
        contentType:  "application/json; charset=utf-8",
        processData:  false,
        beforeSend:   function () {
          if (window.regio && window.regio.version) {
            this.data = this.data || {};
            this.data.version = this.data.version || window.regio.version;
          }
          if (this.method === "GET" && this.data) {
            var data = [];
            $.each(this.data, function (name, value) {
              data.push(name + "=" + encodeURIComponent(value)); 
            });
            this.url += (this.url.indexOf("?") === -1 ? "?" : "&") + data.join("&");
          } else if (this.method === "POST" && this.contentType && this.contentType.indexOf("json") !== -1) {
            this.data = JSON.stringify(this.data);
          }
        }
      });
    },

    request: function (options) {
      if (typeof options === "string") {
        options = {url: options};
      }
      var promise = $.Deferred();
      var ajax = $.ajax(options || {});
      ajax.then(function(response) {
        return promise.resolve(response || null);
      })
      .fail(function(xhr) {
        if (xhr.statusText !== "abort") {
          var error = xhr.statusText + " " + xhr.status + " " + options.url;
          message.error(error);
        }
        return promise.resolve(null);
      });
      promise.abort = function () {
        ajax.abort();
      };
      return promise;
    }
  };


  return new Api();
});
