/**
 * @author jevgeni dot virves at regio dot ee
 * @since 2019-07-03
 */

define(function (require) {
  "use strict";

  var
    map       = require("./map"),
    mapboxgl  = require("mapboxgl"),
    namespace = require("./namespace");

      
  function FeaturesPopup () {
    map.on("click", function (event) {
      var feature = (map.queryRenderedFeatures(event.point) || [])[0] || null;
      if (feature && feature.source && feature.source === "features") {
        var html = "";
        if (feature.properties.title) {
          html += '<p class="regio-popup-title">' + feature.properties.title + '</p>'
        }
        if (feature.properties.description) {
          html += '<p class="regio-popup-description">' + feature.properties.description + '</p>'
        }
        if (!html) {
          return;
        }
        html = '<div class="regio-popup-content">' + html + '</div>';
        event.preventDefault();
        new mapboxgl.Popup({
          offset: 10
        }).setLngLat(event.lngLat).setHTML(html).addTo(map);
      }
    });
    namespace.featuresPopup = this;
  }


  FeaturesPopup.prototype = {
  };


  return new FeaturesPopup();
});

