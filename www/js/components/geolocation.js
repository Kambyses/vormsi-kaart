/**
 * @author jevgeni dot virves at regio dot ee
 * @since 2019-07-03
 */

define(function (require) {
  "use strict";

  var
    mapboxgl  = require("mapboxgl"),
    namespace = require("namespace");

  
  var geolocation = new mapboxgl.GeolocateControl({
    trackUserLocation: true
  });

  namespace.geolocation = geolocation;

  return geolocation;
});

