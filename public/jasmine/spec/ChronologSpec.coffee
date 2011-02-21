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

    describe "active", ->
      it "returns the currently active chronolog", ->
        expect(Chronolog.active()).toEqual logOne

    describe "advance", ->
      it "activates the successor", ->
        Chronolog.advance()
        expect(Chronolog.active()).toEqual logTwo
      it "does nothing if active chronolog is the last one", ->
        Chronolog.activeChronologIndex = 1
        Chronolog.advance()
        expect(Chronolog.active()).toEqual logTwo

    describe "advance", ->
      it "activates the predecessor", ->
        Chronolog.activeChronologIndex = 1
        Chronolog.reverse()
        expect(Chronolog.active()).toEqual logOne
      it "does nothing if active chronolog is the first one", ->
        Chronolog.activeChronologIndex = 0
        Chronolog.reverse()
        expect(Chronolog.active()).toEqual logOne

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
    describe "activate()", ->
      it "turns the caller into the active Chronolog", ->
        logTwo.activate()
        expect(Chronolog.activeChronologIndex).toEqual 1
