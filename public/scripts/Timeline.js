(function() {
  var Timeline;
  Timeline = (function() {
    function Timeline(config) {
      this.chronologs = config.chronologs;
      this.coordinates = config.coordinates.split(",");
      Timeline.instances.push(this);
    }
    Timeline.instances = [];
    Timeline.currentTrackIndex = 0;
    Timeline.currentTrack = function() {
      return this.instances[this.currentTrackIndex];
    };
    Timeline.currentChronolog = function() {
      return Chronolog.active();
    };
    Timeline.advance = function(method) {
      var activeChronolog, activeTrack;
      activeChronolog = Chronolog.active();
      activeTrack = Timeline.currentTrack();
      if (activeTrack.chronologs.indexOf(activeChronolog.next()) < 0) {
        Timeline.switchTracks();
      }
      return Chronolog.advance();
    };
    Timeline.reverse = function(method) {
      var activeChronolog, activeTrack;
      if (method === 'chronological') {
        activeChronolog = Chronolog.active();
        activeTrack = Timeline.currentTrack();
        if (activeTrack.chronologs.indexOf(activeChronolog.prev()) < 0) {
          Timeline.switchTracks();
        }
        return Chronolog.reverse();
      }
    };
    Timeline.switchTracks = function() {
      if (this.currentTrackIndex === 0) {
        return this.currentTrackIndex = 1;
      } else {
        return this.currentTrackIndex = 0;
      }
    };
    Timeline.reset = function() {
      return this.instances = [];
    };
    return Timeline;
  })();
  window.Timeline = Timeline;
}).call(this);
