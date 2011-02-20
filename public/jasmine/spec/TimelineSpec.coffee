describe "Timeline", ->

  logOne = logTwo = null

  beforeEach ->
    Timeline.reset()
    logOne = new Timeline
      coordinates: 's1'
    logTwo = new Timeline
      coordinates: 's2'

  describe "Class", ->
    describe "instances", ->
      it "maintains a record of all instances", ->
        expect(Timeline.instances).toEqual [logOne, logTwo]

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

