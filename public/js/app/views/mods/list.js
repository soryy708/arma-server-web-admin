define(function (require) {

  "use strict";

  var $                   = require('jquery'),
      _                   = require('underscore'),
      Backbone            = require('backbone'),
      Marionette          = require('marionette'),
      ListItemView        = require('app/views/mods/list_item'),
      FormView            = require('app/views/mods/form'),
      tpl                 = require('text!tpl/mods/list.html'),

      template = _.template(tpl);

  return Marionette.CompositeView.extend({
    itemView: ListItemView,
    itemViewContainer: "tbody",
    template: template,

    events: {
      "click #download": "download"
    },

    initialize: function (options) {
      this.on("itemview:mods:update", this.update, this);
    },

    update: function() {
      this.collection.fetch();
    },

    download: function (event) {
      event.preventDefault();
      var view = new FormView({mods: this.collection});
      new Backbone.BootstrapModal({ content: view, animate: true }).open();
    },
  });
});
