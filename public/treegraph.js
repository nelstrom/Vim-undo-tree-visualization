(function() {
  var animationPeriod, availableHeight, availableWidth, color, coords, drawActiveNode, drawActiveTimeline, drawAllNodes, drawState, drawTimelines, forkAngle, generatePath, graphics, lineLength, lineThickness, lineThinness, margin, nodeCount, radius, raphael, states, totalHeight, totalWidth, transitionStates;
  var __slice = Array.prototype.slice, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  totalWidth = 640;
  totalHeight = 480;
  margin = 90;
  availableHeight = totalHeight - (margin * 2);
  availableWidth = totalWidth - (margin * 2);
  nodeCount = 6;
  lineLength = availableWidth / (nodeCount - 1);
  forkAngle = Math.PI / 3;
  radius = 15;
  animationPeriod = 500;
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
    advance: function() {
      return states.active += 1;
    },
    active: 1,
    1: {
      timelineOriginal: ['s1', 's2', 's3', 's4'],
      timelineRevised: ['s1', 's2'],
      activeTrack: 'timelineOriginal',
      nodes: {
        1: {
          state: 'off',
          position: 's1'
        },
        2: {
          state: 'on',
          position: 's2'
        },
        3: {
          state: 'off',
          position: 's3'
        },
        4: {
          state: 'off',
          position: 's4'
        },
        5: {
          state: 'unborn',
          position: 's5'
        }
      }
    },
    2: {
      timelineOriginal: ['s1', 's2', 'b3', 'b4'],
      timelineRevised: ['s1', 's2', 't3'],
      activeTrack: 'timelineRevised',
      nodes: {
        1: {
          state: 'off',
          position: 's1'
        },
        2: {
          state: 'off',
          position: 's2'
        },
        3: {
          state: 'off',
          position: 'b3'
        },
        4: {
          state: 'off',
          position: 'b4'
        },
        5: {
          state: 'on',
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
  drawTimelines = function() {
    var state;
    state = states[states.active];
    graphics.timelineOriginalThick = raphael.path(generatePath.apply(null, state.timelineOriginal)).attr(graphics.thickLineAttributes);
    graphics.timelineOriginalThin = raphael.path(generatePath.apply(null, state.timelineOriginal)).attr(graphics.thinLineAttributes);
    graphics.timelineRevisedThick = raphael.path(generatePath.apply(null, state.timelineRevised)).attr(graphics.thickLineAttributes);
    return graphics.timelineRevisedThin = raphael.path(generatePath.apply(null, state.timelineRevised)).attr(graphics.thinLineAttributes);
  };
  drawActiveTimeline = function() {
    var activeTrack, state;
    state = states[states.active];
    activeTrack = state.activeTrack;
    return graphics.activeTimeline = raphael.path(generatePath.apply(null, state[activeTrack])).attr(graphics.thickLineAttributes);
  };
  drawAllNodes = function() {
    var disc, node, num, state, _results;
    state = states[states.active];
    _results = [];
    for (num = 1; num <= 5; num++) {
      node = state.nodes[num];
      if (node.state === 'unborn') {
        break;
      }
      if (node.state === 'on') {
        graphics.activeNode = node;
      }
      disc = raphael.circle(coords[node.position].x, coords[node.position].y, radius).attr(graphics.offNodeAttributes);
      _results.push(graphics.nodes.push(disc));
    }
    return _results;
  };
  drawActiveNode = function() {
    var disc, state;
    state = states[states.active];
    return disc = raphael.circle(coords[graphics.activeNode.position].x, coords[graphics.activeNode.position].y, radius).attr(graphics.onNodeAttributes);
  };
  drawState = function() {
    drawTimelines();
    drawActiveTimeline();
    drawAllNodes();
    return drawActiveNode();
  };
  transitionStates = function() {
    var activeTrack, state;
    state = states[states.active];
    graphics.timelineOriginalThick.animate({
      path: generatePath.apply(null, state.timelineOriginal)
    }, animationPeriod);
    graphics.timelineOriginalThin.animate({
      path: generatePath.apply(null, state.timelineOriginal)
    }, animationPeriod);
    graphics.timelineRevisedThick.animate({
      path: generatePath.apply(null, state.timelineRevised)
    }, animationPeriod);
    graphics.timelineRevisedThin.animate({
      path: generatePath.apply(null, state.timelineRevised)
    }, animationPeriod);
    activeTrack = state.activeTrack;
    return graphics.activeTimeline.animate({
      path: generatePath.apply(null, state[activeTrack])
    }, animationPeriod);
  };
  jQuery($(__bind(function() {
    raphael = Raphael("notepad", totalWidth, totalHeight);
    drawState();
    states.advance();
    return transitionStates();
  }, this)));
}).call(this);
