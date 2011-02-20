(function() {
  var Chronolog;
  Chronolog = (function() {
    function Chronolog(config) {
      this.coordinates = config.coordinates;
      Chronolog.instances.push(this);
    }
    Chronolog.instances = [];
    return Chronolog;
  })();
  window.Chronolog = Chronolog;
}).call(this);
