describe "Chronolog", ->

  logOne = logTwo = null

  beforeEach ->
    Chronolog.reset()
    logOne = new Chronolog
      coordinates: 's1'
    logTwo = new Chronolog
      coordinates: 's2'

  describe "Class", ->
    describe "instances", ->
      it "maintains a record of all instances", ->
        expect(Chronolog.instances).toEqual [logOne, logTwo]

  describe "object", ->
    describe "coordinates", ->
      it "returns its coordinates", ->
        expect(logOne.coordinates).toEqual 's1'
    describe "next()", ->
      it "returns following instance if there is one", ->
        expect(logOne.next()).toEqual logTwo
      it "returns 'undefined' if there is no follower", ->
        expect(logTwo.next()).toEqual undefined
    describe "prev()", ->
      it "returns previous instance if there is one", ->
        expect(logTwo.prev()).toEqual logOne
      it "returns 'undefined' if there is no predecessor", ->
        expect(logOne.prev()).toEqual undefined
