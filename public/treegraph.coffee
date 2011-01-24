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

generatePath = (origin, coordinates...) ->
  points = ["M #{coords[origin].x} #{coords[origin].y}"]
  for point in coordinates
    points.push("L #{coords[point].x} #{coords[point].y}")
  points.join("")

jQuery($ =>
  paper = Raphael("notepad", totalWidth, totalHeight)

  longStraightLine = ['s1','s2','s3','s4']
  shortStraightLine = ['s1','s2']
  topBranchedLine = ['s1','s2','t3']
  bottomBranchedLine = ['s1','s2','b3','b4']
  lineAttributes =
    "stroke": "#008"
    "stroke-width": lineThickness
    "stroke-linecap": "butt"
    "stroke-linejoin": "miter"
  topline = paper.path(generatePath(shortStraightLine...)).attr(lineAttributes)
  bottomline = paper.path(generatePath(longStraightLine...)).attr(lineAttributes)
  topline.animate({path: generatePath(topBranchedLine...)}, animationPeriod)
  bottomline.animate({path: generatePath(bottomBranchedLine...)}, animationPeriod)

  #for point in ['s1','s2','s3','s4','s5','s6','t3','t4','t5','t6','b3','b4']
    #circle = paper.circle(coords[point].x, coords[point].y, radius)
)

