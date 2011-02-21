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
    Timeline.advanceAndUpdateState = function(method) {
      DocumentState.reset();
      new DocumentState(Timeline.asDocumentState());
      this.advance(method);
      return new DocumentState(Timeline.asDocumentState());
    };
    Timeline.reverseAndUpdateState = function(method) {
      DocumentState.reset();
      new DocumentState(Timeline.asDocumentState());
      this.reverse(method);
      return new DocumentState(Timeline.asDocumentState());
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
    Timeline.atStart = function(method) {
      var activeChronolog;
      activeChronolog = Chronolog.active();
      return Chronolog.instances[0] === activeChronolog;
    };
    Timeline.atFinish = function(method) {
      var activeChronolog, activeTrack;
      activeChronolog = Chronolog.active();
      if (method === 'track') {
        activeTrack = Timeline.currentTrack();
        return activeTrack.chronologs[activeTrack.chronologs.length - 1] === activeChronolog;
      } else if (method === 'chronological') {
        return Chronolog.instances[Chronolog.instances.length - 1] === activeChronolog;
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
      var configObject, node, _i, _len, _ref;
      configObject = {
        timelineOriginal: {
          points: this.instances[0].coordinates.join(",")
        },
        timelineRevised: {
          points: this.instances[1].coordinates.join(",")
        },
        nodes: []
      };
      _ref = Chronolog.instances;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        configObject.nodes.push({
          position: node.coordinates,
          state: node.isActive() ? 'on' : 'off'
        });
      }
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
