/**
 * @author jevgeni dot virves at regio dot ee
 * @since 2019-07-03
 */

define(["./components/namespace"], function (namespace) {
  "use strict";

  var config = {

    map: {
      // style:  "data/mapboxgl-style.json",
      style:  "data/vormsi-style.json",
      bounds: [[23.403362606981403, 59.058191821493494], [23.075504670741736, 58.930447950622266]]
    },

    features: {
      url:    "data/features.json",
      style:  "data/features-style.json"
    }

  };

  namespace.config = config;

  return config;

});
