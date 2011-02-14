(function() {
  describe("DocumentState", function() {
    var state;
    state = new DocumentState({
      timelineOriginal: {
        points: 's1,s2,s3,s4'
      },
      timelineRevised: {
        points: 's1,s2,s5,s6'
      }
    });
    describe("timelineOriginal", function() {});
    it("returns a list", function() {
      return expect(state.timelineOriginal).toEqual(['s1', 's2', 's3', 's4']);
    });
    describe("timelineRevised", function() {});
    return it("returns a list", function() {
      return expect(state.timelineRevised).toEqual(['s1', 's2', 's5', 's6']);
    });
  });
}).call(this);
