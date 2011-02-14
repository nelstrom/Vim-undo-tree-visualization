(function() {
  describe("DocumentState", function() {
    describe("timelineOriginal", function() {});
    return it("returns a list", function() {
      var state;
      state = new DocumentState();
      return expect(state.timelineOriginal).toEqual(['s1', 's2', 's3', 's4']);
    });
  });
}).call(this);
