describe "DocumentState", ->
  state = new DocumentState
    timelineOriginal:
      points: 's1,s2,s3,s4'
    timelineRevised:
      points: 's1,s2,s5,s6'
      active: true
    nodes: [
      { position: 's1' },
      { position: 's2' },
      { position: 's3' },
      { position: 's4' },
      { position: 's5' },
      { position: 's6', active: true }
    ]

  describe "timelineOriginal", ->
    it "returns a list", ->
      expect(state.timelineOriginal).toEqual ['s1','s2','s3','s4']

  describe "timelineRevised", ->
    it "returns a list", ->
      expect(state.timelineRevised).toEqual ['s1','s2','s5','s6']

  describe "activeTrack", ->
    it "returns 'timelineRevised'", ->
      expect(state.activeTrack).toEqual 'timelineRevised'
    it "returns 'timelineOriginal'", ->
      state = new DocumentState
        timelineOriginal:
          points: 's1,s2,s3,s4'
          active: true
        timelineRevised:
          points: 's1,s2,s5,s6'
        nodes: [
          { position: 's1' },
          { position: 's2' },
          { position: 's3' },
          { position: 's4' },
          { position: 's5' },
          { position: 's6', active: true }
        ]
      expect(state.activeTrack).toEqual 'timelineOriginal'

  describe "nodes", ->
    it "has a default state of 'off'", ->
      expect(state.nodes[0].state).toEqual 'off'

