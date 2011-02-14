#Canvas attributes
totalWidth = 640
totalHeight = 300
margin = 90
availableHeight = totalHeight - (margin * 2)
availableWidth  = totalWidth  - (margin * 2)

# Graph attributes
nodeCount = 6
lineLength = (availableWidth / (nodeCount-1))
forkAngle = (Math.PI / 6)
radius = 15
animationPeriod = 250
lineThinness = 7
lineThickness = 8

color =
  black: "#444"
  darkgrey: "#888"
  white: "#fff"

# Workhorse parameters
raphael = null
coords = {}




#   The following co-ordinates are predefined:
#
#                       t3 ---- t4 ---- t5 ---- t6
#                      /
#                     /
#   s1 ---- s2 ---- s3 ---- s4 ---- s5 ---- s6
#                     \
#                      \
#                       b3 ---- b4
#
#   's' for straight
#   't' for top-fork
#   'b' for bottom-fork
#
coords.s1 =
  x: margin
  y: totalHeight / 2
coords.s2 =
  x: margin + lineLength*1
  y: totalHeight / 2
coords.s3 =
  x: margin + lineLength*2
  y: totalHeight / 2
coords.s4 =
  x: margin + lineLength*3
  y: totalHeight / 2
coords.s5 =
  x: margin + lineLength*4
  y: totalHeight / 2
coords.s6 =
  x: margin + lineLength*5
  y: totalHeight / 2
coords.b3 =
  x: coords.s2.x + (lineLength * Math.cos(forkAngle))
  y: coords.s2.y + (lineLength * Math.sin(forkAngle))
coords.b4 =
  x: coords.b3.x + lineLength*1
  y: coords.b3.y
coords.t3 =
  x: coords.s2.x + (lineLength * Math.cos(forkAngle))
  y: coords.s2.y - (lineLength * Math.sin(forkAngle))
coords.t4 =
  x: coords.t3.x + lineLength*1
  y: coords.t3.y
coords.t5 =
  x: coords.t3.x + lineLength*2
  y: coords.t3.y
coords.t6 =
  x: coords.t3.x + lineLength*3
  y: coords.t3.y

graphics =
  timelineOriginalThick: null
  timelineOriginalThin: null
  timelineRevisedThick: null
  timelineRevisedThin: null
  activeTimeline: null
  activeNode: null
  nodes: []
  thickLineAttributes:
    "stroke": color.darkgrey
    "stroke-width": lineThickness
    "stroke-linecap": "butt"
    "stroke-linejoin": "miter"
  thinLineAttributes:
    "stroke": color.white
    "stroke-width": lineThinness
    "stroke-linecap": "butt"
    "stroke-linejoin": "miter"
  offNodeAttributes:
    "fill": color.white
    "stroke": color.black
  onNodeAttributes:
    "fill": color.darkgrey
    "stroke": color.black

# Utility methods
generatePath = (origin, coordinates...) ->
  points = ["M #{coords[origin].x} #{coords[origin].y}"]
  for point in coordinates
    points.push("L #{coords[point].x} #{coords[point].y}")
  points.join("")

drawTimelines = (state) ->
  graphics.timelineOriginalThick = raphael.path(
    generatePath(state.timelineOriginal...)
  ).attr(graphics.thickLineAttributes)
  graphics.timelineOriginalThin = raphael.path(
    generatePath(state.timelineOriginal...)
  ).attr(graphics.thinLineAttributes)

  graphics.timelineRevisedThick = raphael.path(
    generatePath(state.timelineRevised...)
  ).attr(graphics.thickLineAttributes)
  graphics.timelineRevisedThin = raphael.path(
    generatePath(state.timelineRevised...)
  ).attr(graphics.thinLineAttributes)


drawActiveTimeline = (state, activeTrack=state.activeTrack) ->
  graphics.activeTimeline = raphael.path(
    generatePath(state[activeTrack]...)
  ).attr(graphics.thickLineAttributes)


drawAllNodes = (state) ->
  graphics.nodes = []
  for num in [0..(nodeCount-1)]
    node = state.nodes[num]
    disc = raphael.circle(
      coords[node.position].x,
      coords[node.position].y,
      radius
    ).attr(graphics.offNodeAttributes)
    graphics.nodes.push(disc)


drawActiveNode = (state) ->
  graphics.activeNode = raphael.circle(
    coords[state.activeNode.position].x,
    coords[state.activeNode.position].y,
    radius
  ).attr(graphics.onNodeAttributes)


drawState = () ->
  state = DocumentState.active()
  drawTimelines(state)
  drawActiveTimeline(state)
  drawAllNodes(state)
  drawActiveNode(state)
  updateBufferContents()

transitionTimelines = (state, previous) ->
  drawTimelines(previous)

  graphics.timelineOriginalThick.animate({
    path: generatePath(state.timelineOriginal...)
  }, animationPeriod, "<>")
  graphics.timelineOriginalThin.animate({
    path: generatePath(state.timelineOriginal...)
  }, animationPeriod, "<>")

  graphics.timelineRevisedThick.animate({
    path: generatePath(state.timelineRevised...)
  }, animationPeriod, "<>")
  graphics.timelineRevisedThin.animate({
    path: generatePath(state.timelineRevised...)
  }, animationPeriod, "<>")

transitionActiveTimeline = (state, previous) ->
  activeTrack = state.activeTrack
  drawActiveTimeline(previous, activeTrack)

  graphics.activeTimeline.animate({
    path: generatePath(state[activeTrack]...)
  }, animationPeriod, "<>")

transitionAllNodes = (state, previous) ->
  drawAllNodes(previous)

  for num in [0..nodeCount-1]
    node = state.nodes[num]
    disc = graphics.nodes[num]
    break if not disc?
    disc.animate({
      cx: coords[node.position].x
      cy: coords[node.position].y
    }, animationPeriod, "<>")

transitionActiveNode = (state, previous) ->
  drawActiveNode(previous)
  graphics.activeNode.animate({
    cx: coords[state.activeNode.position].x
    cy: coords[state.activeNode.position].y
  }, animationPeriod, "<>")


transitionStates = () ->
  raphael.clear()
  current = DocumentState.active()
  previous = DocumentState.previous()
  transitionTimelines(current, previous)
  transitionActiveTimeline(current, previous)
  transitionAllNodes(current, previous)
  transitionActiveNode(current, previous)
  updateBufferContents()

updateBufferContents = () ->
  current = DocumentState.active()
  $("#vim-history-buffer code pre").html(current.buffer)

undo = () ->
  earlier() # TODO: implement this!

redo = () ->
  later()   # TODO: implement this!

earlier = () ->
  DocumentState.reverse()
  transitionStates()
  return false

later = () ->
  DocumentState.advance()
  transitionStates()
  return false

graphMarkup = """
<div id="vim-history-buffer">
  <code><pre></pre></code>
</div>
<div id="vim-history-buttons">
  <a class="undo" href="#">undo</a>
  <a class="redo" href="#">redo</a>
  <a class="later" href="#">later</a>
  <a class="earlier" href="#">earlier</a>
</div>
<div id="vim-history-graph"/>
"""

jQuery($ =>
  $("#vim-history-visualization").append(graphMarkup)
  $("#vim-history-buttons a.undo").click(undo)
  $("#vim-history-buttons a.redo").click(redo)
  $("#vim-history-buttons a.later").click(later)
  $("#vim-history-buttons a.earlier").click(earlier)
  raphael = Raphael("vim-history-graph", totalWidth, totalHeight)
  drawState()
)

