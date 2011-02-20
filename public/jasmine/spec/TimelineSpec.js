(function() {
  describe("Timeline", function() {
    var five, four, one, six, three, trackA, trackB, two;
    one = two = three = four = five = six = null;
    trackA = trackB = null;
    beforeEach(function() {
      Chronolog.reset();
      one = new Chronolog({
        coordinates: 's1'
      });
      two = new Chronolog({
        coordinates: 's2'
      });
      three = new Chronolog({
        coordinates: 'b3'
      });
      four = new Chronolog({
        coordinates: 'b4'
      });
      five = new Chronolog({
        coordinates: 't5'
      });
      six = new Chronolog({
        coordinates: 't6'
      });
      Timeline.reset();
      trackA = new Timeline({
        chronologs: [one, two, three, four],
        coordinates: 's1,s2,b3,b4'
      });
      return trackB = new Timeline({
        chronologs: [one, two, five, six],
        coordinates: 's1,s2,t3,t5,t6'
      });
    });
    describe("Class", function() {
      describe("instances", function() {
        return it("maintains a record of all instances", function() {
          return expect(Timeline.instances).toEqual([trackA, trackB]);
        });
      });
      describe("currentTrack", function() {
        return it("returns the currently active timeline", function() {
          return expect(Timeline.currentTrack()).toEqual(trackA);
        });
      });
      describe("currentChronolog", function() {
        return it("returns the currently active chronolog", function() {
          return expect(Timeline.currentChronolog()).toEqual(one);
        });
      });
      describe("advance()", function() {
        describe("chronologically", function() {
          it("keeps to current track if it can (1a -> 2a)", function() {
            Timeline.currentTrackIndex = 0;
            Chronolog.activeChronologIndex = 0;
            Timeline.advance('chronological');
            expect(Timeline.currentTrack()).toEqual(trackA);
            return expect(Chronolog.active()).toEqual(two);
          });
          it("keeps to current track if it can (1b -> 2b)", function() {
            Timeline.currentTrackIndex = 1;
            Chronolog.activeChronologIndex = 0;
            Timeline.advance('chronological');
            expect(Timeline.currentTrack()).toEqual(trackB);
            return expect(Chronolog.active()).toEqual(two);
          });
          it("switches track if it must (2b -> 3a)", function() {
            Timeline.currentTrackIndex = 1;
            Chronolog.activeChronologIndex = 1;
            Timeline.advance('chronological');
            expect(Timeline.currentTrack()).toEqual(trackA);
            return expect(Chronolog.active()).toEqual(three);
          });
          return it("switches track if it must (4a -> 5b)", function() {
            Timeline.currentTrackIndex = 2;
            Chronolog.activeChronologIndex = 3;
            Timeline.advance('chronological');
            expect(Timeline.currentTrack()).toEqual(trackB);
            return expect(Chronolog.active()).toEqual(five);
          });
        });
        return describe("on track", function() {});
      });
      return describe("reverse", function() {
        describe("chronologically", function() {});
        return describe("on track", function() {});
      });
    });
    return describe("object", function() {
      describe("coordinates", function() {
        return it("returns its coordinates as an array", function() {
          expect(trackA.coordinates).toEqual(['s1', 's2', 'b3', 'b4']);
          return expect(trackB.coordinates).toEqual(['s1', 's2', 't3', 't5', 't6']);
        });
      });
      return describe("chronologs", function() {
        return it("returns a list of chronologs", function() {
          return expect(trackA.chronologs).toEqual([one, two, three, four]);
        });
      });
    });
  });
}).call(this);
