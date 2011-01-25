#Canvas attributes
totalWidth = 640
totalHeight = 480
margin = 90
availableHeight = totalHeight - (margin * 2)
availableWidth  = totalWidth  - (margin * 2)

# Graph attributes
nodeCount = 6
lineLength = (availableWidth / (nodeCount-1))
forkAngle = (Math.PI / 6)
radius = 15
animationPeriod = 750
lineThinness = 5
lineThickness = 8

color =
  black: "#000"
  white: "#fff"
  blue: "#008"

# Workhorse parameters
raphael = null
coords = {}

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
    "stroke": color.blue
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
    "fill": color.blue
    "stroke": color.blue

states =
  index: 0
  previousIndex: 0
  reverse: () ->
    return unless states.index > 0
    states.previousIndex = states.index
    states.index -= 1
  advance: () ->
    states.previousIndex = states.index
    states.index += 1
  active: () -> states[states.index]
  previous: () -> states[states.previousIndex]
  activeNode: () -> states.active().nodes.active()
  previousActiveNode: () -> states.previous().nodes.active()
  0:
    timelineOriginal:
      ['s1','s2','s3','s4']
    timelineRevised:
      ['s1','s2']
    activeTrack:
      'timelineOriginal'
    nodes:
      active: () -> states[0].nodes[1]
      0:
        state: 'off'
        position: 's1'
      1:
        state: 'on'
        position: 's2'
      2:
        state: 'off'
        position: 's3'
      3:
        state: 'off'
        position: 's4'
      4:
        state: 'unborn'
        position: 's5'
  1:
    timelineOriginal:
      ['s1','s2','b3','b4']
    timelineRevised:
      ['s1','s2','t3']
    activeTrack:
      'timelineRevised'
    nodes:
      active: () -> states[1].nodes[4]
      0:
        state: 'off'
        position: 's1'
      1:
        state: 'off'
        position: 's2'
      2:
        state: 'off'
        position: 'b3'
      3:
        state: 'off'
        position: 'b4'
      4:
        state: 'on'
        position: 't3'

# Utility methods
generatePath = (origin, coordinates...) ->
  points = ["M #{coords[origin].x} #{coords[origin].y}"]
  for point in coordinates
    points.push("L #{coords[point].x} #{coords[point].y}")
  points.join("")

drawTimelines = () ->
  state = states.active()

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


drawActiveTimeline = () ->
  state = states.active()

  activeTrack = state.activeTrack
  graphics.activeTimeline = raphael.path(
    generatePath(state[activeTrack]...)
  ).attr(graphics.thickLineAttributes)


drawAllNodes = () ->
  state = states.active()

  for num in [0..4]
    node = state.nodes[num]
    break if node.state is 'unborn'
    disc = raphael.circle(
      coords[node.position].x,
      coords[node.position].y,
      radius
    ).attr(graphics.offNodeAttributes)
    graphics.nodes.push(disc)


drawActiveNode = () ->
  state = states.active()

  graphics.activeNode = raphael.circle(
    coords[states.activeNode().position].x,
    coords[states.activeNode().position].y,
    radius
  ).attr(graphics.onNodeAttributes)


drawState = () ->
  drawTimelines()
  #drawActiveTimeline()
  drawAllNodes()
  drawActiveNode()

transitionTimelines = () ->
  state = states.active()

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

transitionActiveTimeline = () ->
  state = states.active()

  activeTrack = state.activeTrack
  graphics.activeTimeline.animate({
    path: generatePath(state[activeTrack]...)
  }, animationPeriod, "<>")

transitionAllNodes = () ->
  state = states.active()

  for num in [0..4]
    node = state.nodes[num]
    disc = graphics.nodes[num]
    break if not disc?
    disc.animate({
      cx: coords[node.position].x
      cy: coords[node.position].y
    }, animationPeriod, "<>")

transitionActiveNode = () ->
  state = states.active()

  graphics.activeNode.animate({
    cx: coords[states.activeNode().position].x
    cy: coords[states.activeNode().position].y
  }, animationPeriod, "<>")


transitionStates = () ->
  transitionTimelines()
  #transitionActiveTimeline()
  transitionAllNodes()
  transitionActiveNode()

jQuery($ =>
  raphael = Raphael("notepad", totalWidth, totalHeight)
  drawState()
  states.advance()
  transitionStates()
)

