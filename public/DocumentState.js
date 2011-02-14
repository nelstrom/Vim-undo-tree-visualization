(function() {
  var DocumentState;
  DocumentState = (function() {
    function DocumentState(config) {
      var node, _i, _len, _ref;
      this.timelineOriginal = config.timelineOriginal.points.split(",");
      this.timelineRevised = config.timelineRevised.points.split(",");
      if (config.timelineRevised.active) {
        this.activeTrack = 'timelineRevised';
      } else {
        this.activeTrack = 'timelineOriginal';
      }
      this.nodes = [];
      _ref = config.nodes || [
        {
          position: 's1'
        }
      ];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        this.nodes.push({
          state: (node.active ? 'on' : 'off'),
          position: node.position
        });
      }
    }
    return DocumentState;
  })();
  window.DocumentState = DocumentState;
}).call(this);
