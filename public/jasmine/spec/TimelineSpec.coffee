describe "Timeline", ->

  one = two = three = four = five = six = null
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

    describe "currentTrack", ->
      it "returns the currently active timeline", ->
        expect(Timeline.currentTrack()).toEqual trackOne

    describe "currentChronolog", ->
    describe "nextChronolog", ->
    describe "prevChronolog", ->

  describe "object", ->
    describe "coordinates", ->
      it "returns its coordinates as an array", ->
        expect(trackOne.coordinates).toEqual ['s1','s2','b3','b4']
        expect(trackTwo.coordinates).toEqual ['s1','s2','t3','t5','t6']

    describe "chronologs", ->
      it "returns a list of chronologs", ->
        expect(trackOne.chronologs).toEqual [one, two, three, four]

