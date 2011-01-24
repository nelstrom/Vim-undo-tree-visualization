Here's a function that takes splat arguments:

    generatePath = (origin, coordinates...) ->
      points = ["M #{coords[origin].x} #{coords[origin].y}"]
      for point in coordinates
        points.push("L #{coords[point].x} #{coords[point].y}")
      points.join("")

Calling the function is a little confusing at first. These don't work:

    hexagon = ['s2','t3','t4','s4','b4','b3','s2']
    c = paper.path(generatePath(hexagon))

    c = paper.path(generatePath(['s2','t3','t4','s4','b4','b3','s2']))

But all of the following all work:

    hexagon = ['s2','t3','t4','s4','b4','b3','s2']
    c = paper.path(generatePath(hexagon...))

    c = paper.path(generatePath('s2','t3','t4','s4','b4','b3','s2'))

    c = paper.path(generatePath(['s2','t3','t4','s4','b4','b3','s2']...))

    hexagon = ['s2','t3','t4','s4','b4','b3','s2']...
    c = paper.path(generatePath(hexagon))

