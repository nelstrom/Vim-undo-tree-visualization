window.onload = function() {  
  
  var paper = Raphael(document.getElementById("notepad"), 320, 200);
  var circle = paper.circle(50, 40, 10);
  circle.attr("fill", "#f00");
  circle.attr("stroke", "#fff");
}  
