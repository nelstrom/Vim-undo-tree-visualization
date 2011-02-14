describe "Graphnode", ->
  origin = nodeOne = nodeTwo = nodeThree = nodeFour = nodeFive = null
  beforeEach ->
    Graphnode.reset()
    origin = new Graphnode()           # 0
    nodeOne = new Graphnode(origin)    # 1
    nodeTwo = new Graphnode(nodeOne)   # 2
    nodeThree = new Graphnode(nodeTwo) # 3
    nodeFour = new Graphnode(nodeOne)  # 4
    nodeFive = new Graphnode(nodeFour) # 5

  it "has access to jQuery", ->
    expect($).toEqual(jQuery)

  describe "Class", ->
    it "keeps track of no of nodes", ->
      expect(Graphnode.count).toEqual 6
    describe "@roots", ->
      it "returns id of root node", ->
        expect(Graphnode.roots).toEqual [0]
      it "returns ids of root nodes", ->
        new Graphnode()
        expect(Graphnode.roots).toEqual [0,6]
    describe "@leafs", ->
      it "returns ids of leaf nodes", ->
        expect(Graphnode.leafs).toEqual [3,5]
      it "updates when new leaf node is added", ->
        new Graphnode(nodeFive)
        expect(Graphnode.leafs).toEqual [3,6]
    describe "@nodes", ->
      it "maintains a list of nodes, indexed by id", ->
        expect(Graphnode.nodes[0]).toEqual origin
        expect(Graphnode.nodes[1]).toEqual nodeOne
        expect(Graphnode.nodes[2]).toEqual nodeTwo
    describe "reset()", ->
      it "resets the node count", ->
        Graphnode.reset()
        expect(Graphnode.count).toEqual 0
      it "empties the list of leafs", ->
        Graphnode.reset()
        expect(Graphnode.leafs.length).toEqual 0
      it "empties the list of roots", ->
        Graphnode.reset()
        expect(Graphnode.roots.length).toEqual 0

  describe "object", ->
    describe "isOrigin()", ->
      it "is true for origin nodes", ->
        expect(origin.isOrigin()).toEqual true
      it "is false for child nodes", ->
        expect(nodeTwo.isOrigin()).toEqual false
    describe "myPath()", ->
      it "returns a list containing id for each ancestor", ->
        expect(origin.myPath()).toEqual [0]
      it "returns a list containing id for each ancestor", ->
        expect(nodeThree.myPath()).toEqual [0,1,2,3]
      it "returns a list containing id for each ancestor", ->
        expect(nodeFive.myPath()).toEqual [0,1,4,5]
