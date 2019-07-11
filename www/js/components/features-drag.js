/**
 * @author jevgeni dot virves at regio dot ee
 * @since 2019-07-03
 */

define(function (require) {
  "use strict";

  var
    map       = require("./map"),
    features  = require("./features"),
    namespace = require("./namespace");

  var dragFeature = null;
  var onMoveTid   = null;

  function onMove (event) {
    var featureCollection = features.source._data;
    var feature = featureCollection.features[dragFeature.properties.index];
    feature.geometry.coordinates = [event.lngLat.lng, event.lngLat.lat];
    features.source.setData(featureCollection);
    clearTimeout(onMoveTid);
    onMoveTid = setTimeout(function () {
      console.log(dragFeature.properties);
      console.log("[" + feature.geometry.coordinates[0].toFixed(5) + ", " + feature.geometry.coordinates[1].toFixed(5) + "]");
    }, 200);
  }
      
  function onUp () {
    map.off("mousemove", onMove);
  }

      
  function FeaturesDrag () {
    map.on("mousedown", function (event) {
      var feature = map.queryRenderedFeatures(event.point);
      if (feature && feature[0] && feature[0].source && feature[0].source === "features" && feature[0].geometry &&  feature[0].geometry.type === "Point") {
        event.preventDefault();
        dragFeature = feature[0];
        map.on("mousemove", onMove);
        map.once("mouseup", onUp);
      }
    });
    namespace.featuresDrag = this;
  }


  FeaturesDrag.prototype = {
  };


  return new FeaturesDrag();
});

