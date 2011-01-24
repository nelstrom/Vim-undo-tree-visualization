#Canvas attributes
totalWidth = 640
totalHeight = 480
margin = 90
availableHeight = totalHeight - (margin * 2)
availableWidth  = totalWidth  - (margin * 2)

# Graph attributes
nodeCount = 6
lineLength = (availableWidth / (nodeCount-1))
forkAngle = (Math.PI / 3)
radius = 15
animationPeriod = 500
lineThinness = 5
lineThickness = 8

# Workhorse parameters
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
    "stroke": "#008"
    "stroke-width": lineThickness
    "stroke-linecap": "butt"
    "stroke-linejoin": "miter"
  thinLineAttributes:
    "stroke": "#fff"
    "stroke-width": lineThinness
    "stroke-linecap": "butt"
    "stroke-linejoin": "miter"
  offNodeAttributes:
    "fill": "#fff"
    "stroke": "#000"

states =
  active: 1
  1:
    timelineOriginal:
      ['s1','s2','s3','s4']
    timelineRevised:
      ['s1','s2']
    activeTrack:
      'timelineOriginal'
    nodes:
      1:
        state: 'off'
        position: 's1'
      2:
        state: 'on'
        position: 's2'
      3:
        state: 'off'
        position: 's3'
      4:
        state: 'off'
        position: 's4'
      5:
        state: 'unborn'
        position: 's5'
  2:
    timelineOriginal:
      ['s1','s2','b3','b4']
    timelineRevised:
      ['s1','s2','t3']
    activeTrack:
      'timelineRevised'
    nodes:
      1:
        state: 'off'
        position: 's1'
      2:
        state: 'off'
        position: 's2'
      3:
        state: 'off'
        position: 'b3'
      4:
        state: 'off'
        position: 'b4'
      5:
        state: 'on'
        position: 't3'

# Utility methods
generatePath = (origin, coordinates...) ->
  points = ["M #{coords[origin].x} #{coords[origin].y}"]
  for point in coordinates
    points.push("L #{coords[point].x} #{coords[point].y}")
  points.join("")

drawState = (raphael) ->
  state = states[1]
  state = states[2]

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

  activeTrack = state.activeTrack
  graphics.activeTimeline = raphael.path(
    generatePath(state[activeTrack]...)
  ).attr(graphics.thickLineAttributes)

  for num in [1..5]
    node = state.nodes[num]
    activeNode = node if node.state is 'on'
    disc = raphael.circle(
      coords[node.position].x,
      coords[node.position].y,
      radius
    ).attr(graphics.offNodeAttributes)
    graphics.nodes.push(disc)

jQuery($ =>
  paper = Raphael("notepad", totalWidth, totalHeight)
  drawState(paper)

  #longStraightLine = ['s1','s2','s3','s4']
  #shortStraightLine = ['s1','s2']
  #topBranchedLine = ['s1','s2','t3']
  #bottomBranchedLine = ['s1','s2','b3','b4']
  #lineAttributes =
    #"stroke": "#008"
    #"stroke-width": lineThickness
    #"stroke-linecap": "butt"
    #"stroke-linejoin": "miter"

  #topline = paper.path(generatePath(shortStraightLine...)).attr(lineAttributes)
  #bottomline = paper.path(generatePath(longStraightLine...)).attr(lineAttributes)
  #topline.animate({path: generatePath(topBranchedLine...)}, animationPeriod)
  #bottomline.animate({path: generatePath(bottomBranchedLine...)}, animationPeriod)

  #for point in ['s1','s2','s3','s4','s5','s6','t3','t4','t5','t6','b3','b4']
    #circle = paper.circle(coords[point].x, coords[point].y, radius)

)

