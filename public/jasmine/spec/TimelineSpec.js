(function() {
  describe("Timeline", function() {
    var trackOne, trackTwo;
    trackOne = trackTwo = null;
    beforeEach(function() {
      var five, four, one, six, three, two;
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
      return describe("instances", function() {
        return it("maintains a record of all instances", function() {
          return expect(Timeline.instances).toEqual([trackOne, trackTwo]);
        });
      });
    });
    return describe("object", function() {
      describe("coordinates", function() {
        return it("returns its coordinates as an array", function() {
          expect(trackOne.coordinates).toEqual(['s1', 's2', 'b3', 'b4']);
          return expect(trackTwo.coordinates).toEqual(['s1', 's2', 't3', 't5', 't6']);
        });
      });
      describe("next()", function() {
        it("returns following instance if there is one", function() {
          return expect(trackOne.next()).toEqual(trackTwo);
        });
        return it("returns 'undefined' if there is no follower", function() {
          return expect(trackTwo.next()).toEqual(void 0);
        });
      });
      return describe("prev()", function() {
        it("returns previous instance if there is one", function() {
          return expect(trackTwo.prev()).toEqual(trackOne);
        });
        return it("returns 'undefined' if there is no predecessor", function() {
          return expect(trackOne.prev()).toEqual(void 0);
        });
      });
    });
  });
}).call(this);
