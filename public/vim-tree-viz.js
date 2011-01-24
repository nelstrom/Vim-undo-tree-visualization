//TODO move these out of global namespace!
var canvasWidth = 640,
    canvasHeight = 480,
    canvasMargin = 90,
    noOfStates = 6,
    availableHeight = canvasHeight - (canvasMargin * 2),
    availableWidth  = canvasWidth  - (canvasMargin * 2),
    lineLength = (availableWidth / (noOfStates-1)),
    sixtyDegrees = (Math.PI / 3),
    radius = 15,
    lineThickness = 10,
    innerLineThickness = 6,
    outline, paper, coords, chronologicalCoords, topBranchCoords,
    bottomBranchCoords, topFork, bottomFork, topMix, bottomMix, chronological;

coords = {
  s1: {x: 0, y: 0},
  s2: {x: 0, y: 0},
  s3: {x: 0, y: 0},
  s4: {x: 0, y: 0},
  s5: {x: 0, y: 0},
  s6: {x: 0, y: 0},

  t3: {x: 0, y: 0},
  t4: {x: 0, y: 0},
  t5: {x: 0, y: 0},
  t6: {x: 0, y: 0},

  b3: {x: 0, y: 0},
  b4: {x: 0, y: 0}
};


coords.s1.x = canvasMargin;
coords.s1.y = canvasMargin + (availableHeight/2);

coords.s2.x = coords.s1.x + (lineLength*1);
coords.s3.x = coords.s1.x + (lineLength*2);
coords.s4.x = coords.s1.x + (lineLength*3);
coords.s5.x = coords.s1.x + (lineLength*4);
coords.s6.x = coords.s1.x + (lineLength*5);

coords.s2.y = coords.s1.y;
coords.s3.y = coords.s1.y;
coords.s4.y = coords.s1.y;
coords.s5.y = coords.s1.y;
coords.s6.y = coords.s1.y;

coords.t3.x = coords.s2.x + (lineLength * Math.cos(sixtyDegrees));
coords.t3.y = coords.s2.y - (lineLength * Math.sin(sixtyDegrees));
coords.t4.x = coords.t3.x + (lineLength*1);
coords.t4.y = coords.t3.y;
coords.t5.x = coords.t4.x + (lineLength*1);
coords.t5.y = coords.t4.y;
coords.t6.x = coords.t5.x + (lineLength*1);
coords.t6.y = coords.t5.y;

coords.b3.x = coords.s2.x + (lineLength * Math.cos(sixtyDegrees));
coords.b3.y = coords.s2.y + (lineLength * Math.sin(sixtyDegrees));
coords.b4.x = coords.b3.x + (lineLength*1);
coords.b4.y = coords.b3.y;

chronologicalCoords = [
  {x: coords.s1.x, y: coords.s1.y},
  {x: coords.s2.x, y: coords.s2.y},
  {x: coords.s3.x, y: coords.s3.y},
  {x: coords.s4.x, y: coords.s4.y},
  {x: coords.s5.x, y: coords.s5.y},
  {x: coords.s6.x, y: coords.s6.y}
];

topBranchCoords = [
  {x: coords.s1.x, y: coords.s1.y},
  {x: coords.s2.x, y: coords.s2.y},
  {x: coords.t3.x, y: coords.t3.y},
  {x: coords.t4.x, y: coords.t4.y},
  {x: coords.t5.x, y: coords.t5.y},
  {x: coords.t6.x, y: coords.t6.y}
];

bottomBranchCoords = [
  {x: coords.s1.x, y: coords.s1.y},
  {x: coords.s2.x, y: coords.s2.y},
  {x: coords.b3.x, y: coords.b3.y},
  {x: coords.b4.x, y: coords.b4.y}
];

topFork = {
  values: ['circle', 'circle', 'circle', 'circle'],
  coords: topBranchCoords
};
bottomFork = {
  values: ['circle', 'circle', 'circle', 'circle'],
  coords: bottomBranchCoords
};
topMix = {
  values: ['circle','circle','point','point','circle','circle'],
  coords: topBranchCoords
};
bottomMix = {
  values: ['circle', 'circle', 'circle', 'circle'],
  coords: bottomBranchCoords
};
chronological = {
  values: ['circle', 'circle', 'circle', 'circle', 'circle', 'circle'],
  coords: chronologicalCoords
};



$(document).ready(function() {

  $("#notepad").after("<button id='nextButton'>next</button>");
  $("#notepad").after("<button id='prevButton'>previous</button>");
  $("#nextButton").click(advance);
  $("#prevButton").click(reverse);

  paper = Raphael(document.getElementById("notepad"), canvasWidth, canvasHeight);

  //outline = chronological;
  outline = topMix;
  //outline = bottomMix;
  //outline = topFork;
  coordList = outline.coords;

  pathString = "";
  var circles = [];
  var i;
  for (i = 0; i < coordList.length; i++) {
    var cod = coordList[i];

    if (i === 0) {
      pathString = "M" + cod.x + " " + cod.y;
    } else if (i < outline.values.length) {
      pathString = pathString + "L" + cod.x + " " + cod.y + " ";
    }
    if (outline.values[i] === 'circle') {
      circles.push({x: cod.x, y: cod.y});
    }
  }

  var c = paper.path(pathString);
  c.attr({
    "stroke": "#008",
    "stroke-width": lineThickness,
    "stroke-linecap": "butt",
    "stroke-linejoin": "miter"
  });
  c = paper.path(pathString);
  c.attr({
    "stroke": "#fff",
    "stroke-width": innerLineThickness,
    "stroke-linecap": "butt",
    "stroke-linejoin": "miter"
  });
  for (i = 0; i < circles.length; i++) {
    c = circles[i];
    circle = paper.circle(c.x, c.y, radius);
    circle.attr({
      "fill": "#fff",
      "stroke": "#000"
    });
  }
});

function advance () {
  console.log('advance');
}
function reverse () {
  console.log('reverse');
}
