describe "Timeline", ->

  trackOne = trackTwo = null

  beforeEach ->
    Chronolog.reset()
    one = new Chronolog
      coordinates: 's1'
    two = new Chronolog
      coordinates: 's2'
    three = new Chronolog
      coordinates: 'b3'
    four = new Chronolog
      coordinates: 'b4'
    five = new Chronolog
      coordinates: 't5'
    six = new Chronolog
      coordinates: 't6'

    Timeline.reset()
    trackOne = new Timeline
      chronologs: [one, two, three, four]
      coordinates: 's1,s2,b3,b4'
    trackTwo = new Timeline
      chronologs: [one, two, five, six]
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

