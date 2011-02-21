(function() {
  var Chronolog;
  Chronolog = (function() {
    function Chronolog(config) {
      this.coordinates = config.coordinates;
      Chronolog.instances.push(this);
    }
    Chronolog.prototype.myIndex = function() {
      return Chronolog.instances.indexOf(this);
    };
    Chronolog.prototype.next = function() {
      return Chronolog.instances[this.myIndex() + 1];
    };
    Chronolog.prototype.prev = function() {
      return Chronolog.instances[this.myIndex() - 1];
    };
    Chronolog.prototype.activate = function() {
      return Chronolog.activeChronologIndex = this.myIndex();
    };
    Chronolog.prototype.isActive = function() {
      return Chronolog.activeChronologIndex === this.myIndex();
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
