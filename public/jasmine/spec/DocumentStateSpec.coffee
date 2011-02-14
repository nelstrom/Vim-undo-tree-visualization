describe "DocumentState", ->

  state = new DocumentState
    timelineOriginal:
      points: 's1,s2,s3,s4'
    timelineRevised:
      points: 's1,s2,s5,s6'
      active: true
    nodes: [
      { position: 's1' }
      { position: 's2' }
      { position: 's3' }
      { position: 's4' }
      { position: 's5' }
      { position: 's6', active: true }
    ]

  describe "Class", ->
    describe "active", ->
      it "returns the active state", ->
        expect(DocumentState.active()).toEqual state

  describe "object", ->
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
        state2 = new DocumentState
          timelineOriginal:
            points: 's1,s2,s3,s4'
            active: true
          timelineRevised:
            points: 's1,s2,s5,s6'
        expect(state2.activeTrack).toEqual 'timelineOriginal'

    describe "nodes", ->
      it "gets position from config object", ->
        expect(state.nodes[0].position).toEqual 's1'
        expect(state.nodes[1].position).toEqual 's2'
        expect(state.nodes[2].position).toEqual 's3'
        expect(state.nodes[3].position).toEqual 's4'
        expect(state.nodes[4].position).toEqual 's5'
        expect(state.nodes[5].position).toEqual 's6'
      it "has a default state of 'off'", ->
        expect(state.nodes[0].state).toEqual 'off'
        expect(state.nodes[1].state).toEqual 'off'
        expect(state.nodes[2].state).toEqual 'off'
        expect(state.nodes[3].state).toEqual 'off'
        expect(state.nodes[4].state).toEqual 'off'
      it "has state 'on' where specified", ->
        expect(state.nodes[5].state).toEqual 'on'
    describe "activeNode", ->
      it "returns the object that was declared active", ->
        expect(state.activeNode).toEqual { position: 's6', state: 'on' }

