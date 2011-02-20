describe "Timeline", ->

  one = two = three = four = five = six = null
  trackA = trackB = null

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
    trackA = new Timeline
      chronologs: [one, two, three, four]
      coordinates: 's1,s2,b3,b4'
    trackB = new Timeline
      chronologs: [one, two, five, six]
      coordinates: 's1,s2,t3,t5,t6'

  describe "Class", ->
    describe "instances", ->
      it "maintains a record of all instances", ->
        expect(Timeline.instances).toEqual [trackA, trackB]

    describe "currentTrack", ->
      it "returns the currently active timeline", ->
        expect(Timeline.currentTrack()).toEqual trackA

    describe "currentChronolog", ->
      it "returns the currently active chronolog", ->
        expect(Timeline.currentChronolog()).toEqual one
    describe "advance()", ->
      describe "chronologically", ->
        it "keeps to current track if it can (1a -> 2a)", ->
          Timeline.currentTrackIndex     = 0 # trackA
          Chronolog.activeChronologIndex = 0 # one
          Timeline.advance('chronological')
          expect(Timeline.currentTrackIndex).toEqual(0)
          expect(Chronolog.activeChronologIndex).toEqual(1)
        it "keeps to current track if it can (1b -> 2b)", ->
        it "switches track if it must (2b -> 3a)", ->
        it "switches track if it must (4a -> 5b)", ->
      describe "on track", ->

    describe "reverse", ->
      describe "chronologically", ->
      describe "on track", ->

  describe "object", ->
    describe "coordinates", ->
      it "returns its coordinates as an array", ->
        expect(trackA.coordinates).toEqual ['s1','s2','b3','b4']
        expect(trackB.coordinates).toEqual ['s1','s2','t3','t5','t6']

    describe "chronologs", ->
      it "returns a list of chronologs", ->
        expect(trackA.chronologs).toEqual [one, two, three, four]

