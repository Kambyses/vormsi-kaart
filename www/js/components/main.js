/**
 * @author jevgeni dot virves at regio dot ee
 * @since 2019-07-03
 */

define(function (require) {
  "use strict";

  var
    $         = require("jquery"),
    namespace = require("./namespace");

  function Main () {
    this.element = $(".regio-main");
    namespace.main = this;
  }

  return new Main();
});