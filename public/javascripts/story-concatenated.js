(function() {
  var DocumentState, animationPeriod, availableHeight, availableWidth, bufferContents, color, coords, drawActiveNode, drawActiveNodeNumber, drawActiveTimeline, drawAllNodes, drawNodeNumbers, drawState, drawTimelines, earlier, forkAngle, generatePath, graphMarkup, graphics, keyboardHandler, later, lineLength, lineThickness, lineThinness, margin, nodeCount, numberVerticalOffset, radius, raphael, redo, totalHeight, totalWidth, transitionActiveNode, transitionActiveTimeline, transitionAllNodes, transitionStates, transitionTimelines, undo, updateBufferContents;
  var __slice = Array.prototype.slice, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
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
  new DocumentState({
    timelineOriginal: {
      points: 's1',
      active: true
    },
    timelineRevised: {
      points: 's1'
    },
    nodes: [
      {
        position: 's1',
        state: 'on'
      }, {
        position: 's1'
      }, {
        position: 's1'
      }, {
        position: 's1'
      }, {
        position: 's1'
      }, {
        position: 's1'
      }
    ]
  });
  new DocumentState({
    timelineOriginal: {
      points: 's1,s2',
      active: true
    },
    timelineRevised: {
      points: 's1,s2'
    },
    nodes: [
      {
        position: 's1',
        state: 'off'
      }, {
        position: 's2',
        state: 'on'
      }, {
        position: 's2'
      }, {
        position: 's2'
      }, {
        position: 's2'
      }, {
        position: 's2'
      }
    ]
  });
  new DocumentState({
    timelineOriginal: {
      points: 's1,s2,s3',
      active: true
    },
    timelineRevised: {
      points: 's1,s2,s3'
    },
    nodes: [
      {
        position: 's1',
        state: 'off'
      }, {
        position: 's2',
        state: 'off'
      }, {
        position: 's3',
        state: 'on'
      }, {
        position: 's3'
      }, {
        position: 's3'
      }, {
        position: 's3'
      }
    ]
  });
  new DocumentState({
    timelineOriginal: {
      points: 's1,s2,s3,s4',
      active: true
    },
    timelineRevised: {
      points: 's1,s2,s3,s4'
    },
    nodes: [
      {
        position: 's1',
        state: 'off'
      }, {
        position: 's2',
        state: 'off'
      }, {
        position: 's3',
        state: 'off'
      }, {
        position: 's4',
        state: 'on'
      }, {
        position: 's4'
      }, {
        position: 's4'
      }
    ]
  });
  new DocumentState({
    timelineOriginal: {
      points: 's1,s2,s3,s4',
      active: true
    },
    timelineRevised: {
      points: 's1,s2'
    },
    nodes: [
      {
        position: 's1',
        state: 'off'
      }, {
        position: 's2',
        state: 'off'
      }, {
        position: 's3',
        state: 'on'
      }, {
        position: 's4',
        state: 'off'
      }, {
        position: 's3'
      }, {
        position: 's3'
      }
    ]
  });
  new DocumentState({
    timelineOriginal: {
      points: 's1,s2,s3,s4',
      active: true
    },
    timelineRevised: {
      points: 's1,s2'
    },
    nodes: [
      {
        position: 's1',
        state: 'off'
      }, {
        position: 's2',
        state: 'on'
      }, {
        position: 's3',
        state: 'off'
      }, {
        position: 's4',
        state: 'off'
      }, {
        position: 's2'
      }, {
        position: 's2'
      }
    ]
  });
  new DocumentState({
    timelineOriginal: {
      points: 's1,s2,b3,b4'
    },
    timelineRevised: {
      points: 's1,s2,t3',
      active: true
    },
    nodes: [
      {
        position: 's1',
        state: 'off'
      }, {
        position: 's2',
        state: 'off'
      }, {
        position: 'b3',
        state: 'off'
      }, {
        position: 'b4',
        state: 'off'
      }, {
        position: 't3',
        state: 'on'
      }, {
        position: 't3'
      }
    ]
  });
  new DocumentState({
    timelineOriginal: {
      points: 's1,s2,b3,b4'
    },
    timelineRevised: {
      points: 's1,s2,t3,t4',
      active: true
    },
    nodes: [
      {
        position: 's1',
        state: 'off'
      }, {
        position: 's2',
        state: 'off'
      }, {
        position: 'b3',
        state: 'off'
      }, {
        position: 'b4',
        state: 'off'
      }, {
        position: 't3',
        state: 'off'
      }, {
        position: 't4',
        state: 'on'
      }
    ]
  });
  new DocumentState({
    timelineOriginal: {
      points: 's1,s2,b3,b4'
    },
    timelineRevised: {
      points: 's1,s2,t3,t4',
      active: true
    },
    nodes: [
      {
        position: 's1',
        state: 'off'
      }, {
        position: 's2',
        state: 'off'
      }, {
        position: 'b3',
        state: 'off'
      }, {
        position: 'b4',
        state: 'off'
      }, {
        position: 't3',
        state: 'on'
      }, {
        position: 't4',
        state: 'off'
      }
    ]
  });
  new DocumentState({
    timelineOriginal: {
      points: 's1,s2,b3,b4'
    },
    timelineRevised: {
      points: 's1,s2,t3,t4',
      active: true
    },
    nodes: [
      {
        position: 's1',
        state: 'off'
      }, {
        position: 's2',
        state: 'on'
      }, {
        position: 'b3',
        state: 'off'
      }, {
        position: 'b4',
        state: 'off'
      }, {
        position: 't3',
        state: 'off'
      }, {
        position: 't4',
        state: 'off'
      }
    ]
  });
  new DocumentState({
    timelineOriginal: {
      points: 's1,s2,b3,b4'
    },
    timelineRevised: {
      points: 's1,s2,t3,t4',
      active: true
    },
    nodes: [
      {
        position: 's1',
        state: 'on'
      }, {
        position: 's2',
        state: 'off'
      }, {
        position: 'b3',
        state: 'off'
      }, {
        position: 'b4',
        state: 'off'
      }, {
        position: 't3',
        state: 'off'
      }, {
        position: 't4',
        state: 'off'
      }
    ]
  });
  new DocumentState({
    timelineOriginal: {
      points: 's1,s2,b3,b4'
    },
    timelineRevised: {
      points: 's1,s2,t3,t4',
      active: true
    },
    nodes: [
      {
        position: 's1',
        state: 'off'
      }, {
        position: 's2',
        state: 'on'
      }, {
        position: 'b3',
        state: 'off'
      }, {
        position: 'b4',
        state: 'off'
      }, {
        position: 't3',
        state: 'off'
      }, {
        position: 't4',
        state: 'off'
      }
    ]
  });
  new DocumentState({
    timelineOriginal: {
      points: 's1,s2,b3,b4'
    },
    timelineRevised: {
      points: 's1,s2,t3,t4',
      active: true
    },
    nodes: [
      {
        position: 's1',
        state: 'off'
      }, {
        position: 's2',
        state: 'off'
      }, {
        position: 'b3',
        state: 'off'
      }, {
        position: 'b4',
        state: 'off'
      }, {
        position: 't3',
        state: 'on'
      }, {
        position: 't4',
        state: 'off'
      }
    ]
  });
  new DocumentState({
    timelineOriginal: {
      points: 's1,s2,b3,b4'
    },
    timelineRevised: {
      points: 's1,s2,t3,t4',
      active: true
    },
    nodes: [
      {
        position: 's1',
        state: 'off'
      }, {
        position: 's2',
        state: 'off'
      }, {
        position: 'b3',
        state: 'off'
      }, {
        position: 'b4',
        state: 'off'
      }, {
        position: 't3',
        state: 'off'
      }, {
        position: 't4',
        state: 'on'
      }
    ]
  });
  new DocumentState({
    timelineOriginal: {
      points: 's1,s2,s3,s4'
    },
    timelineRevised: {
      points: 's1,s2,s5,s6',
      active: true
    },
    nodes: [
      {
        position: 's1',
        state: 'off'
      }, {
        position: 's2',
        state: 'off'
      }, {
        position: 's3',
        state: 'off'
      }, {
        position: 's4',
        state: 'off'
      }, {
        position: 's5',
        state: 'off'
      }, {
        position: 's6',
        state: 'on'
      }
    ]
  });
  new DocumentState({
    timelineOriginal: {
      points: 's1,s2,s3,s4'
    },
    timelineRevised: {
      points: 's1,s2,s5,s6',
      active: true
    },
    nodes: [
      {
        position: 's1',
        state: 'off'
      }, {
        position: 's2',
        state: 'off'
      }, {
        position: 's3',
        state: 'off'
      }, {
        position: 's4',
        state: 'off'
      }, {
        position: 's5',
        state: 'on'
      }, {
        position: 's6',
        state: 'off'
      }
    ]
  });
  new DocumentState({
    timelineOriginal: {
      points: 's1,s2,s3,s4'
    },
    timelineRevised: {
      points: 's1,s2,s5,s6',
      active: true
    },
    nodes: [
      {
        position: 's1',
        state: 'off'
      }, {
        position: 's2',
        state: 'off'
      }, {
        position: 's3',
        state: 'off'
      }, {
        position: 's4',
        state: 'on'
      }, {
        position: 's5',
        state: 'off'
      }, {
        position: 's6',
        state: 'off'
      }
    ]
  });
  new DocumentState({
    timelineOriginal: {
      points: 's1,s2,s3,s4'
    },
    timelineRevised: {
      points: 's1,s2,s5,s6',
      active: true
    },
    nodes: [
      {
        position: 's1',
        state: 'off'
      }, {
        position: 's2',
        state: 'off'
      }, {
        position: 's3',
        state: 'on'
      }, {
        position: 's4',
        state: 'off'
      }, {
        position: 's5',
        state: 'off'
      }, {
        position: 's6',
        state: 'off'
      }
    ]
  });
  new DocumentState({
    timelineOriginal: {
      points: 's1,s2,s3,s4'
    },
    timelineRevised: {
      points: 's1,s2,s5,s6',
      active: true
    },
    nodes: [
      {
        position: 's1',
        state: 'off'
      }, {
        position: 's2',
        state: 'on'
      }, {
        position: 's3',
        state: 'off'
      }, {
        position: 's4',
        state: 'off'
      }, {
        position: 's5',
        state: 'off'
      }, {
        position: 's6',
        state: 'off'
      }
    ]
  });
  new DocumentState({
    timelineOriginal: {
      points: 's1,s2,s3,s4'
    },
    timelineRevised: {
      points: 's1,s2,s5,s6',
      active: true
    },
    nodes: [
      {
        position: 's1',
        state: 'off'
      }, {
        position: 's2',
        state: 'off'
      }, {
        position: 's3',
        state: 'on'
      }, {
        position: 's4',
        state: 'off'
      }, {
        position: 's5',
        state: 'off'
      }, {
        position: 's6',
        state: 'off'
      }
    ]
  });
  new DocumentState({
    timelineOriginal: {
      points: 's1,s2,s3,s4'
    },
    timelineRevised: {
      points: 's1,s2,s5,s6',
      active: true
    },
    nodes: [
      {
        position: 's1',
        state: 'off'
      }, {
        position: 's2',
        state: 'off'
      }, {
        position: 's3',
        state: 'off'
      }, {
        position: 's4',
        state: 'on'
      }, {
        position: 's5',
        state: 'off'
      }, {
        position: 's6',
        state: 'off'
      }
    ]
  });
  new DocumentState({
    timelineOriginal: {
      points: 's1,s2,b3,b4',
      active: true
    },
    timelineRevised: {
      points: 's1,s2,t3,t5,t6'
    },
    nodes: [
      {
        position: 's1',
        state: 'off'
      }, {
        position: 's2',
        state: 'off'
      }, {
        position: 'b3',
        state: 'off'
      }, {
        position: 'b4',
        state: 'on'
      }, {
        position: 't5',
        state: 'off'
      }, {
        position: 't6',
        state: 'off'
      }
    ]
  });
  new DocumentState({
    timelineOriginal: {
      points: 's1,s2,b3,b4'
    },
    timelineRevised: {
      points: 's1,s2,t3,t5,t6',
      active: true
    },
    nodes: [
      {
        position: 's1',
        state: 'off'
      }, {
        position: 's2',
        state: 'off'
      }, {
        position: 'b3',
        state: 'off'
      }, {
        position: 'b4',
        state: 'off'
      }, {
        position: 't5',
        state: 'on'
      }, {
        position: 't6',
        state: 'off'
      }
    ]
  });
  new DocumentState({
    timelineOriginal: {
      points: 's1,s2,b3,b4'
    },
    timelineRevised: {
      points: 's1,s2,t3,t5,t6',
      active: true
    },
    nodes: [
      {
        position: 's1',
        state: 'off'
      }, {
        position: 's2',
        state: 'off'
      }, {
        position: 'b3',
        state: 'off'
      }, {
        position: 'b4',
        state: 'off'
      }, {
        position: 't5',
        state: 'off'
      }, {
        position: 't6',
        state: 'on'
      }
    ]
  });
  new DocumentState({
    timelineOriginal: {
      points: 's1,s2,b3,b4'
    },
    timelineRevised: {
      points: 's1,s2,t3,t5,t6',
      active: true
    },
    nodes: [
      {
        position: 's1',
        state: 'off'
      }, {
        position: 's2',
        state: 'off'
      }, {
        position: 'b3',
        state: 'off'
      }, {
        position: 'b4',
        state: 'off'
      }, {
        position: 't5',
        state: 'on'
      }, {
        position: 't6',
        state: 'off'
      }
    ]
  });
  new DocumentState({
    timelineOriginal: {
      points: 's1,s2,b3,b4',
      active: true
    },
    timelineRevised: {
      points: 's1,s2,t3,t5,t6'
    },
    nodes: [
      {
        position: 's1',
        state: 'off'
      }, {
        position: 's2',
        state: 'off'
      }, {
        position: 'b3',
        state: 'off'
      }, {
        position: 'b4',
        state: 'on'
      }, {
        position: 't5',
        state: 'off'
      }, {
        position: 't6',
        state: 'off'
      }
    ]
  });
  new DocumentState({
    timelineOriginal: {
      points: 's1,s2,b3,b4',
      active: true
    },
    timelineRevised: {
      points: 's1,s2,t3,t5,t6'
    },
    nodes: [
      {
        position: 's1',
        state: 'off'
      }, {
        position: 's2',
        state: 'off'
      }, {
        position: 'b3',
        state: 'on'
      }, {
        position: 'b4',
        state: 'off'
      }, {
        position: 't5',
        state: 'off'
      }, {
        position: 't6',
        state: 'off'
      }
    ]
  });
  new DocumentState({
    timelineOriginal: {
      points: 's1,s2,b3,b4',
      active: true
    },
    timelineRevised: {
      points: 's1,s2,t3,t5,t6'
    },
    nodes: [
      {
        position: 's1',
        state: 'off'
      }, {
        position: 's2',
        state: 'on'
      }, {
        position: 'b3',
        state: 'off'
      }, {
        position: 'b4',
        state: 'off'
      }, {
        position: 't5',
        state: 'off'
      }, {
        position: 't6',
        state: 'off'
      }
    ]
  });
  new DocumentState({
    timelineOriginal: {
      points: 's1,s2,b3,b4',
      active: true
    },
    timelineRevised: {
      points: 's1,s2,t3,t5,t6'
    },
    nodes: [
      {
        position: 's1',
        state: 'on'
      }, {
        position: 's2',
        state: 'off'
      }, {
        position: 'b3',
        state: 'off'
      }, {
        position: 'b4',
        state: 'off'
      }, {
        position: 't5',
        state: 'off'
      }, {
        position: 't6',
        state: 'off'
      }
    ]
  });
  totalWidth = 640;
  totalHeight = 300;
  margin = 90;
  availableHeight = totalHeight - (margin * 2);
  availableWidth = totalWidth - (margin * 2);
  nodeCount = 6;
  lineLength = availableWidth / (nodeCount - 1);
  forkAngle = Math.PI / 6;
  radius = 15;
  animationPeriod = 250;
  lineThinness = 7;
  lineThickness = 8;
  numberVerticalOffset = 30;
  color = {
    black: "#444",
    darkgrey: "#888",
    white: "#fff"
  };
  raphael = null;
  coords = {};
  coords.s1 = {
    x: margin,
    y: totalHeight / 2
  };
  coords.s2 = {
    x: margin + lineLength * 1,
    y: totalHeight / 2
  };
  coords.s3 = {
    x: margin + lineLength * 2,
    y: totalHeight / 2
  };
  coords.s4 = {
    x: margin + lineLength * 3,
    y: totalHeight / 2
  };
  coords.s5 = {
    x: margin + lineLength * 4,
    y: totalHeight / 2
  };
  coords.s6 = {
    x: margin + lineLength * 5,
    y: totalHeight / 2
  };
  coords.b3 = {
    x: coords.s2.x + (lineLength * Math.cos(forkAngle)),
    y: coords.s2.y + (lineLength * Math.sin(forkAngle))
  };
  coords.b4 = {
    x: coords.b3.x + lineLength * 1,
    y: coords.b3.y
  };
  coords.t3 = {
    x: coords.s2.x + (lineLength * Math.cos(forkAngle)),
    y: coords.s2.y - (lineLength * Math.sin(forkAngle))
  };
  coords.t4 = {
    x: coords.t3.x + lineLength * 1,
    y: coords.t3.y
  };
  coords.t5 = {
    x: coords.t3.x + lineLength * 2,
    y: coords.t3.y
  };
  coords.t6 = {
    x: coords.t3.x + lineLength * 3,
    y: coords.t3.y
  };
  graphics = {
    timelineOriginalThick: null,
    timelineOriginalThin: null,
    timelineRevisedThick: null,
    timelineRevisedThin: null,
    activeTimeline: null,
    activeNode: null,
    nodes: [],
    nodeNumbers: [],
    thickLineAttributes: {
      "stroke": color.darkgrey,
      "stroke-width": lineThickness,
      "stroke-linecap": "butt",
      "stroke-linejoin": "miter"
    },
    thinLineAttributes: {
      "stroke": color.white,
      "stroke-width": lineThinness,
      "stroke-linecap": "butt",
      "stroke-linejoin": "miter"
    },
    offNodeAttributes: {
      "fill": color.white,
      "stroke": color.black
    },
    onNodeAttributes: {
      "fill": color.darkgrey,
      "stroke": color.black
    }
  };
  bufferContents = ["1955, November 12th\n    Lightning strikes the clocktower at 10.04pm", "1955, November 5th\n    George McFly falls out of a tree and is hit by a car.\n\n1955, November 12th\n    Lightning strikes the clocktower at 10.04pm", "1955, November 5th\n    George McFly falls out of a tree and is hit by a car.\n    Lorraine Baines nurses George, and thinks he's cute.\n\n1955, November 12th\n    Lightning strikes the clocktower at 10.04pm", "1955, November 5th\n    George McFly falls out of a tree and is hit by a car.\n    Lorraine Baines nurses George, and thinks he's cute.\n\n1955, November 12th\n    George McFly takes Lorraine Baines to the dance, and they kiss.\n    Lighting strikes the clocktower at 10.04pm", "1955, November 5th\n    Marty McFly is hit by a car.\n    Lorraine Baines nurses Marty, and thinks he's cute.\n\n1955, November 12th\n    Lighting strikes the clocktower at 10.04pm", "1955, November 5th\n    Marty McFly is hit by a car.\n    Lorraine Baines nurses Marty, and thinks he's cute.\n\n1955, November 12th\n    Marty Mcfly takes Lorraine Baines to the dance, and they kiss (yuk).\n    Marty McFly invents Rock and Roll\n    George McFly and Loraine Baines kiss.\n    Lightning strikes the clocktower at 10.04pm"];
  generatePath = function() {
    var coordinates, origin, point, points, _i, _len;
    origin = arguments[0], coordinates = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    points = ["M " + coords[origin].x + " " + coords[origin].y];
    for (_i = 0, _len = coordinates.length; _i < _len; _i++) {
      point = coordinates[_i];
      points.push("L " + coords[point].x + " " + coords[point].y);
    }
    return points.join("");
  };
  drawTimelines = function(state) {
    graphics.timelineOriginalThick = raphael.path(generatePath.apply(null, state.timelineOriginal)).attr(graphics.thickLineAttributes);
    graphics.timelineOriginalThin = raphael.path(generatePath.apply(null, state.timelineOriginal)).attr(graphics.thinLineAttributes);
    graphics.timelineRevisedThick = raphael.path(generatePath.apply(null, state.timelineRevised)).attr(graphics.thickLineAttributes);
    return graphics.timelineRevisedThin = raphael.path(generatePath.apply(null, state.timelineRevised)).attr(graphics.thinLineAttributes);
  };
  drawActiveTimeline = function(state, activeTrack) {
    if (activeTrack == null) {
      activeTrack = state.activeTrack;
    }
    return graphics.activeTimeline = raphael.path(generatePath.apply(null, state[activeTrack])).attr(graphics.thickLineAttributes);
  };
  drawAllNodes = function(state) {
    var disc, node, num, _ref, _results;
    graphics.nodes = [];
    graphics.nodeNumbers = [];
    _results = [];
    for (num = 0, _ref = nodeCount - 1; (0 <= _ref ? num <= _ref : num >= _ref); (0 <= _ref ? num += 1 : num -= 1)) {
      node = state.nodes[num];
      _results.push(node.state != null ? (disc = raphael.circle(coords[node.position].x, coords[node.position].y, radius).attr(graphics.offNodeAttributes), graphics.nodes.push(disc), drawNodeNumbers(node, num)) : void 0);
    }
    return _results;
  };
  drawNodeNumbers = function(node, num) {
    var number;
    number = raphael.text(coords[node.position].x, coords[node.position].y + numberVerticalOffset, num + 1);
    return graphics.nodeNumbers.push(number);
  };
  drawActiveNode = function(state) {
    return graphics.activeNode = raphael.circle(coords[state.activeNode.position].x, coords[state.activeNode.position].y, radius).attr(graphics.onNodeAttributes);
  };
  drawState = function() {
    var state;
    state = DocumentState.active();
    drawTimelines(state);
    drawActiveTimeline(state);
    drawAllNodes(state);
    drawActiveNode(state);
    return updateBufferContents();
  };
  transitionTimelines = function(state, previous) {
    drawTimelines(previous);
    graphics.timelineOriginalThick.animate({
      path: generatePath.apply(null, state.timelineOriginal)
    }, animationPeriod, "<>");
    graphics.timelineOriginalThin.animate({
      path: generatePath.apply(null, state.timelineOriginal)
    }, animationPeriod, "<>");
    graphics.timelineRevisedThick.animate({
      path: generatePath.apply(null, state.timelineRevised)
    }, animationPeriod, "<>");
    return graphics.timelineRevisedThin.animate({
      path: generatePath.apply(null, state.timelineRevised)
    }, animationPeriod, "<>");
  };
  transitionActiveTimeline = function(state, previous) {
    var activeTrack;
    activeTrack = state.activeTrack;
    drawActiveTimeline(previous, activeTrack);
    return graphics.activeTimeline.animate({
      path: generatePath.apply(null, state[activeTrack])
    }, animationPeriod, "<>");
  };
  transitionAllNodes = function(state, previous) {
    var disc, node, num, number, _ref, _results;
    drawAllNodes(previous);
    _results = [];
    for (num = 0, _ref = nodeCount - 1; (0 <= _ref ? num <= _ref : num >= _ref); (0 <= _ref ? num += 1 : num -= 1)) {
      node = state.nodes[num];
      disc = graphics.nodes[num];
      if (!(disc != null)) {
        break;
      }
      disc.animate({
        cx: coords[node.position].x,
        cy: coords[node.position].y
      }, animationPeriod, "<>");
      number = graphics.nodeNumbers[num];
      _results.push(number.animate({
        x: coords[node.position].x,
        y: coords[node.position].y + numberVerticalOffset
      }, animationPeriod, "<>"));
    }
    return _results;
  };
  transitionActiveNode = function(state, previous) {
    drawActiveNode(previous);
    return graphics.activeNode.animate({
      cx: coords[state.activeNode.position].x,
      cy: coords[state.activeNode.position].y
    }, animationPeriod, "<>", drawActiveNodeNumber);
  };
  drawActiveNodeNumber = function() {
    var state;
    state = DocumentState.active();
    return drawNodeNumbers(state.activeNode, state.activeNodeIndex());
  };
  transitionStates = function() {
    var current, previous;
    raphael.clear();
    current = DocumentState.active();
    previous = DocumentState.previous();
    transitionTimelines(current, previous);
    transitionActiveTimeline(current, previous);
    transitionAllNodes(current, previous);
    transitionActiveNode(current, previous);
    return updateBufferContents();
  };
  updateBufferContents = function() {
    var current;
    current = DocumentState.active();
    return $("#vim-history-buffer code pre").html(bufferContents[current.activeNodeIndex()]);
  };
  undo = function() {
    return earlier();
  };
  redo = function() {
    return later();
  };
  earlier = function() {
    var current;
    current = DocumentState.active();
    if (current.hasPredecessor()) {
      DocumentState.reverse();
      transitionStates();
      return false;
    }
  };
  later = function() {
    var current;
    current = DocumentState.active();
    if (current.hasSuccessor()) {
      DocumentState.advance();
      transitionStates();
      return false;
    }
  };
  keyboardHandler = function(event) {
    var advanceKeys, cursorDown, cursorLeft, cursorRight, cursorUp, reverseKeys, space, _ref, _ref2;
    advanceKeys = (_ref = [39, 40, 32], cursorRight = _ref[0], cursorDown = _ref[1], space = _ref[2], _ref);
    reverseKeys = (_ref2 = [37, 38], cursorLeft = _ref2[0], cursorUp = _ref2[1], _ref2);
    if (advanceKeys.indexOf(event.keyCode) >= 0) {
      later();
    }
    if (reverseKeys.indexOf(event.keyCode) >= 0) {
      return earlier();
    }
  };
  graphMarkup = "<div id=\"vim-history-buffer\">\n  <code><pre></pre></code>\n</div>\n<div id=\"vim-history-graph\"/>";
  jQuery($(__bind(function() {
    $("#vim-history-visualization").append(graphMarkup);
    $("#vim-history-buttons a.undo").click(undo);
    $("#vim-history-buttons a.redo").click(redo);
    $("#vim-history-buttons a.later").click(later);
    $("#vim-history-buttons a.earlier").click(earlier);
    $(window).keydown(keyboardHandler);
    raphael = Raphael("vim-history-graph", totalWidth, totalHeight);
    return drawState();
  }, this)));
  window.graphics = graphics;
}).call(this);
