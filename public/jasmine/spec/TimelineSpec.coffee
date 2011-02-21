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
          trackA.activate()
          one.activate()
          Timeline.advance('chronological')
          expect(Timeline.currentTrack()).toEqual(trackA)
          expect(Chronolog.active()).toEqual(two)

        it "keeps to current track if it can (1b -> 2b)", ->
          trackB.activate()
          one.activate()
          Timeline.advance('chronological')
          expect(Timeline.currentTrack()).toEqual(trackB)
          expect(Chronolog.active()).toEqual(two)

        it "switches track if it must (2b -> 3a)", ->
          trackB.activate()
          two.activate()
          Timeline.advance('chronological')
          expect(Timeline.currentTrack()).toEqual(trackA)
          expect(Chronolog.active()).toEqual(three)

        it "switches track if it must (4a -> 5b)", ->
          trackA.activate()
          four.activate()
          Timeline.advance('chronological')
          expect(Timeline.currentTrack()).toEqual(trackB)
          expect(Chronolog.active()).toEqual(five)

      describe "on track", ->
        it "keeps to current track (1a -> 2a)", ->
          trackA.activate()
          one.activate()
          Timeline.advance('track')
          expect(Timeline.currentTrack()).toEqual(trackA)
          expect(Chronolog.active()).toEqual(two)

        it "keeps to current track (1b -> 2b)", ->
          trackB.activate()
          one.activate()
          Timeline.advance('track')
          expect(Timeline.currentTrack()).toEqual(trackB)
          expect(Chronolog.active()).toEqual(two)

        it "keeps to current track (2a -> 3a)", ->
          trackA.activate()
          two.activate()
          Timeline.advance('track')
          expect(Timeline.currentTrack()).toEqual(trackA)
          expect(Chronolog.active()).toEqual(three)

        it "keeps to current track (2b -> 5b)", ->
          trackB.activate()
          two.activate()
          Timeline.advance('track')
          expect(Timeline.currentTrack()).toEqual(trackB)
          expect(Chronolog.active()).toEqual(five)

        it "does nothing when at end of line (4a -> 4a)", ->
          trackA.activate()
          four.activate()
          Timeline.advance('track')
          expect(Timeline.currentTrack()).toEqual(trackA)
          expect(Chronolog.active()).toEqual(four)

        it "does nothing when at end of line (6b -> 6b)", ->
          trackB.activate()
          six.activate()
          Timeline.advance('track')
          expect(Timeline.currentTrack()).toEqual(trackB)
          expect(Chronolog.active()).toEqual(six)


    describe "reverse()", ->
      describe "chronologically", ->
        it "keeps to current track if it can (2a -> 1a)", ->
          trackA.activate()
          two.activate()
          Timeline.reverse('chronological')
          expect(Timeline.currentTrack()).toEqual(trackA)
          expect(Chronolog.active()).toEqual(one)

        it "keeps to current track if it can (2b -> 1b)", ->
          trackB.activate()
          two.activate()
          Timeline.reverse('chronological')
          expect(Timeline.currentTrack()).toEqual(trackB)
          expect(Chronolog.active()).toEqual(one)

        it "switches track if it must (5b -> 4a)", ->
          trackB.activate()
          five.activate()
          Timeline.reverse('chronological')
          expect(Timeline.currentTrack()).toEqual(trackA)
          expect(Chronolog.active()).toEqual(four)

      describe "on track", ->
        it "does nothing when at start of line (1a -> 1a)", ->
          trackA.activate()
          one.activate()
          Timeline.reverse('track')
          expect(Timeline.currentTrack()).toEqual(trackA)
          expect(Chronolog.active()).toEqual(one)

        it "does nothing when at start of line (1b -> 1b)", ->
          trackB.activate()
          one.activate()
          Timeline.reverse('track')
          expect(Timeline.currentTrack()).toEqual(trackB)
          expect(Chronolog.active()).toEqual(one)

        it "keeps to current track (3a -> 2a)", ->
          trackA.activate()
          three.activate()
          Timeline.reverse('track')
          expect(Timeline.currentTrack()).toEqual(trackA)
          expect(Chronolog.active()).toEqual(two)

        it "keeps to current track (5b -> 2b)", ->
          trackB.activate()
          five.activate()
          Timeline.reverse('track')
          expect(Timeline.currentTrack()).toEqual(trackB)
          expect(Chronolog.active()).toEqual(two)

    describe "atStart()", ->
      describe "track", ->
        it "returns true at start of track", ->
          trackA.activate()
          one.activate()
          expect(Timeline.atStart('track')).toEqual true
        it "returns false at end of track", ->
          trackA.activate()
          two.activate()
          expect(Timeline.atStart('track')).toEqual false
      describe "chronological", ->
        it "returns true at start of track", ->
          trackA.activate()
          one.activate()
          expect(Timeline.atStart('chronological')).toEqual true
        it "returns false when not at start of track", ->
          trackA.activate()
          two.activate()
          expect(Timeline.atStart('chronological')).toEqual false

    describe "atFinish()", ->
      describe "track", ->
        it "returns false at start of track", ->
          trackA.activate()
          one.activate()
          expect(Timeline.atFinish('track')).toEqual false
        it "returns true at end of track", ->
          trackA.activate()
          four.activate()
          expect(Timeline.atFinish('track')).toEqual true
      describe "chronological", ->
        it "returns false at start of track", ->
          trackA.activate()
          one.activate()
          expect(Timeline.atFinish('chronological')).toEqual false
        it "returns true at end of track", ->
          trackA.activate()
          six.activate()
          expect(Timeline.atFinish('chronological')).toEqual true

    describe "asDocumentState()", ->
      it "returns an object that can be used to construct a DocumentState object", ->
        trackA.activate()
        one.activate()

        expectedObject =
          timelineOriginal:
            points: 's1,s2,b3,b4'
            active: true
          timelineRevised:
            points: 's1,s2,t3,t5,t6'
          nodes: [
            { position: 's1', state: 'on' }
            { position: 's2', state: 'off' }
            { position: 'b3', state: 'off' }
            { position: 'b4', state: 'off' }
            { position: 't5', state: 'off' }
            { position: 't6', state: 'off' }
          ]

        expect(Timeline.asDocumentState()).toEqual expectedObject

      it "returns an object that can be used to construct a DocumentState object", ->
        trackB.activate()
        five.activate()

        expectedObject =
          timelineOriginal:
            points: 's1,s2,b3,b4'
          timelineRevised:
            points: 's1,s2,t3,t5,t6'
            active: true
          nodes: [
            { position: 's1', state: 'off' }
            { position: 's2', state: 'off' }
            { position: 'b3', state: 'off' }
            { position: 'b4', state: 'off' }
            { position: 't5', state: 'on' }
            { position: 't6', state: 'off' }
          ]

        expect(Timeline.asDocumentState()).toEqual expectedObject

    describe "advanceAndUpdateState()", ->
      it "creates two DocumentStates()", ->
        trackA.activate()
        Timeline.advanceAndUpdateState('track')
        expect(DocumentState.states.length).toEqual 2

    describe "reverseAndUpdateState()", ->
      it "creates two DocumentStates()", ->
        trackA.activate()
        Timeline.reverseAndUpdateState('track')
        expect(DocumentState.states.length).toEqual 2

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
