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
          expect(Timeline.currentTrack()).toEqual(trackA)
          expect(Chronolog.active()).toEqual(two)

        it "keeps to current track if it can (1b -> 2b)", ->
          Timeline.currentTrackIndex     = 1 # trackB
          Chronolog.activeChronologIndex = 0 # one
          Timeline.advance('chronological')
          expect(Timeline.currentTrack()).toEqual(trackB)
          expect(Chronolog.active()).toEqual(two)

        it "switches track if it must (2b -> 3a)", ->
          Timeline.currentTrackIndex     = 1 # trackB
          Chronolog.activeChronologIndex = 1 # two
          Timeline.advance('chronological')
          expect(Timeline.currentTrack()).toEqual(trackA)
          expect(Chronolog.active()).toEqual(three)

        it "switches track if it must (4a -> 5b)", ->
          Timeline.currentTrackIndex     = 0 # trackA
          Chronolog.activeChronologIndex = 3 # four
          Timeline.advance('chronological')
          expect(Timeline.currentTrack()).toEqual(trackB)
          expect(Chronolog.active()).toEqual(five)

      describe "on track", ->
        it "keeps to current track (1a -> 2a)", ->
          Timeline.currentTrackIndex     = 0 # trackA
          Chronolog.activeChronologIndex = 0 # one
          Timeline.advance('track')
          expect(Timeline.currentTrack()).toEqual(trackA)
          expect(Chronolog.active()).toEqual(two)

        it "keeps to current track (1b -> 2b)", ->
          Timeline.currentTrackIndex     = 1 # trackB
          Chronolog.activeChronologIndex = 0 # one
          Timeline.advance('track')
          expect(Timeline.currentTrack()).toEqual(trackB)
          expect(Chronolog.active()).toEqual(two)

        it "keeps to current track (2a -> 3a)", ->
          Timeline.currentTrackIndex     = 0 # trackA
          Chronolog.activeChronologIndex = 1 # two
          Timeline.advance('track')
          expect(Timeline.currentTrack()).toEqual(trackA)
          expect(Chronolog.active()).toEqual(three)

        it "keeps to current track (2b -> 5b)", ->
          Timeline.currentTrackIndex     = 1 # trackB
          Chronolog.activeChronologIndex = 1 # two
          Timeline.advance('track')
          expect(Timeline.currentTrack()).toEqual(trackB)
          expect(Chronolog.active()).toEqual(five)

        it "does nothing when at end of line (4a -> 4a)", ->
          Timeline.currentTrackIndex     = 1 # trackA
          Chronolog.activeChronologIndex = 3 # four
          Timeline.advance('track')
          expect(Timeline.currentTrack()).toEqual(trackA)
          expect(Chronolog.active()).toEqual(four)

        it "does nothing when at end of line (6t -> 6t)", ->
          Timeline.currentTrackIndex     = 1 # trackB
          Chronolog.activeChronologIndex = 5 # six
          Timeline.advance('track')
          expect(Timeline.currentTrack()).toEqual(trackB)
          expect(Chronolog.active()).toEqual(six)


    describe "reverse", ->
      describe "chronologically", ->
        it "keeps to current track if it can (2a -> 1a)", ->
          Timeline.currentTrackIndex     = 0 # trackA
          Chronolog.activeChronologIndex = 1 # two
          Timeline.reverse('chronological')
          expect(Timeline.currentTrack()).toEqual(trackA)
          expect(Chronolog.active()).toEqual(one)

        it "keeps to current track if it can (2b -> 1b)", ->
          Timeline.currentTrackIndex     = 1 # trackB
          Chronolog.activeChronologIndex = 1 # two
          Timeline.reverse('chronological')
          expect(Timeline.currentTrack()).toEqual(trackB)
          expect(Chronolog.active()).toEqual(one)

        it "switches track if it must (5b -> 4a)", ->
          Timeline.currentTrackIndex     = 1 # trackB
          Chronolog.activeChronologIndex = 4 # five
          Timeline.reverse('chronological')
          expect(Timeline.currentTrack()).toEqual(trackA)
          expect(Chronolog.active()).toEqual(four)

      describe "on track", ->

  describe "object", ->
    describe "coordinates", ->
      it "returns its coordinates as an array", ->
        expect(trackA.coordinates).toEqual ['s1','s2','b3','b4']
        expect(trackB.coordinates).toEqual ['s1','s2','t3','t5','t6']

    describe "chronologs", ->
      it "returns a list of chronologs", ->
        expect(trackA.chronologs).toEqual [one, two, three, four]

    describe "next()", ->
      it "returns the next chronolog (1a -> 2a)", ->
        one.activate()
        expect(trackA.next()).toEqual two
      it "returns the next chronolog (2a -> 3a)", ->
        two.activate()
        expect(trackA.next()).toEqual three
      it "returns the next chronolog (3a -> 4a)", ->
        three.activate()
        expect(trackA.next()).toEqual four

      it "returns the next chronolog (1b -> 2b)", ->
        one.activate()
        expect(trackB.next()).toEqual two
      it "returns the next chronolog (2b -> 5b)", ->
        two.activate()
        expect(trackB.next()).toEqual five
      it "returns the next chronolog (5b -> 6b)", ->
        five.activate()
        expect(trackB.next()).toEqual six

    describe "prev()", ->
      it "returns the prev chronolog (3a -> 4a)", ->
        four.activate()
        expect(trackA.prev()).toEqual three
      it "returns the prev chronolog (2a -> 3a)", ->
        three.activate()
        expect(trackA.prev()).toEqual two
      it "returns the prev chronolog (1a -> 2a)", ->
        two.activate()
        expect(trackA.prev()).toEqual one

      it "returns the prev chronolog (1b -> 2b)", ->
        two.activate()
        expect(trackB.prev()).toEqual one
      it "returns the prev chronolog (2b -> 5b)", ->
        five.activate()
        expect(trackB.prev()).toEqual two
      it "returns the prev chronolog (5b -> 6b)", ->
        six.activate()
        expect(trackB.prev()).toEqual five
