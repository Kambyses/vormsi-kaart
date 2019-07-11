/**
 * @author jevgeni dot virves at regio dot ee
 * @since 2019-07-03
 */

define(function (require) {
  "use strict";

  var
    $             = require("jquery"),
    map           = require("./map"),
    namespace     = require("./namespace");


  function Sidepanel () {
    this.element      = $(".regio-sidepanel");
    this.toggleButton = $(".regio-sidepanel-toggle");
    this.toggleButton.on("click", this.toggle.bind(this));
    this.visible      = false;// document.body.offsetWidth > 1000;
    this.toggle(this.visible);
    namespace.sidepanel = this;
  }


  Sidepanel.prototype = {

    toggle: function (visible) {
      this.visible = typeof visible === "boolean" ? visible : !this.visible;
      this.toggleButton.toggleClass("regio-sidepanel-visible", this.visible);
      this.element.toggleClass("regio-sidepanel-visible", this.visible);
      this.toggleButton.blur();
      this.updateMapSize();
    },

    show: function () {
      this.visible = true;
      this.toggleButton.addClass("regio-sidepanel-visible");
      this.element.addClass("regio-sidepanel-visible");
      this.toggleButton.blur();
      this.updateMapSize();
    },

    hide: function () {
      this.visible = false;
      this.toggleButton.removeClass("regio-sidepanel-visible");
      this.element.removeClass("regio-sidepanel-visible");
      this.toggleButton.blur();
      this.updateMapSize();
    },

    updateMapSize: function () {
      setTimeout(function () {
        map.resize();
      }, 250);
    }

  };

  return new Sidepanel();

});
