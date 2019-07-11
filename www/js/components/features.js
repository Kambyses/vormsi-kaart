/**
 * @author jevgeni dot virves at regio dot ee
 * @since 2019-07-03
 */

define(function (require) {
  "use strict";

  var
    $             = require("jquery"),
    api           = require("./api"),
    map           = require("./map"),
    config        = require("config"),
    spinner       = require("./spinner"),
    layerswitcher = require("./layerswitcher"),
    namespace     = require("./namespace");

  
  function Features () {
    map.addSource("features", {
      "type": "geojson",
      "data": {
        "type": "FeatureCollection",
        "features": []
      }
    });
    this.source = map.getSource("features");
    this.layers = [];
    this.images = [];
    this.fetchFeatures();
    namespace.features = this;
  }


  Features.prototype = {

    fetchFeatures: function () {
      spinner.start();
      $.when(
        api.request(config.features.url),
        api.request(config.features.style)
      ).then(function (featureCollection, featuresStyle) {
        this.geojson = featureCollection;
        this.loadImages(featuresStyle).then(function () {
          this.addLayers(featuresStyle);
          this.addFeatures(featureCollection);
          layerswitcher.renderFromFeatures(featureCollection.features);
          spinner.stop();
        }.bind(this));
      }.bind(this));
    },

    addLayers: function (featuresStyle) {
      $.each(featuresStyle, function () {
        this.source = this.source || "features";
        var beforeId = this.beforeId;
        if (beforeId) {
          delete this.beforeId;
          map.addLayer(this, beforeId);
        } else {
          map.addLayer(this);
        }
      });
    },

    addFeatures: function (featureCollection) {
      $.each(featureCollection.features, function (index) {
        this.properties.index = index;
      });
      this.source.setData(featureCollection);
    },

    setFeaturesVisibility: function (category, visible) {
      var featureCollection = this.source._data;
      $.each(featureCollection.features, function () {
        if (category === this.properties.category) {
          this.properties.visible = visible ? true : false;
        }
      });
      this.source.setData(featureCollection);
    },

    loadImages: function (featuresStyle) {
      var
        promise = $.Deferred(),
        images  = this.images || [];

      function loadNextImage () {
        var image = null, style;
        $.each(featuresStyle, function () {
          if (!style) {
            if (this.layout && this.layout["icon-image"] && images.indexOf(this.layout["icon-image"]) === -1) {
              style = this;
              image = this.layout["icon-image"];
            } else if (this.paint && this.paint["line-pattern"] && images.indexOf(this.paint["line-pattern"]) === -1) {
              style = this;
              image = this.paint["line-pattern"];
            } 
          }
        });
        if (!image) {
          promise.resolve();
          return;
        }
        images.push(image);
        switch (image.substr(-4)) {
          case ".png": {
            if (style.layout && style.layout["icon-image-size"]) {
              delete style.layout["icon-image-size"];
            }
            map.loadImage(image + (window.regio.versionArgs || ""), function(error, img) {
              map.addImage(image, img);
              loadNextImage();
            });
          }
          break;
          case ".svg": {
            api.request({
              url:      image,
              dataType: "text"
            }).then(function (svg) {
              var img, width, height;
              svg = svg.replace(/\s+/g, ' ');
              if (style.layout && style.layout["icon-image-size"]) {
                width   = style.layout["icon-image-size"][0];
                height  = style.layout["icon-image-size"][1];
                delete style.layout["icon-image-size"];
              } else {
                width   = svg.match(/width="([0-9\.]+)"/);
                width   = width && width[1] ? parseFloat(width[1]) : null;
                height  = svg.match(/height="([0-9\.]+)"/);
                height  = height && height[1] ? parseFloat(height[1]) : null;
              }
              img = new Image(width || 20, height || 20);
              img.onload = function () {
                map.addImage(image, img);
                loadNextImage();
              };
              img.src = image + (window.regio.versionArgs || "");
            });
          }
          break;
          default: {
            loadNextImage();
          }
          break;
        }
      }
      
      loadNextImage();

      return promise;
    },

    loadImages2: function (featuresStyle) {
      var
        promise = $.Deferred(),
        images  = this.images || [],
        added   = [];

      $.each(featuresStyle, function () {
        var
          iconImage = this.layout && this.layout["icon-image"] ? this.layout : null,
          exists    = false;
        if (iconImage) {
          $.each(images, function () {
            if (iconImage === this) {
              exists = true;
            }
          });
          if (!exists) {
            images.push(iconImage);
          }
        }
      });

      function loadNextImage (index) {
        index = index || 0;
        var image = images[index], type;
        if (!image) {
          promise.resolve();
          return;
        }
        if (added.indexOf(image["icon-image"]) !== -1) {
          loadNextImage(index + 1);
          return;
        }
        added.push(image["icon-image"]);
        type = image["icon-image"].substr(-4);
        switch (type) {
          case ".png": {
            if (image["icon-image-size"]) {
              delete image["icon-image-size"];
            }
            map.loadImage(image["icon-image"], function(error, img) {
              map.addImage(image["icon-image"], img);
              loadNextImage(index + 1);
            });
          }
          break;
          case ".svg": {
            api.request({
              url:      image["icon-image"],
              dataType: "text"
            }).then(function (svg) {
              var img, width, height;
              svg = svg.replace(/\s+/g, ' ');
              if (image["icon-image-size"]) {
                width   = image["icon-image-size"][0];
                height  = image["icon-image-size"][1];
                delete image["icon-image-size"];
              } else {
                width   = svg.match(/width="([0-9\.]+)"/);
                width   = width && width[1] ? parseFloat(width[1]) : null;
                height  = svg.match(/height="([0-9\.]+)"/);
                height  = height && height[1] ? parseFloat(height[1]) : null;
              }
              img = new Image(width || 20, height || 20);
              img.onload = function () {
                map.addImage(image["icon-image"], img);
                loadNextImage(index + 1);
              };
              img.src = image["icon-image"];
            });
          }
          break;
          default: {
            loadNextImage(index + 1);
          }
          break;
        }
      }
      
      loadNextImage();

      return promise;
    }

  };


  return new Features();
});

