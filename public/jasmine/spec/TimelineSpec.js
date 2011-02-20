(function() {
  describe("Timeline", function() {
    var five, four, one, six, three, trackOne, trackTwo, two;
    one = two = three = four = five = six = null;
    trackOne = trackTwo = null;
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
      trackOne = new Timeline({
        chronologs: [one, two, three, four],
        coordinates: 's1,s2,b3,b4'
      });
      return trackTwo = new Timeline({
        chronologs: [one, two, five, six],
        coordinates: 's1,s2,t3,t5,t6'
      });
    });
    describe("Class", function() {
      describe("instances", function() {
        return it("maintains a record of all instances", function() {
          return expect(Timeline.instances).toEqual([trackOne, trackTwo]);
        });
      });
      describe("currentTrack", function() {
        return it("returns the currently active timeline", function() {
          return expect(Timeline.currentTrack()).toEqual(trackOne);
        });
      });
      describe("currentChronolog", function() {});
      describe("nextChronolog", function() {});
      return describe("prevChronolog", function() {});
    });
    return describe("object", function() {
      describe("coordinates", function() {
        return it("returns its coordinates as an array", function() {
          expect(trackOne.coordinates).toEqual(['s1', 's2', 'b3', 'b4']);
          return expect(trackTwo.coordinates).toEqual(['s1', 's2', 't3', 't5', 't6']);
        });
      });
      return describe("chronologs", function() {
        return it("returns a list of chronologs", function() {
          return expect(trackOne.chronologs).toEqual([one, two, three, four]);
        });
      });
    });
  });
}).call(this);
