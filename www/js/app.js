/**
 * @author jevgeni dot virves at regio dot ee
 * @since 2019-07-03
 */

window.regio = window.regio || {};

require.config({
  paths: {
    css:          "https://kaart.regio.ee/vendors/requirejs/2.3.6/css.min",
    text:         "https://kaart.regio.ee/vendors/requirejs/2.3.6/text.min",
    jquery:       "https://kaart.regio.ee/vendors/jquery/3.4.1/jquery.min",
    mapboxgl:     "https://kaart.regio.ee/vendors/mapbox-gl-js/v1.1.0/mapbox-gl.min",
    mapboxgldraw: "https://kaart.regio.ee/vendors/mapbox-gl-draw/v1.0.9/mapbox-gl-draw.min",
    turf:         "https://kaart.regio.ee/vendors/turf/v3.0.11/turf.min",
    config:       "./config",
    main:         "./components/main",
    namespace:    "./components/namespace"
  },
  urlArgs: function (name, path) {
    if (name && path.indexOf("/vendors/") !== -1) {
      return "";
    }
    return window.regio.versionArgs || "";
  }
});

require([
  "css!../css/app.css",
  "css!../css/resolutions.css",
  "css!https://kaart.regio.ee/vendors/mapbox-gl-js/v1.1.0/mapbox-gl.css",
  "css!https://kaart.regio.ee/vendors/fontawesome/v5.7.2/css/all.min.css"
], function () {
  "use strict";
  require([
    "./components/map",
    "./components/main"
  ], function (map) {
    map.on("load", function () {
      require([
        "./components/spinner",
        "./components/features",
        "./components/sidepanel",
        "./components/layerswitcher",
        "./components/features-popup"
      ], function (spinner) {
        setTimeout(spinner.initialize.bind(spinner), 250);
        if (window.regio.environment === "development") {
          require([
            "./components/features-drag",
            "./components/features-draw",
            "css!https://kaart.regio.ee/vendors/mapbox-gl-draw/v1.0.9/mapbox-gl-draw.css"
          ]);
        }
      });
    });
  });
});
