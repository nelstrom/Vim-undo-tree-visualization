(function() {
  var DocumentState;
  DocumentState = (function() {
    function DocumentState(config) {
      var n, node, _i, _len, _ref;
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
        n = {
          state: node.state,
          position: node.position
        };
        this.nodes.push(n);
        if (node.state === "on") {
          this.activeNode = n;
        }
      }
      DocumentState.states.push(this);
    }
    DocumentState.prototype.activeNodeIndex = function() {
      return this.nodes.indexOf(this.activeNode);
    };
    DocumentState.prototype.hasPredecessor = function() {
      return DocumentState.states.indexOf(this) > 0;
    };
    DocumentState.prototype.hasSuccessor = function() {
      return DocumentState.states.indexOf(this) < DocumentState.states.length - 1;
    };
    DocumentState.states = [];
    DocumentState.position = 0;
    DocumentState.lastPosition = 0;
    DocumentState.active = function() {
      return this.states[this.position];
    };
    DocumentState.previous = function() {
      return this.states[this.lastPosition];
    };
    DocumentState.reverse = function() {
      if (this.position > 0) {
        this.lastPosition = this.position;
        return this.position--;
      }
    };
    DocumentState.advance = function() {
      if (this.position < this.states.length - 1) {
        this.lastPosition = this.position;
        return this.position++;
      }
    };
    DocumentState.reset = function() {
      this.position = 0;
      this.lastPosition = 0;
      return this.states = [];
    };
    return DocumentState;
  })();
  window.DocumentState = DocumentState;
}).call(this);
