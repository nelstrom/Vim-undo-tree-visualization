describe "DocumentState", ->
  state = new DocumentState
    timelineOriginal:
      points: 's1,s2,s3,s4'
    timelineRevised:
      points: 's1,s2,s5,s6'

  describe "timelineOriginal", ->
    it "returns a list", ->
      expect(state.timelineOriginal).toEqual ['s1','s2','s3','s4']

  describe "timelineRevised", ->
    it "returns a list", ->
      expect(state.timelineRevised).toEqual ['s1','s2','s5','s6']

  describe "activeTrack", ->
    it "returns 'timelineRevised'", ->
      expect(state.activeTrack).toEqual 'timelineRevised'
