(function() {
  describe("Chronolog", function() {
    var logOne, logTwo;
    logOne = logTwo = null;
    beforeEach(function() {
      Chronolog.reset();
      logOne = new Chronolog({
        coordinates: 's1'
      });
      return logTwo = new Chronolog({
        coordinates: 's2'
      });
    });
    describe("Class", function() {
      describe("instances", function() {
        return it("maintains a record of all instances", function() {
          return expect(Chronolog.instances).toEqual([logOne, logTwo]);
        });
      });
      describe("active", function() {
        return it("returns the currently active chronolog", function() {
          return expect(Chronolog.active()).toEqual(logOne);
        });
      });
      describe("advance", function() {
        it("activates the successor", function() {
          Chronolog.advance();
          return expect(Chronolog.active()).toEqual(logTwo);
        });
        return it("does nothing if active chronolog is the last one", function() {
          Chronolog.activeChronologIndex = 1;
          Chronolog.advance();
          return expect(Chronolog.active()).toEqual(logTwo);
        });
      });
      return describe("advance", function() {
        it("activates the predecessor", function() {
          Chronolog.activeChronologIndex = 1;
          Chronolog.reverse();
          return expect(Chronolog.active()).toEqual(logOne);
        });
        return it("does nothing if active chronolog is the first one", function() {
          Chronolog.activeChronologIndex = 0;
          Chronolog.reverse();
          return expect(Chronolog.active()).toEqual(logOne);
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
      describe("prev()", function() {
        it("returns previous instance if there is one", function() {
          return expect(logTwo.prev()).toEqual(logOne);
        });
        return it("returns 'undefined' if there is no predecessor", function() {
          return expect(logOne.prev()).toEqual(void 0);
        });
      });
      describe("activate()", function() {
        return it("turns the caller into the active Chronolog", function() {
          logTwo.activate();
          expect(Chronolog.activeChronologIndex).toEqual(1);
          logOne.activate();
          return expect(Chronolog.activeChronologIndex).toEqual(0);
        });
      });
      return describe("isActive()", function() {
        it("returns true for active item", function() {
          logOne.activate();
          return expect(logOne.isActive()).toEqual(true);
        });
        return it("returns false for inactive item", function() {
          logTwo.activate();
          return expect(logOne.isActive()).toEqual(false);
        });
      });
    });
  });
}).call(this);
