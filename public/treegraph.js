(function() {
  var animationPeriod, availableHeight, availableWidth, coords, forkAngle, generatePath, lineLength, lineThickness, margin, nodeCount, radius, states, totalHeight, totalWidth;
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
  lineThickness = 8;
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
  states = {
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
  jQuery($(__bind(function() {
    var bottomBranchedLine, bottomline, lineAttributes, longStraightLine, paper, shortStraightLine, topBranchedLine, topline;
    paper = Raphael("notepad", totalWidth, totalHeight);
    longStraightLine = ['s1', 's2', 's3', 's4'];
    shortStraightLine = ['s1', 's2'];
    topBranchedLine = ['s1', 's2', 't3'];
    bottomBranchedLine = ['s1', 's2', 'b3', 'b4'];
    lineAttributes = {
      "stroke": "#008",
      "stroke-width": lineThickness,
      "stroke-linecap": "butt",
      "stroke-linejoin": "miter"
    };
    topline = paper.path(generatePath.apply(null, shortStraightLine)).attr(lineAttributes);
    bottomline = paper.path(generatePath.apply(null, longStraightLine)).attr(lineAttributes);
    topline.animate({
      path: generatePath.apply(null, topBranchedLine)
    }, animationPeriod);
    return bottomline.animate({
      path: generatePath.apply(null, bottomBranchedLine)
    }, animationPeriod);
  }, this)));
}).call(this);
