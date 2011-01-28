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

playback =
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
      ['s1','s2','b3','b4']
    timelineRevised:
      ['s1','s2','t3','t5','t6']
    activeTrack:
      'timelineOriginal'
    nodes:
      active: () -> states[0].nodes[0]
      0:
        state: 'on'
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
        state: 'off'
        position: 't5'
      5:
        state: 'off'
        position: 't6'
    buffer: """
    1955, November 12th
        Lightning strikes the clocktower at 10.04pm
    """
  1:
    timelineOriginal:
      ['s1','s2','b3','b4']
    timelineRevised:
      ['s1','s2','t3','t5','t6']
    activeTrack:
      'timelineOriginal'
    nodes:
      active: () -> states[1].nodes[1]
      0:
        state: 'off'
        position: 's1'
      1:
        state: 'on'
        position: 's2'
      2:
        state: 'off'
        position: 'b3'
      3:
        state: 'off'
        position: 'b4'
      4:
        state: 'off'
        position: 't5'
      5:
        state: 'off'
        position: 't6'
    buffer: """
    1955, November 5th
        George McFly falls out of a tree and is hit by a car.

    1955, November 12th
        Lightning strikes the clocktower at 10.04pm
    """
  2:
    timelineOriginal:
      ['s1','s2','b3','b4']
    timelineRevised:
      ['s1','s2','t3','t5','t6']
    activeTrack:
      'timelineOriginal'
    nodes:
      active: () -> states[2].nodes[2]
      0:
        state: 'off'
        position: 's1'
      1:
        state: 'off'
        position: 's2'
      2:
        state: 'on'
        position: 'b3'
      3:
        state: 'off'
        position: 'b4'
      4:
        state: 'off'
        position: 't5'
      5:
        state: 'off'
        position: 't6'
    buffer: """
    1955, November 5th
        George McFly falls out of a tree and is hit by a car.
        Lorraine Baines nurses George, and thinks he's cute.

    1955, November 12th
        Lightning strikes the clocktower at 10.04pm
    """
  3:
    timelineOriginal:
      ['s1','s2','b3','b4']
    timelineRevised:
      ['s1','s2','t3','t5','t6']
    activeTrack:
      'timelineOriginal'
    nodes:
      active: () -> states[3].nodes[3]
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
        state: 'on'
        position: 'b4'
      4:
        state: 'off'
        position: 't5'
      5:
        state: 'off'
        position: 't6'
    buffer: """
    1955, November 5th
        George McFly falls out of a tree and is hit by a car.
        Lorraine Baines nurses George, and thinks he's cute.

    1955, November 12th
        George McFly takes Lorraine Baines to the dance, and they kiss.
        Lighting strikes the clocktower at 10.04pm
    """
  4:
    timelineOriginal:
      ['s1','s2','b3','b4']
    timelineRevised:
      ['s1','s2','t3','t5','t6']
    activeTrack:
      'timelineRevised'
    nodes:
      active: () -> states[4].nodes[4]
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
        position: 't5'
      5:
        state: 'off'
        position: 't6'
    buffer: """
    1955, November 5th
        Marty McFly is hit by a car.
        Lorraine Baines nurses Marty, and thinks he's cute.

    1955, November 12th
        Lighting strikes the clocktower at 10.04pm
    """
  5:
    timelineOriginal:
      ['s1','s2','b3','b4']
    timelineRevised:
      ['s1','s2','t3','t5','t6']
    activeTrack:
      'timelineRevised'
    nodes:
      active: () -> states[5].nodes[5]
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
        state: 'off'
        position: 't5'
      5:
        state: 'on'
        position: 't6'
    buffer: """
    1955, November 5th
        Marty McFly is hit by a car.
        Lorraine Baines nurses Marty, and thinks he's cute.

    1955, November 12th
        Marty Mcfly takes Lorraine Baines to the dance, and they kiss.
        Marty McFly invents Rock and Roll
        George McFly and Loraine Baines kiss.
        Lightning strikes the clocktower at 10.04pm
    """

story =
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
      ['s1','s2']
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
        state: 'unborn'
        position: 's2'
      3:
        state: 'unborn'
        position: 's2'
      4:
        state: 'unborn'
        position: 's2'
      5:
        state: 'unborn'
        position: 's2'
  1:
    timelineOriginal:
      ['s1','s2','s3']
    timelineRevised:
      ['s1','s2']
    activeTrack:
      'timelineOriginal'
    nodes:
      active: () -> states[1].nodes[2]
      0:
        state: 'off'
        position: 's1'
      1:
        state: 'off'
        position: 's2'
      2:
        state: 'on'
        position: 's3'
      3:
        state: 'unborn'
        position: 's3'
      4:
        state: 'unborn'
        position: 's3'
      5:
        state: 'unborn'
        position: 's3'
  2:
    timelineOriginal:
      ['s1','s2','s3','s4']
    timelineRevised:
      ['s1','s2']
    activeTrack:
      'timelineOriginal'
    nodes:
      active: () -> states[2].nodes[3]
      0:
        state: 'off'
        position: 's1'
      1:
        state: 'off'
        position: 's2'
      2:
        state: 'off'
        position: 's3'
      3:
        state: 'on'
        position: 's4'
      4:
        state: 'unborn'
        position: 's4'
      5:
        state: 'unborn'
        position: 's4'
  3:
    timelineOriginal:
      ['s1','s2','s3','s4']
    timelineRevised:
      ['s1','s2']
    activeTrack:
      'timelineOriginal'
    nodes:
      active: () -> states[3].nodes[2]
      0:
        state: 'off'
        position: 's1'
      1:
        state: 'off'
        position: 's2'
      2:
        state: 'on'
        position: 's3'
      3:
        state: 'off'
        position: 's4'
      4:
        state: 'unborn'
        position: 's3'
      5:
        state: 'unborn'
        position: 's3'
  4:
    timelineOriginal:
      ['s1','s2','s3','s4']
    timelineRevised:
      ['s1','s2']
    activeTrack:
      'timelineOriginal'
    nodes:
      active: () -> states[4].nodes[1]
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
        position: 's2'
      5:
        state: 'unborn'
        position: 's2'
  5:
    timelineOriginal:
      ['s1','s2','b3','b4']
    timelineRevised:
      ['s1','s2','t3']
    activeTrack:
      'timelineRevised'
    nodes:
      active: () -> states[5].nodes[4]
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
      5:
        state: 'unborn'
        position: 't3'
  6:
    timelineOriginal:
      ['s1','s2','b3','b4']
    timelineRevised:
      ['s1','s2','t3','t4']
    activeTrack:
      'timelineRevised'
    nodes:
      active: () -> states[6].nodes[5]
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
        state: 'off'
        position: 't3'
      5:
        state: 'on'
        position: 't4'
  7:
    timelineOriginal:
      ['s1','s2','b3','b4']
    timelineRevised:
      ['s1','s2','t3','t4']
    activeTrack:
      'timelineRevised'
    nodes:
      active: () -> states[7].nodes[4]
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
      5:
        state: 'off'
        position: 't4'
  8:
    timelineOriginal:
      ['s1','s2','b3','b4']
    timelineRevised:
      ['s1','s2','t3','t4']
    activeTrack:
      'timelineRevised'
    nodes:
      active: () -> states[8].nodes[1]
      0:
        state: 'off'
        position: 's1'
      1:
        state: 'on'
        position: 's2'
      2:
        state: 'off'
        position: 'b3'
      3:
        state: 'off'
        position: 'b4'
      4:
        state: 'off'
        position: 't3'
      5:
        state: 'off'
        position: 't4'
  9:
    timelineOriginal:
      ['s1','s2','b3','b4']
    timelineRevised:
      ['s1','s2','t3','t4']
    activeTrack:
      'timelineRevised'
    nodes:
      active: () -> states[8].nodes[4]
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
      5:
        state: 'off'
        position: 't4'

states = story
states = playback

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
    coords[state.nodes.active().position].x,
    coords[state.nodes.active().position].y,
    radius
  ).attr(graphics.onNodeAttributes)


drawState = () ->
  state = states.active()
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
    cx: coords[state.nodes.active().position].x
    cy: coords[state.nodes.active().position].y
  }, animationPeriod, "<>")


transitionStates = () ->
  raphael.clear()
  current = states.active()
  previous = states.previous()
  transitionTimelines(current, previous)
  transitionActiveTimeline(current, previous)
  transitionAllNodes(current, previous)
  transitionActiveNode(current, previous)
  updateBufferContents()

updateBufferContents = () ->
  current = states.active()
  $("#vim-history-buffer code pre").html(current.buffer)

undo = () ->
  earlier() # TODO: implement this!

redo = () ->
  later()   # TODO: implement this!

earlier = () ->
  states.reverse()
  transitionStates()
  return false

later = () ->
  states.advance()
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

