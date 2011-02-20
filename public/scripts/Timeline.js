(function() {
  var Timeline;
  Timeline = (function() {
    function Timeline(config) {
      this.coordinates = config.coordinates.split(",");
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
    Timeline.currentTrackIndex = 0;
    Timeline.currentTrack = function() {
      return this.instances[this.currentTrackIndex];
    };
    Timeline.reset = function() {
      return this.instances = [];
    };
    return Timeline;
  })();
  window.Timeline = Timeline;
}).call(this);
