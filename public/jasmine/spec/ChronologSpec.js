(function() {
  describe("Chronolog", function() {
    var logOne, logTwo;
    logOne = logTwo = null;
    beforeEach(function() {
      logOne = new Chronolog({
        coordinates: 's1'
      });
      return logTwo = new Chronolog({
        coordinates: 's2'
      });
    });
    describe("Class", function() {
      return describe("instances", function() {
        return it("maintains a record of all instances", function() {
          return expect(Chronolog.instances).toEqual([logOne, logTwo]);
        });
      });
    });
    return describe("object", function() {
      return describe("coordinates", function() {
        return it("returns its coordinates", function() {
          return expect(logOne.coordinates).toEqual('s1');
        });
      });
    });
  });
}).call(this);
