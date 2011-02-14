(function() {
  describe("DocumentState", function() {
    return it("has foo property", function() {
      var state;
      state = new DocumentState();
      return expect(state.foo).toEqual("bar");
    });
  });
}).call(this);
