describe "Timeline", ->

  trackOne = trackTwo = null

  beforeEach ->
    Timeline.reset()
    trackOne = new Timeline
      coordinates: 's1,s2,b3,b4'
    trackTwo = new Timeline
      coordinates: 's1,s2,t3,t5,t6'

  describe "Class", ->
    describe "instances", ->
      it "maintains a record of all instances", ->
        expect(Timeline.instances).toEqual [trackOne, trackTwo]

  describe "object", ->
    describe "coordinates", ->
      it "returns its coordinates as an array", ->
        expect(trackOne.coordinates).toEqual ['s1','s2','b3','b4']
        expect(trackTwo.coordinates).toEqual ['s1','s2','t3','t5','t6']
    describe "next()", ->
      it "returns following instance if there is one", ->
        expect(trackOne.next()).toEqual trackTwo
      it "returns 'undefined' if there is no follower", ->
        expect(trackTwo.next()).toEqual undefined
    describe "prev()", ->
      it "returns previous instance if there is one", ->
        expect(trackTwo.prev()).toEqual trackOne
      it "returns 'undefined' if there is no predecessor", ->
        expect(trackOne.prev()).toEqual undefined

