(function() {
  var Chronolog, DocumentState, Timeline, animationPeriod, availableHeight, availableWidth, bufferContents, color, coords, disableButtons, drawActiveNode, drawActiveNodeNumber, drawActiveTimeline, drawAllNodes, drawNodeNumbers, drawState, drawTimelines, five, forkAngle, four, generatePath, graphMarkup, graphics, handleButton, lineLength, lineThickness, lineThinness, margin, nodeCount, numberVerticalOffset, one, radius, raphael, six, three, totalHeight, totalWidth, trackA, trackB, transitionActiveNode, transitionActiveTimeline, transitionAllNodes, transitionStates, transitionTimelines, two, updateBufferContents;
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
  Chronolog = (function() {
    function Chronolog(config) {
      this.coordinates = config.coordinates;
      Chronolog.instances.push(this);
    }
    Chronolog.prototype.myIndex = function() {
      return Chronolog.instances.indexOf(this);
    };
    Chronolog.prototype.next = function() {
      return Chronolog.instances[this.myIndex() + 1];
    };
    Chronolog.prototype.prev = function() {
      return Chronolog.instances[this.myIndex() - 1];
    };
    Chronolog.prototype.activate = function() {
      return Chronolog.activeChronologIndex = this.myIndex();
    };
    Chronolog.prototype.isActive = function() {
      return Chronolog.activeChronologIndex === this.myIndex();
    };
    Chronolog.instances = [];
    Chronolog.activeChronologIndex = 0;
    Chronolog.active = function() {
      return this.instances[this.activeChronologIndex];
    };
    Chronolog.reverse = function() {
      if (this.activeChronologIndex !== 0) {
        return this.activeChronologIndex--;
      }
    };
    Chronolog.advance = function() {
      if (this.activeChronologIndex !== this.instances.length - 1) {
        return this.activeChronologIndex++;
      }
    };
    Chronolog.reset = function() {
      return this.instances = [];
    };
    return Chronolog;
  })();
  window.Chronolog = Chronolog;
  Timeline = (function() {
    function Timeline(config) {
      this.chronologs = config.chronologs;
      this.coordinates = config.coordinates.split(",");
      Timeline.instances.push(this);
    }
    Timeline.prototype.activeChronologIndex = function() {
      return this.chronologs.indexOf(Chronolog.active());
    };
    Timeline.prototype.activate = function() {
      var myIndex;
      myIndex = Timeline.instances.indexOf(this);
      return Timeline.currentTrackIndex = myIndex;
    };
    Timeline.prototype.next = function() {
      return this.chronologs[this.activeChronologIndex() + 1];
    };
    Timeline.prototype.prev = function() {
      return this.chronologs[this.activeChronologIndex() - 1];
    };
    Timeline.instances = [];
    Timeline.currentTrackIndex = 0;
    Timeline.currentTrack = function() {
      return this.instances[this.currentTrackIndex];
    };
    Timeline.currentChronolog = function() {
      return Chronolog.active();
    };
    Timeline.advanceAndUpdateState = function(method) {
      DocumentState.reset();
      new DocumentState(Timeline.asDocumentState());
      this.advance(method);
      return new DocumentState(Timeline.asDocumentState());
    };
    Timeline.reverseAndUpdateState = function(method) {
      DocumentState.reset();
      new DocumentState(Timeline.asDocumentState());
      this.reverse(method);
      return new DocumentState(Timeline.asDocumentState());
    };
    Timeline.advance = function(method) {
      var activeChronolog, activeTrack, nextChronolog;
      activeTrack = Timeline.currentTrack();
      if (method === 'track') {
        nextChronolog = activeTrack.next();
        if (nextChronolog != null) {
          return nextChronolog.activate();
        }
      } else if (method === 'chronological') {
        activeChronolog = Chronolog.active();
        if (activeTrack.chronologs.indexOf(activeChronolog.next()) < 0) {
          Timeline.switchTracks();
        }
        return Chronolog.advance();
      }
    };
    Timeline.reverse = function(method) {
      var activeChronolog, activeTrack, prevChronolog;
      activeTrack = Timeline.currentTrack();
      if (method === 'track') {
        prevChronolog = activeTrack.prev();
        if (prevChronolog != null) {
          return prevChronolog.activate();
        }
      } else if (method === 'chronological') {
        activeChronolog = Chronolog.active();
        if (activeTrack.chronologs.indexOf(activeChronolog.prev()) < 0) {
          Timeline.switchTracks();
        }
        return Chronolog.reverse();
      }
    };
    Timeline.atStart = function(method) {
      var activeChronolog;
      activeChronolog = Chronolog.active();
      return Chronolog.instances[0] === activeChronolog;
    };
    Timeline.atFinish = function(method) {
      var activeChronolog, activeTrack;
      activeChronolog = Chronolog.active();
      if (method === 'track') {
        activeTrack = Timeline.currentTrack();
        return activeTrack.chronologs[activeTrack.chronologs.length - 1] === activeChronolog;
      } else if (method === 'chronological') {
        return Chronolog.instances[Chronolog.instances.length - 1] === activeChronolog;
      }
    };
    Timeline.switchTracks = function() {
      if (this.currentTrackIndex === 0) {
        return this.currentTrackIndex = 1;
      } else {
        return this.currentTrackIndex = 0;
      }
    };
    Timeline.asDocumentState = function() {
      var configObject, node, _i, _len, _ref;
      configObject = {
        timelineOriginal: {
          points: this.instances[0].coordinates.join(",")
        },
        timelineRevised: {
          points: this.instances[1].coordinates.join(",")
        },
        nodes: []
      };
      _ref = Chronolog.instances;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        configObject.nodes.push({
          position: node.coordinates,
          state: node.isActive() ? 'on' : 'off'
        });
      }
      if (Timeline.currentTrackIndex === 0) {
        configObject.timelineOriginal['active'] = true;
      } else {
        configObject.timelineRevised['active'] = true;
      }
      return configObject;
    };
    Timeline.reset = function() {
      return this.instances = [];
    };
    return Timeline;
  })();
  window.Timeline = Timeline;
  one = new Chronolog({
    coordinates: 's1'
  });
  two = new Chronolog({
    coordinates: 's2'
  });
  three = new Chronolog({
    coordinates: 'b3'
  });
  four = new Chronolog({
    coordinates: 'b4'
  });
  five = new Chronolog({
    coordinates: 't5'
  });
  six = new Chronolog({
    coordinates: 't6'
  });
  trackA = new Timeline({
    chronologs: [one, two, three, four],
    coordinates: 's1,s2,b3,b4'
  });
  trackB = new Timeline({
    chronologs: [one, two, five, six],
    coordinates: 's1,s2,t3,t5,t6'
  });
  trackB.activate();
  six.activate();
  new DocumentState(Timeline.asDocumentState());
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
  handleButton = function() {
    if (!$(this).hasClass('disabled')) {
      switch ($(this).attr('class')) {
        case "undo":
          Timeline.reverseAndUpdateState('track');
          break;
        case "redo":
          Timeline.advanceAndUpdateState('track');
          break;
        case "earlier":
          Timeline.reverseAndUpdateState('chronological');
          break;
        case "later":
          Timeline.advanceAndUpdateState('chronological');
      }
      DocumentState.advance();
      transitionStates();
      disableButtons();
    }
    return false;
  };
  disableButtons = function() {
    return $("#vim-history-buttons a").each(function() {
      var klass;
      $(this).removeClass('disabled');
      klass = $(this).attr('class');
      if (Timeline.atStart('track') && klass === 'undo') {
        $(this).addClass('disabled');
      }
      if (Timeline.atStart('chronological') && klass === 'earlier') {
        $(this).addClass('disabled');
      }
      if (Timeline.atFinish('track') && klass === 'redo') {
        $(this).addClass('disabled');
      }
      if (Timeline.atFinish('chronological') && klass === 'later') {
        return $(this).addClass('disabled');
      }
    });
  };
  graphMarkup = "<div id=\"vim-history-buffer\">\n  <code><pre></pre></code>\n</div>\n<div id=\"vim-history-buttons\">\n  <a class=\"undo\" href=\"#\">undo</a>\n  <a class=\"redo\" href=\"#\">redo</a>\n  <a class=\"later\" href=\"#\">later</a>\n  <a class=\"earlier\" href=\"#\">earlier</a>\n</div>\n<div id=\"vim-history-graph\"/>";
  jQuery($(__bind(function() {
    $("#vim-history-visualization").append(graphMarkup);
    $("#vim-history-buttons a").click(handleButton);
    disableButtons();
    raphael = Raphael("vim-history-graph", totalWidth, totalHeight);
    return drawState();
  }, this)));
  window.graphics = graphics;
}).call(this);
