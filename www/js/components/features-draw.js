/**
 * @author jevgeni dot virves at regio dot ee
 * @since 2019-07-03
 */

define(function (require) {
  "use strict";

  var
    $           = require("jquery"),
    map         = require("./map"),
    MapboxDraw  = require("mapboxgldraw"),
    namespace   = require("./namespace");


  var featuresDraw = new MapboxDraw({
    displayControlsDefault: false,
    controls: {
      point: true,
      line_string: true,
      polygon: true,
      trash: true
    }
  });

  map.addControl(featuresDraw);


  function onChange () {
    $.each(featuresDraw.getAll().features, function () {
      var geometry = {"type": this.geometry.type, "coordinates": this.geometry.coordinates};
      switch (geometry.type) {
        case "Point":
          geometry.coordinates = [parseFloat(geometry.coordinates[0].toFixed(5)), parseFloat(geometry.coordinates[1].toFixed(5))];
        break;
        case "LineString":
          geometry.coordinates = [];
          $.each(this.geometry.coordinates, function (a,b) {
            geometry.coordinates.push([parseFloat(this[0].toFixed(5)), parseFloat(this[1].toFixed(5))]);
          });
        break;
        case "Polygon":
          geometry.coordinates = [[]];
          $.each(this.geometry.coordinates[0], function (a,b) {
            geometry.coordinates[0].push([parseFloat(this[0].toFixed(5)), parseFloat(this[1].toFixed(5))]);
          });
        break;
      }
      console.log(JSON.stringify(geometry));
    });

  }
  
  map.on("draw.create", onChange);
  map.on("draw.update", onChange);


  namespace.featuresDraw = this;

  return featuresDraw;
});

