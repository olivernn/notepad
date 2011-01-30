View = function (name, a, instanceMethods) {

  var instanceMethods, options;
  var defaults = {
    template: "#" + name + "-template",
    container: "#" + name + "-container"
  };

  if (arguments.length > 2) {
    options = arguments[1];
    instanceMethods = arguments[2];
  } else {
    instanceMethods = arguments[1];
  };

  var settings = $.extend({}, options, defaults);

  var invokeCallback = function (callbackName, instance) {
    if (instanceMethods[callbackName]) {
      instanceMethods[callbackName].call(instance);
    };
  }

  var Klass = function (data) {
    this.data = data;
    this.name = name;
    this.options = options;
    this.template = Handlebars.compile($(settings.template).text());
    this.html = $(this.template(this.data));
    invokeCallback('init', this);
  };

  Klass.prototype = {

    container: function () {
      return $(settings.container);
    },

    reload: function (data) {
      invokeCallback('beforeReload', this);
      if (data) this.data = data;
      this.html = $(this.template(this.data));
      this.render();
    },

    remove: function () {
      invokeCallback('beforeRemove', this);
      this.html.remove();
    },

    render: function () {
      invokeCallback('beforeRender', this);
      $(settings.container).html(this.html);
      invokeCallback('beforeRender', this);
    }
  };

  return Klass;
};