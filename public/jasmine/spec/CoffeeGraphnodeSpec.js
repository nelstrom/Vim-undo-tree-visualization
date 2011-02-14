(function() {
  describe("Graphnode", function() {
    var nodeFive, nodeFour, nodeOne, nodeThree, nodeTwo, origin;
    origin = nodeOne = nodeTwo = nodeThree = nodeFour = nodeFive = null;
    beforeEach(function() {
      Graphnode.reset();
      origin = new Graphnode();
      nodeOne = new Graphnode(origin);
      nodeTwo = new Graphnode(nodeOne);
      nodeThree = new Graphnode(nodeTwo);
      nodeFour = new Graphnode(nodeOne);
      return nodeFive = new Graphnode(nodeFour);
    });
    it("has access to jQuery", function() {
      return expect($).toEqual(jQuery);
    });
    describe("Class", function() {
      it("keeps track of no of nodes", function() {
        return expect(Graphnode.count).toEqual(6);
      });
      describe("@roots", function() {
        it("returns id of root node", function() {
          return expect(Graphnode.roots).toEqual([0]);
        });
        return it("returns ids of root nodes", function() {
          new Graphnode();
          return expect(Graphnode.roots).toEqual([0, 6]);
        });
      });
      describe("@leafs", function() {
        it("returns ids of leaf nodes", function() {
          return expect(Graphnode.leafs).toEqual([3, 5]);
        });
        return it("updates when new leaf node is added", function() {
          new Graphnode(nodeFive);
          return expect(Graphnode.leafs).toEqual([3, 6]);
        });
      });
      describe("@nodes", function() {
        return it("maintains a list of nodes, indexed by id", function() {
          expect(Graphnode.nodes[0]).toEqual(origin);
          expect(Graphnode.nodes[1]).toEqual(nodeOne);
          return expect(Graphnode.nodes[2]).toEqual(nodeTwo);
        });
      });
      return describe("reset()", function() {
        it("resets the node count", function() {
          Graphnode.reset();
          return expect(Graphnode.count).toEqual(0);
        });
        it("empties the list of leafs", function() {
          Graphnode.reset();
          return expect(Graphnode.leafs.length).toEqual(0);
        });
        return it("empties the list of roots", function() {
          Graphnode.reset();
          return expect(Graphnode.roots.length).toEqual(0);
        });
      });
    });
    return describe("object", function() {
      describe("isOrigin()", function() {
        it("is true for origin nodes", function() {
          return expect(origin.isOrigin()).toEqual(true);
        });
        return it("is false for child nodes", function() {
          return expect(nodeTwo.isOrigin()).toEqual(false);
        });
      });
      return describe("myPath()", function() {
        it("returns a list containing id for each ancestor", function() {
          return expect(origin.myPath()).toEqual([0]);
        });
        it("returns a list containing id for each ancestor", function() {
          return expect(nodeThree.myPath()).toEqual([0, 1, 2, 3]);
        });
        return it("returns a list containing id for each ancestor", function() {
          return expect(nodeFive.myPath()).toEqual([0, 1, 4, 5]);
        });
      });
    });
  });
}).call(this);
