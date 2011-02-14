(function() {
  describe("DocumentState", function() {
    var state;
    state = new DocumentState({
      timelineOriginal: {
        points: 's1,s2,s3,s4'
      }
    });
    describe("timelineOriginal", function() {});
    return it("returns a list", function() {
      return expect(state.timelineOriginal).toEqual(['s1', 's2', 's3', 's4']);
    });
  });
}).call(this);
