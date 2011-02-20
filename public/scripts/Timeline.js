(function() {
  var Timeline;
  Timeline = (function() {
    function Timeline(config) {
      this.coordinates = config.coordinates.split(",");
      Timeline.instances.push(this);
    }
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
