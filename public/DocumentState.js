(function() {
  var DocumentState;
  DocumentState = (function() {
    function DocumentState(config) {
      this.timelineOriginal = config.timelineOriginal.points.split(",");
    }
    return DocumentState;
  })();
  window.DocumentState = DocumentState;
}).call(this);
