(function() {
  var DocumentState;
  DocumentState = (function() {
    function DocumentState(config) {
      this.timelineOriginal = config.timelineOriginal.points.split(",");
      this.timelineRevised = config.timelineRevised.points.split(",");
      if (config.timelineRevised.active) {
        this.activeTrack = 'timelineRevised';
      } else {
        this.activeTrack = 'timelineOriginal';
      }
    }
    return DocumentState;
  })();
  window.DocumentState = DocumentState;
}).call(this);
