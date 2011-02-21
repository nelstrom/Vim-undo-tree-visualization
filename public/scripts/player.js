(function() {
  var animationPeriod, availableHeight, availableWidth, bufferContents, color, coords, disableButtons, drawActiveNode, drawActiveNodeNumber, drawActiveTimeline, drawAllNodes, drawNodeNumbers, drawState, drawTimelines, earlier, forkAngle, generatePath, graphMarkup, graphics, handleButton, keyboardHandler, later, lineLength, lineThickness, lineThinness, margin, nodeCount, numberVerticalOffset, radius, raphael, redo, totalHeight, totalWidth, transitionActiveNode, transitionActiveTimeline, transitionAllNodes, transitionStates, transitionTimelines, undo, updateBufferContents;
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
    Timeline.reverseAndUpdateState('track');
    DocumentState.advance();
    transitionStates();
    disableButtons();
    return false;
  };
  redo = function() {
    Timeline.advanceAndUpdateState('track');
    DocumentState.advance();
    transitionStates();
    disableButtons();
    return false;
  };
  earlier = function() {
    Timeline.reverseAndUpdateState('chronological');
    DocumentState.advance();
    transitionStates();
    disableButtons();
    return false;
  };
  later = function() {
    Timeline.advanceAndUpdateState('chronological');
    DocumentState.advance();
    transitionStates();
    disableButtons();
    return false;
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
  graphMarkup = "<div id=\"vim-history-buffer\">\n  <code><pre></pre></code>\n</div>\n<div id=\"vim-history-buttons\">\n  <a class=\"undo\" href=\"#\">undo</a>\n  <a class=\"redo\" href=\"#\">redo</a>\n  <a class=\"later\" href=\"#\">later</a>\n  <a class=\"earlier\" href=\"#\">earlier</a>\n</div>\n<div id=\"vim-history-graph\"/>";
  jQuery($(__bind(function() {
    $("#vim-history-visualization").append(graphMarkup);
    $("#vim-history-buttons a").click(handleButton);
    disableButtons();
    $(window).keydown(keyboardHandler);
    raphael = Raphael("vim-history-graph", totalWidth, totalHeight);
    return drawState();
  }, this)));
  window.graphics = graphics;
}).call(this);
