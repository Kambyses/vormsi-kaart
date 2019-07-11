/**
 * @author jevgeni dot virves at regio dot ee
 * @since 2019-05-28
 */

define(function (require) {
  "use strict";

  var
    $         = require("jquery"),
    map       = require("./map"),
    utils     = require("./utils"),
    sidepanel = require("./sidepanel"),
    namespace = require("./namespace");


  function LayerSwitcher () {
    this.element     = $(".regio-layerswitcher", sidepanel.element);
    this.rowTemplate = this.element.children(":first").clone();
    this.element.empty();
    this.render();
    this.element.on("change", "input", this.onInputChange.bind(this));
    namespace.layerswitcher = this;
  }


  LayerSwitcher.prototype = {

    render: function (layers) {
      var rows = [], rowTemplate = this.rowTemplate.clone();
      layers = layers || [];
      
      $.each(layers, function (index) {
        this.id      = this.id || index.toString();
        this.checked = this.checked || false;
        var row = utils.replaceTemplatePlaceholders(rowTemplate.clone(), {
          layername:  this.name,
          inputtype:  "checkbox",
          inputname:  "overlay",
          inputvalue: this.id
        });
        $("input", row).attr("type", "checkbox").prop("checked", this.checked);
        rows.push(row);
      });
      this.element.empty().append(rows);
    },

    renderFromFeatures: function (features) {
      var layers = {};
      $.each(features, function () {
        this.properties.visible = true;
        if (this.properties.category && !layers[this.properties.category]) {
          layers[this.properties.category] = {
            id:       this.properties.category,
            name:     this.properties.category,
            checked:  true
          };
        }
      });
      var arr = [];
      $.each(layers, function () {
        arr.push(this);
      });
      layers = arr;
      this.render(layers);
    },

    onInputChange: function (event) {
      var input = event.currentTarget;
      event.preventDefault();
      require(["./features"], function (features) {
        features.setFeaturesVisibility(input.value, input.checked);
      });
      input.blur();
      return false;
    }

  };

  return new LayerSwitcher();

});
