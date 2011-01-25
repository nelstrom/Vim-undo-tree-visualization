(function() {
  var animationPeriod, availableHeight, availableWidth, color, coords, drawActiveNode, drawActiveTimeline, drawAllNodes, drawState, drawTimelines, forkAngle, generatePath, graphics, lineLength, lineThickness, lineThinness, margin, nodeCount, radius, raphael, states, totalHeight, totalWidth, transitionActiveNode, transitionActiveTimeline, transitionAllNodes, transitionStates, transitionTimelines;
  var __slice = Array.prototype.slice, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  totalWidth = 640;
  totalHeight = 480;
  margin = 90;
  availableHeight = totalHeight - (margin * 2);
  availableWidth = totalWidth - (margin * 2);
  nodeCount = 6;
  lineLength = availableWidth / (nodeCount - 1);
  forkAngle = Math.PI / 6;
  radius = 15;
  animationPeriod = 750;
  lineThinness = 5;
  lineThickness = 8;
  color = {
    black: "#000",
    white: "#fff",
    blue: "#008"
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
    thickLineAttributes: {
      "stroke": color.blue,
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
      "fill": color.blue,
      "stroke": color.blue
    }
  };
  states = {
    index: 0,
    previousIndex: 0,
    reverse: function() {
      if (!(states.index > 0)) {
        return;
      }
      states.previousIndex = states.index;
      return states.index -= 1;
    },
    advance: function() {
      states.previousIndex = states.index;
      return states.index += 1;
    },
    active: function() {
      return states[states.index];
    },
    previous: function() {
      return states[states.previousIndex];
    },
    activeNode: function() {
      return states.active().nodes.active();
    },
    previousActiveNode: function() {
      return states.previous().nodes.active();
    },
    0: {
      timelineOriginal: ['s1', 's2', 's3', 's4'],
      timelineRevised: ['s1', 's2'],
      activeTrack: 'timelineOriginal',
      nodes: {
        active: function() {
          return states[0].nodes[1];
        },
        0: {
          state: 'off',
          position: 's1'
        },
        1: {
          state: 'on',
          position: 's2'
        },
        2: {
          state: 'off',
          position: 's3'
        },
        3: {
          state: 'off',
          position: 's4'
        },
        4: {
          state: 'unborn',
          position: 's2'
        },
        5: {
          state: 'unborn',
          position: 's2'
        }
      }
    },
    1: {
      timelineOriginal: ['s1', 's2', 'b3', 'b4'],
      timelineRevised: ['s1', 's2', 't3'],
      activeTrack: 'timelineRevised',
      nodes: {
        active: function() {
          return states[1].nodes[4];
        },
        0: {
          state: 'off',
          position: 's1'
        },
        1: {
          state: 'off',
          position: 's2'
        },
        2: {
          state: 'off',
          position: 'b3'
        },
        3: {
          state: 'off',
          position: 'b4'
        },
        4: {
          state: 'on',
          position: 't3'
        },
        5: {
          state: 'unborn',
          position: 't3'
        }
      }
    }
  };
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
    _results = [];
    for (num = 0, _ref = nodeCount - 1; (0 <= _ref ? num <= _ref : num >= _ref); (0 <= _ref ? num += 1 : num -= 1)) {
      node = state.nodes[num];
      disc = raphael.circle(coords[node.position].x, coords[node.position].y, radius).attr(graphics.offNodeAttributes);
      _results.push(graphics.nodes.push(disc));
    }
    return _results;
  };
  drawActiveNode = function() {
    var state;
    state = states.active();
    return graphics.activeNode = raphael.circle(coords[states.activeNode().position].x, coords[states.activeNode().position].y, radius).attr(graphics.onNodeAttributes);
  };
  drawState = function() {
    var state;
    state = states.active();
    drawTimelines(state);
    drawActiveTimeline(state);
    drawAllNodes(state);
    return drawActiveNode();
  };
  transitionTimelines = function() {
    var previous, state;
    state = states.active();
    previous = states.previous();
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
  transitionActiveTimeline = function() {
    var activeTrack, previous, state;
    state = states.active();
    previous = states.previous();
    activeTrack = state.activeTrack;
    drawActiveTimeline(previous, activeTrack);
    return graphics.activeTimeline.animate({
      path: generatePath.apply(null, state[activeTrack])
    }, animationPeriod, "<>");
  };
  transitionAllNodes = function() {
    var disc, node, num, previous, state, _ref, _results;
    state = states.active();
    previous = states.previous();
    drawAllNodes(previous);
    _results = [];
    for (num = 0, _ref = nodeCount - 1; (0 <= _ref ? num <= _ref : num >= _ref); (0 <= _ref ? num += 1 : num -= 1)) {
      node = state.nodes[num];
      disc = graphics.nodes[num];
      if (!(disc != null)) {
        break;
      }
      _results.push(disc.animate({
        cx: coords[node.position].x,
        cy: coords[node.position].y
      }, animationPeriod, "<>"));
    }
    return _results;
  };
  transitionActiveNode = function() {
    return graphics.activeNode.animate({
      cx: coords[states.activeNode().position].x,
      cy: coords[states.activeNode().position].y
    }, animationPeriod, "<>");
  };
  transitionStates = function() {
    raphael.clear();
    transitionTimelines();
    transitionActiveTimeline();
    transitionAllNodes();
    return transitionActiveNode();
  };
  jQuery($(__bind(function() {
    raphael = Raphael("notepad", totalWidth, totalHeight);
    drawState();
    console.log(graphics.nodes);
    states.advance();
    return transitionStates();
  }, this)));
}).call(this);
