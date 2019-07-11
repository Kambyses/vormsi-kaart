/**
 * @author jevgeni dot virves at regio dot ee
 * @since 2019-07-03
 */

define(function (require) {
  "use strict";

  var
    $         = require("jquery"),
    namespace = require("./namespace");


  function Spinner () {
    this.initialized  = false;
    this.visible      = false; 
    this.counter      = 0;
    this.element      = $(".regio-spinner");
    namespace.spinner = this;
  }


  Spinner.prototype = {

    initialize: function () {
      this.initialized = true;
      this.element.addClass("regio-spinner-hidden");
      setTimeout(function () {$("body").removeClass("regio-app-loading");}, 200);
    },

    show: function () {
      if (!this.initialized) {
        return;
      }
      this.counter += 1;
      if (!this.visible) {
        this.visible = true; 
        this.element.removeClass("regio-spinner-hidden");
      }
    },

    hide: function () {
      if (!this.initialized) {
        return;
      }
      this.counter -= 1;
      if (this.counter < 1) {
        this.counter = 0;
        if (this.visible) {
          this.visible = false; 
          this.element.addClass("regio-spinner-hidden");
        }
      }
    },

    start: function () {
      return this.show();
    },

    stop: function () {
      return this.hide();
    }

  };

  return new Spinner();

});
