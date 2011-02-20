(function() {
  var Chronolog;
  Chronolog = (function() {
    function Chronolog(config) {
      this.coordinates = config.coordinates;
      Chronolog.instances.push(this);
    }
    Chronolog.prototype.next = function() {
      var myIndex;
      myIndex = Chronolog.instances.indexOf(this);
      return Chronolog.instances[myIndex + 1];
    };
    Chronolog.prototype.prev = function() {
      var myIndex;
      myIndex = Chronolog.instances.indexOf(this);
      return Chronolog.instances[myIndex - 1];
    };
    Chronolog.instances = [];
    Chronolog.reset = function() {
      return this.instances = [];
    };
    return Chronolog;
  })();
  window.Chronolog = Chronolog;
}).call(this);