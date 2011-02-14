(function() {
  describe("DocumentState", function() {
    var start;
    start = new DocumentState();
    return it("has foo property", function() {
      return expect(start.foo).toEqual("bar");
    });
  });
}).call(this);
