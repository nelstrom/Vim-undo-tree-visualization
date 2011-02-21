(function() {
  var Timeline;
  Timeline = (function() {
    function Timeline(config) {
      this.chronologs = config.chronologs;
      this.coordinates = config.coordinates.split(",");
      Timeline.instances.push(this);
    }
    Timeline.prototype.activeChronologIndex = function() {
      return this.chronologs.indexOf(Chronolog.active());
    };
    Timeline.prototype.activate = function() {
      var myIndex;
      myIndex = Timeline.instances.indexOf(this);
      return Timeline.currentTrackIndex = myIndex;
    };
    Timeline.prototype.next = function() {
      return this.chronologs[this.activeChronologIndex() + 1];
    };
    Timeline.prototype.prev = function() {
      return this.chronologs[this.activeChronologIndex() - 1];
    };
    Timeline.instances = [];
    Timeline.currentTrackIndex = 0;
    Timeline.currentTrack = function() {
      return this.instances[this.currentTrackIndex];
    };
    Timeline.currentChronolog = function() {
      return Chronolog.active();
    };
    Timeline.advance = function(method) {
      var activeChronolog, activeTrack, nextChronolog;
      activeTrack = Timeline.currentTrack();
      if (method === 'track') {
        nextChronolog = activeTrack.next();
        if (nextChronolog != null) {
          return nextChronolog.activate();
        }
      } else if (method === 'chronological') {
        activeChronolog = Chronolog.active();
        if (activeTrack.chronologs.indexOf(activeChronolog.next()) < 0) {
          Timeline.switchTracks();
        }
        return Chronolog.advance();
      }
    };
    Timeline.reverse = function(method) {
      var activeChronolog, activeTrack, prevChronolog;
      activeTrack = Timeline.currentTrack();
      if (method === 'track') {
        prevChronolog = activeTrack.prev();
        if (prevChronolog != null) {
          return prevChronolog.activate();
        }
      } else if (method === 'chronological') {
        activeChronolog = Chronolog.active();
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
    Timeline.asDocumentState = function() {
      var configObject;
      configObject = {
        timelineOriginal: {
          points: this.instances[0].coordinates.join(",")
        },
        timelineRevised: {
          points: this.instances[1].coordinates.join(",")
        },
        nodes: []
      };
      if (Timeline.currentTrackIndex === 0) {
        configObject.timelineOriginal['active'] = true;
      } else {
        configObject.timelineRevised['active'] = true;
      }
      return configObject;
    };
    Timeline.reset = function() {
      return this.instances = [];
    };
    return Timeline;
  })();
  window.Timeline = Timeline;
}).call(this);
