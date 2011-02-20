(function() {
  var Timeline;
  Timeline = (function() {
    function Timeline(config) {
      this.coordinates = config.coordinates;
      Timeline.instances.push(this);
    }
    Timeline.prototype.next = function() {
      var myIndex;
      myIndex = Timeline.instances.indexOf(this);
      return Timeline.instances[myIndex + 1];
    };
    Timeline.prototype.prev = function() {
      var myIndex;
      myIndex = Timeline.instances.indexOf(this);
      return Timeline.instances[myIndex - 1];
    };
    Timeline.instances = [];
    Timeline.reset = function() {
      return this.instances = [];
    };
    return Timeline;
  })();
  window.Timeline = Timeline;
}).call(this);
