var timestamples = {
	simple: [
		{"time":0,"slide":1},
		{"time":4,"slide":2,"keycode":39},
		{"time":7.5,"slide":3,"keycode":39},
	],
	twoStepsForwardOneBack: [
		{"time":0,"slide":1},
		{"time":4,"slide":2,"keycode":39},
		{"time":7.5,"slide":3,"keycode":39},
		{"time":10,"slide":2,"keycode":37},
		{"time":12.5,"slide":3,"keycode":39},
		{"time":15,"slide":4,"keycode":39},
	],
	strayKeyPresses: [
		{"time":0,"slide":1},
		// rightArrow, downArrow and pageDown advance
		{"time":1,"slide":2,"keycode":39},
		{"time":2,"slide":3,"keycode":40},
		{"time":3,"slide":4,"keycode":34},
		// random keypresses should be ignored
		{"time":4,"slide":4,"keycode":20},
		{"time":5,"slide":4,"keycode":50},
		{"time":6,"slide":4,"keycode":100},
		// leftArrow, upArrow and pageDown advance
		{"time":7,"slide":3,"keycode":37},
		{"time":8,"slide":2,"keycode":38},
		{"time":9,"slide":1,"keycode":33},
	]
}

function leftArrow()  { return keydownEvent(37); };
function upArrow()    { return keydownEvent(38); };
function pageUp()     { return keydownEvent(33); };
function rightArrow() { return keydownEvent(39); };
function downArrow()  { return keydownEvent(40); };
function pageDown()   { return keydownEvent(34); };

function keydownEvent(keycode) {
	var e = jQuery.Event("keydown");
	e.keyCode = keycode;
	return e;
};

beforeEach(function() {
  this.addMatchers({
    toBePlaying: function(expectedSong) {
      var player = this.actual;
      return player.currentlyPlayingSong === expectedSong
          && player.isPlaying;
    }
  })
});
