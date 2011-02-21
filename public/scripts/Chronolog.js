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
    Chronolog.prototype.activate = function() {
      var myIndex;
      myIndex = Chronolog.instances.indexOf(this);
      return Chronolog.activeChronologIndex = myIndex;
    };
    Chronolog.instances = [];
    Chronolog.activeChronologIndex = 0;
    Chronolog.active = function() {
      return this.instances[this.activeChronologIndex];
    };
    Chronolog.reverse = function() {
      if (this.activeChronologIndex !== 0) {
        return this.activeChronologIndex--;
      }
    };
    Chronolog.advance = function() {
      if (this.activeChronologIndex !== this.instances.length - 1) {
        return this.activeChronologIndex++;
      }
    };
    Chronolog.reset = function() {
      return this.instances = [];
    };
    return Chronolog;
  })();
  window.Chronolog = Chronolog;
}).call(this);
