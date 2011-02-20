describe "Chronolog", ->

  logOne = logTwo = null

  beforeEach ->
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
