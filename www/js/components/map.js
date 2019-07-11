/**
 * @author jevgeni dot virves at regio dot ee
 * @since 2019-07-03
 */

define(function (require) {
  "use strict";

  var
    $           = require("jquery"),
    config      = require("config"),
    mapboxgl    = require("mapboxgl"),
    geolocation = require("./geolocation"),
    namespace   = require("namespace");

  var map = new mapboxgl.Map($.extend(true, {container:  $(".regio-map")[0]}, config.map || {}));
  map.addControl(new mapboxgl.NavigationControl());
  map.addControl(new mapboxgl.ScaleControl({maxWidth: 80, unit: "metric"}));
  map.addControl(geolocation);

  map.on("click", event => {
    if (window.console) {
      var latlng = event.lngLat;
      var bounds = map.getBounds().toArray().toString().split(",").map(n => parseFloat(n));
      var center = map.getCenter();
      var zoom = map.getZoom();
      console.log("click", "[" + latlng.lng.toFixed(5) + ", " + latlng.lat.toFixed(5) + "]");
      console.log("center", "[" + center.lng.toFixed(5) + ", " + center.lat.toFixed(5) + "]", "zoom", zoom);
      console.log("bbox", "[[" + bounds[0].toFixed(5) + ", ", bounds[1].toFixed(5) + "], [" + bounds[2].toFixed(5) + ", " + bounds[3].toFixed(5) + "]]");
      $.each(map.queryRenderedFeatures(event.point) || [], function () {
        console.log(this.properties, this.layer);
      });
    }
  });

  namespace.map = map;

  return map;
});