(function() {
  var animationPeriod, availableHeight, availableWidth, color, coords, drawActiveNode, drawActiveTimeline, drawAllNodes, drawState, drawTimelines, earlier, forkAngle, generatePath, graphMarkup, graphics, later, lineLength, lineThickness, lineThinness, margin, nodeCount, radius, raphael, redo, states, story, totalHeight, totalWidth, transitionActiveNode, transitionActiveTimeline, transitionAllNodes, transitionStates, transitionTimelines, undo, updateBufferContents;
  var __slice = Array.prototype.slice, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
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
  story = {
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
      timelineOriginal: ['s1'],
      timelineRevised: ['s1'],
      activeTrack: 'timelineOriginal',
      nodes: {
        active: function() {
          return states[0].nodes[0];
        },
        0: {
          state: 'on',
          position: 's1'
        },
        1: {
          state: 'unborn',
          position: 's1'
        },
        2: {
          state: 'unborn',
          position: 's1'
        },
        3: {
          state: 'unborn',
          position: 's1'
        },
        4: {
          state: 'unborn',
          position: 's1'
        },
        5: {
          state: 'unborn',
          position: 's1'
        }
      }
    },
    1: {
      timelineOriginal: ['s1', 's2'],
      timelineRevised: ['s1', 's2'],
      activeTrack: 'timelineOriginal',
      nodes: {
        active: function() {
          return states[1].nodes[1];
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
          state: 'unborn',
          position: 's2'
        },
        3: {
          state: 'unborn',
          position: 's2'
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
    2: {
      timelineOriginal: ['s1', 's2', 's3'],
      timelineRevised: ['s1', 's2'],
      activeTrack: 'timelineOriginal',
      nodes: {
        active: function() {
          return states[2].nodes[2];
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
          state: 'on',
          position: 's3'
        },
        3: {
          state: 'unborn',
          position: 's3'
        },
        4: {
          state: 'unborn',
          position: 's3'
        },
        5: {
          state: 'unborn',
          position: 's3'
        }
      }
    },
    3: {
      timelineOriginal: ['s1', 's2', 's3', 's4'],
      timelineRevised: ['s1', 's2'],
      activeTrack: 'timelineOriginal',
      nodes: {
        active: function() {
          return states[3].nodes[3];
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
          position: 's3'
        },
        3: {
          state: 'on',
          position: 's4'
        },
        4: {
          state: 'unborn',
          position: 's4'
        },
        5: {
          state: 'unborn',
          position: 's4'
        }
      }
    },
    4: {
      timelineOriginal: ['s1', 's2', 's3', 's4'],
      timelineRevised: ['s1', 's2'],
      activeTrack: 'timelineOriginal',
      nodes: {
        active: function() {
          return states[4].nodes[2];
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
          state: 'on',
          position: 's3'
        },
        3: {
          state: 'off',
          position: 's4'
        },
        4: {
          state: 'unborn',
          position: 's3'
        },
        5: {
          state: 'unborn',
          position: 's3'
        }
      }
    },
    5: {
      timelineOriginal: ['s1', 's2', 's3', 's4'],
      timelineRevised: ['s1', 's2'],
      activeTrack: 'timelineOriginal',
      nodes: {
        active: function() {
          return states[5].nodes[1];
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
    6: {
      timelineOriginal: ['s1', 's2', 'b3', 'b4'],
      timelineRevised: ['s1', 's2', 't3'],
      activeTrack: 'timelineRevised',
      nodes: {
        active: function() {
          return states[6].nodes[4];
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
    },
    7: {
      timelineOriginal: ['s1', 's2', 'b3', 'b4'],
      timelineRevised: ['s1', 's2', 't3', 't4'],
      activeTrack: 'timelineRevised',
      nodes: {
        active: function() {
          return states[7].nodes[5];
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
          state: 'off',
          position: 't3'
        },
        5: {
          state: 'on',
          position: 't4'
        }
      }
    },
    8: {
      timelineOriginal: ['s1', 's2', 'b3', 'b4'],
      timelineRevised: ['s1', 's2', 't3', 't4'],
      activeTrack: 'timelineRevised',
      nodes: {
        active: function() {
          return states[8].nodes[4];
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
          state: 'off',
          position: 't4'
        }
      }
    },
    9: {
      timelineOriginal: ['s1', 's2', 'b3', 'b4'],
      timelineRevised: ['s1', 's2', 't3', 't4'],
      activeTrack: 'timelineRevised',
      nodes: {
        active: function() {
          return states[9].nodes[1];
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
          position: 'b3'
        },
        3: {
          state: 'off',
          position: 'b4'
        },
        4: {
          state: 'off',
          position: 't3'
        },
        5: {
          state: 'off',
          position: 't4'
        }
      }
    },
    10: {
      timelineOriginal: ['s1', 's2', 'b3', 'b4'],
      timelineRevised: ['s1', 's2', 't3', 't4'],
      activeTrack: 'timelineRevised',
      nodes: {
        active: function() {
          return states[10].nodes[4];
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
          state: 'off',
          position: 't4'
        }
      }
    },
    11: {
      timelineOriginal: ['s1', 's2', 'b3', 'b4'],
      timelineRevised: ['s1', 's2', 't3', 't4'],
      activeTrack: 'timelineRevised',
      nodes: {
        active: function() {
          return states[11].nodes[5];
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
          state: 'off',
          position: 't3'
        },
        5: {
          state: 'on',
          position: 't4'
        }
      }
    },
    12: {
      timelineOriginal: ['s1', 's2', 's3', 's4'],
      timelineRevised: ['s1', 's2', 's5', 's6'],
      activeTrack: 'timelineRevised',
      nodes: {
        active: function() {
          return states[12].nodes[5];
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
          position: 's3'
        },
        3: {
          state: 'off',
          position: 's4'
        },
        4: {
          state: 'off',
          position: 's5'
        },
        5: {
          state: 'on',
          position: 's6'
        }
      }
    }
  };
  states = story;
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
  drawActiveNode = function(state) {
    return graphics.activeNode = raphael.circle(coords[state.nodes.active().position].x, coords[state.nodes.active().position].y, radius).attr(graphics.onNodeAttributes);
  };
  drawState = function() {
    var state;
    state = states.active();
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
    var disc, node, num, _ref, _results;
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
  transitionActiveNode = function(state, previous) {
    drawActiveNode(previous);
    return graphics.activeNode.animate({
      cx: coords[state.nodes.active().position].x,
      cy: coords[state.nodes.active().position].y
    }, animationPeriod, "<>");
  };
  transitionStates = function() {
    var current, previous;
    raphael.clear();
    current = states.active();
    previous = states.previous();
    transitionTimelines(current, previous);
    transitionActiveTimeline(current, previous);
    transitionAllNodes(current, previous);
    transitionActiveNode(current, previous);
    return updateBufferContents();
  };
  updateBufferContents = function() {
    var current;
    current = states.active();
    return $("#vim-history-buffer code pre").html(current.buffer);
  };
  undo = function() {
    return earlier();
  };
  redo = function() {
    return later();
  };
  earlier = function() {
    states.reverse();
    transitionStates();
    return false;
  };
  later = function() {
    states.advance();
    transitionStates();
    return false;
  };
  graphMarkup = "<div id=\"vim-history-buffer\">\n  <code><pre></pre></code>\n</div>\n<div id=\"vim-history-buttons\">\n  <a class=\"undo\" href=\"#\">undo</a>\n  <a class=\"redo\" href=\"#\">redo</a>\n  <a class=\"later\" href=\"#\">later</a>\n  <a class=\"earlier\" href=\"#\">earlier</a>\n</div>\n<div id=\"vim-history-graph\"/>";
  jQuery($(__bind(function() {
    $("#vim-history-visualization").append(graphMarkup);
    $("#vim-history-buttons a.undo").click(undo);
    $("#vim-history-buttons a.redo").click(redo);
    $("#vim-history-buttons a.later").click(later);
    $("#vim-history-buttons a.earlier").click(earlier);
    raphael = Raphael("vim-history-graph", totalWidth, totalHeight);
    return drawState();
  }, this)));
}).call(this);
