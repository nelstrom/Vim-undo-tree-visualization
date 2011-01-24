(function() {
  var availableHeight, availableWidth, coords, forkAngle, lineLength, margin, nodeCount, setup, totalHeight, totalWidth;
  totalWidth = 640;
  totalHeight = 480;
  margin = 90;
  availableHeight = totalHeight - (margin * 2);
  availableWidth = totalWidth - (margin * 2);
  nodeCount = 6;
  lineLength = availableWidth / (nodeCount - 1);
  forkAngle = Math.PI / 3;
  coords = {};
  setup = function() {
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
    return coords;
  };
  setup();
  console.log("t4.x: " + coords.t4.x);
  console.log("t4.y: " + coords.t4.y);
}).call(this);
