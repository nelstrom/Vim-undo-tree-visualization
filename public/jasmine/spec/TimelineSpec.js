(function() {
  describe("Timeline", function() {
    var logOne, logTwo;
    logOne = logTwo = null;
    beforeEach(function() {
      Timeline.reset();
      logOne = new Timeline({
        coordinates: 's1'
      });
      return logTwo = new Timeline({
        coordinates: 's2'
      });
    });
    describe("Class", function() {
      return describe("instances", function() {
        return it("maintains a record of all instances", function() {
          return expect(Timeline.instances).toEqual([logOne, logTwo]);
        });
      });
    });
    return describe("object", function() {
      describe("coordinates", function() {
        return it("returns its coordinates", function() {
          return expect(logOne.coordinates).toEqual('s1');
        });
      });
      describe("next()", function() {
        it("returns following instance if there is one", function() {
          return expect(logOne.next()).toEqual(logTwo);
        });
        return it("returns 'undefined' if there is no follower", function() {
          return expect(logTwo.next()).toEqual(void 0);
        });
      });
      return describe("prev()", function() {
        it("returns previous instance if there is one", function() {
          return expect(logTwo.prev()).toEqual(logOne);
        });
        return it("returns 'undefined' if there is no predecessor", function() {
          return expect(logOne.prev()).toEqual(void 0);
        });
      });
    });
  });
}).call(this);
