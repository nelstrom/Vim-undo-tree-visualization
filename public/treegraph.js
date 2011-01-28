(function() {
  var advance, animationPeriod, availableHeight, availableWidth, color, coords, drawActiveNode, drawActiveTimeline, drawAllNodes, drawState, drawTimelines, forkAngle, generatePath, graphics, lineLength, lineThickness, lineThinness, margin, nodeCount, playback, radius, raphael, reverse, states, story, totalHeight, totalWidth, transitionActiveNode, transitionActiveTimeline, transitionAllNodes, transitionStates, transitionTimelines;
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
  animationPeriod = 250;
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
  playback = {
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
      timelineOriginal: ['s1', 's2', 'b3', 'b4'],
      timelineRevised: ['s1', 's2', 't3', 't5', 't6'],
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
          position: 't5'
        },
        5: {
          state: 'off',
          position: 't6'
        }
      },
      buffer: "1955, November 12th\n    Lightning strikes the clocktower at 10.04pm"
    },
    1: {
      timelineOriginal: ['s1', 's2', 'b3', 'b4'],
      timelineRevised: ['s1', 's2', 't3', 't5', 't6'],
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
          state: 'off',
          position: 'b3'
        },
        3: {
          state: 'off',
          position: 'b4'
        },
        4: {
          state: 'off',
          position: 't5'
        },
        5: {
          state: 'off',
          position: 't6'
        }
      },
      buffer: "1955, November 5th\n    George McFly falls out of a tree and is hit by a car.\n\n1955, November 12th\n    Lightning strikes the clocktower at 10.04pm"
    },
    2: {
      timelineOriginal: ['s1', 's2', 'b3', 'b4'],
      timelineRevised: ['s1', 's2', 't3', 't5', 't6'],
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
          position: 'b3'
        },
        3: {
          state: 'off',
          position: 'b4'
        },
        4: {
          state: 'off',
          position: 't5'
        },
        5: {
          state: 'off',
          position: 't6'
        }
      },
      buffer: "1955, November 5th\n    George McFly falls out of a tree and is hit by a car.\n    Lorraine Baines nurses George, and thinks he's cute.\n\n1955, November 12th\n    Lightning strikes the clocktower at 10.04pm"
    },
    3: {
      timelineOriginal: ['s1', 's2', 'b3', 'b4'],
      timelineRevised: ['s1', 's2', 't3', 't5', 't6'],
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
          position: 'b3'
        },
        3: {
          state: 'on',
          position: 'b4'
        },
        4: {
          state: 'off',
          position: 't5'
        },
        5: {
          state: 'off',
          position: 't6'
        }
      },
      buffer: "1955, November 5th\n    George McFly falls out of a tree and is hit by a car.\n    Lorraine Baines nurses George, and thinks he's cute.\n\n1955, November 12th\n    George McFly takes Lorraine Baines to the dance, and they kiss.\n    Lighting strikes the clocktower at 10.04pm"
    },
    4: {
      timelineOriginal: ['s1', 's2', 'b3', 'b4'],
      timelineRevised: ['s1', 's2', 't3', 't5', 't6'],
      activeTrack: 'timelineRevised',
      nodes: {
        active: function() {
          return states[4].nodes[4];
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
          position: 't5'
        },
        5: {
          state: 'off',
          position: 't6'
        }
      },
      buffer: "1955, November 5th\n    Marty McFly is hit by a car.\n    Lorraine Baines nurses Marty, and thinks he's cute.\n\n1955, November 12th\n    Lighting strikes the clocktower at 10.04pm"
    },
    5: {
      timelineOriginal: ['s1', 's2', 'b3', 'b4'],
      timelineRevised: ['s1', 's2', 't3', 't5', 't6'],
      activeTrack: 'timelineRevised',
      nodes: {
        active: function() {
          return states[5].nodes[5];
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
          position: 't5'
        },
        5: {
          state: 'on',
          position: 't6'
        }
      },
      buffer: "1955, November 5th\n    George McFly falls out of a tree and is saved by Marty McFly.\n    Lorraine Baines nurses Marty.\n\n1955, November 12th\n    Marty Mcfly takes Lorraine Baines to the dance, and they kiss.\n    Marty McFly invents Rock and Roll\n    George McFly and Loraine Baines kiss.\n    Lightning strikes the clocktower at 10.04pm"
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
      timelineOriginal: ['s1', 's2'],
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
    1: {
      timelineOriginal: ['s1', 's2', 's3'],
      timelineRevised: ['s1', 's2'],
      activeTrack: 'timelineOriginal',
      nodes: {
        active: function() {
          return states[1].nodes[2];
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
    2: {
      timelineOriginal: ['s1', 's2', 's3', 's4'],
      timelineRevised: ['s1', 's2'],
      activeTrack: 'timelineOriginal',
      nodes: {
        active: function() {
          return states[2].nodes[3];
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
    3: {
      timelineOriginal: ['s1', 's2', 's3', 's4'],
      timelineRevised: ['s1', 's2'],
      activeTrack: 'timelineOriginal',
      nodes: {
        active: function() {
          return states[3].nodes[2];
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
    4: {
      timelineOriginal: ['s1', 's2', 's3', 's4'],
      timelineRevised: ['s1', 's2'],
      activeTrack: 'timelineOriginal',
      nodes: {
        active: function() {
          return states[4].nodes[1];
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
    5: {
      timelineOriginal: ['s1', 's2', 'b3', 'b4'],
      timelineRevised: ['s1', 's2', 't3'],
      activeTrack: 'timelineRevised',
      nodes: {
        active: function() {
          return states[5].nodes[4];
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
    6: {
      timelineOriginal: ['s1', 's2', 'b3', 'b4'],
      timelineRevised: ['s1', 's2', 't3', 't4'],
      activeTrack: 'timelineRevised',
      nodes: {
        active: function() {
          return states[6].nodes[5];
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
    7: {
      timelineOriginal: ['s1', 's2', 'b3', 'b4'],
      timelineRevised: ['s1', 's2', 't3', 't4'],
      activeTrack: 'timelineRevised',
      nodes: {
        active: function() {
          return states[7].nodes[4];
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
    8: {
      timelineOriginal: ['s1', 's2', 'b3', 'b4'],
      timelineRevised: ['s1', 's2', 't3', 't4'],
      activeTrack: 'timelineRevised',
      nodes: {
        active: function() {
          return states[8].nodes[1];
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
    9: {
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
    }
  };
  states = story;
  states = playback;
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
    return drawActiveNode(state);
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
    return transitionActiveNode(current, previous);
  };
  reverse = function() {
    states.reverse();
    return transitionStates();
  };
  advance = function() {
    states.advance();
    return transitionStates();
  };
  jQuery($(__bind(function() {
    raphael = Raphael("vim-history-graph", totalWidth, totalHeight);
    $("#vim-history-graph").after("<button id='nextButton'>next</button>");
    $("#nextButton").click(advance);
    $("#vim-history-graph").after("<button id='prevButton'>prev</button>");
    $("#prevButton").click(reverse);
    return drawState();
  }, this)));
}).call(this);
