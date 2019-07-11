/**
 * @author jevgeni dot virves at regio dot ee
 * @since 2019-07-03
 */

define(function (require) {
  "use strict";

  var
    $         = require("jquery"),
    namespace = require("./namespace");


  function Message () {
    this.element = $(".regio-messages");
    this.messageTemplate = $(".regio-message", this.element).clone();
    this.element.empty();
    this.messages = [];
    namespace.message = this;
  }


  Message.prototype = {

    show: function (options) {
      var message = $.extend(true, {
        element:      this.messageTemplate.clone(true),
        type:         "message",    // message, info, notify, success, warning, error
        message:      "",
        hideAfterMs:  5000
      }, options || {});

      this.messages.push(message);

      $(".regio-message-text", message.element).html(options.message || "Oih, mingi seletamatu viga, palun võta meiega ühendust: kaardid@regio.ee");
      $(".regio-message-dismiss", message.element).on("click", function () {
        this.hide(message);
      }.bind(this));
      message.element
        .addClass("regio-message-" + (message.type || "message"))
        .appendTo(this.element);

      setTimeout(function () {
        var top = 10;
        $.each(this.messages, function () {
          this.element.css({transform: "translate(0px, " + top + "px)"});
          top += (this.element.outerHeight() + 10);
        });
      }.bind(this), 20);
      setTimeout(function () {this.hide(message);}.bind(this), (message.hideAfterMs || 2000));
    },

    hide: function (message) {
      var index = this.messages.indexOf(message);
      
      $.each(this.messages, function () {
        if (message === this) {
          this.element.removeAttr("style");
        } else {
          this.element.css({transform: "translate(0px, " + top + "px)"});
          top += (this.element.outerHeight() + 10);
        }
      });

      if (index !== -1) {
        this.messages.splice(index, 1);
      }
      
      var top = 10;
      $.each(this.messages, function () {
        this.element.css({transform: "translate(0px, " + top + "px)"});
        top += (this.element.outerHeight() + 10);
      });
      setTimeout(function () {message.element.remove();}, 1000);
    },
    
    message: function (options) {
      options = options || {};
      if (typeof options === "string") {
        options = {message: options};
      }
      options.type = "message";
      return this.show(options);
    },
    
    info: function (options) {
      options = options || {};
      if (typeof options === "string") {
        options = {message: options};
      }
      options.type = "info";
      return this.show(options);
    },
    
    notify: function (options) {
      options = options || {};
      if (typeof options === "string") {
        options = {message: options};
      }
      options.type = "notify";
      return this.show(options);
    },
    
    success: function (options) {
      options = options || {};
      if (typeof options === "string") {
        options = {message: options};
      }
      options.type = "success";
      return this.show(options);
    },
    
    warning: function (options) {
      options = options || {};
      if (typeof options === "string") {
        options = {message: options};
      }
      options.type = "warning";
      return this.show(options);
    },
    
    error: function (options) {
      options = options || {};
      if (typeof options === "string") {
        options = {message: options};
      }
      options.type = "error";
      return this.show(options);
    }

  };

  return new Message();

});
