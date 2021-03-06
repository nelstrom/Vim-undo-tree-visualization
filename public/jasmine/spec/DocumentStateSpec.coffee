describe "DocumentState", ->

  state = null

  beforeEach ->
    DocumentState.reset()
    state = new DocumentState
      timelineOriginal:
        points: 's1,s2,s3,s4'
      timelineRevised:
        points: 's1,s2,s5,s6'
        active: true
      nodes: [
        { position: 's1', state: 'off' }
        { position: 's2', state: 'off' }
        { position: 's3', state: 'off' }
        { position: 's4', state: 'off' }
        { position: 's5', state: 'on' }
        { position: 's6' }
      ]

  describe "Class", ->
    first = second = null
    beforeEach ->
      DocumentState.reset()
      first = new DocumentState
        timelineOriginal:
          points: 's1,s2'
          active: true
        timelineRevised:
          points: 's1,s2'
        nodes: [
          { position: 's1', state: 'off' }
          { position: 's2', state: 'on' }
          { position: 's2' }
          { position: 's2' }
          { position: 's2' }
          { position: 's2' }
        ]
      second = new DocumentState
        timelineOriginal:
          points: 's1,s2,s3'
          active: true
        timelineRevised:
          points: 's1,s2,s3'
        nodes: [
          { position: 's1', state: 'off' }
          { position: 's2', state: 'off' }
          { position: 's3', state: 'on' }
          { position: 's3' }
          { position: 's3' }
          { position: 's3' }
        ]

    describe "active", ->
      it "returns the active state", ->
        expect(DocumentState.active()).toEqual first
      it "returns the active state", ->
        DocumentState.position = 1
        expect(DocumentState.active()).toEqual second

    describe "previous", ->
      it "returns the first state by default", ->
        expect(DocumentState.previous()).toEqual first
      it "returns previous node when there is one", ->
        DocumentState.position = 1
        expect(DocumentState.previous()).toEqual first

    describe "reverse", ->
      it "does nothing when already at start", ->
        DocumentState.position = 0
        DocumentState.lastPosition = 0
        DocumentState.reverse()
        expect(DocumentState.position).toEqual 0
        expect(DocumentState.lastPosition).toEqual 0
      it "decrements position", ->
        DocumentState.position = 1
        DocumentState.reverse()
        expect(DocumentState.position).toEqual 0
        expect(DocumentState.lastPosition).toEqual 1
    describe "advance", ->
      it "increments position", ->
        DocumentState.position = 0
        DocumentState.advance()
        expect(DocumentState.position).toEqual 1
        expect(DocumentState.lastPosition).toEqual 0
      it "does nothing when on last node", ->
        DocumentState.position = 1
        DocumentState.lastPosition = 0
        DocumentState.advance()
        expect(DocumentState.position).toEqual 1
        expect(DocumentState.lastPosition).toEqual 0

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
      it "has state 'off' where specified", ->
        expect(state.nodes[0].state).toEqual 'off'
        expect(state.nodes[1].state).toEqual 'off'
        expect(state.nodes[2].state).toEqual 'off'
        expect(state.nodes[3].state).toEqual 'off'
      it "has state 'on' where specified", ->
        expect(state.nodes[4].state).toEqual 'on'
      it "has state 'undefined' by default", ->
        expect(state.nodes[5].state).toEqual undefined

    describe "activeNode", ->
      it "returns the object that was declared 'on'", ->
        expect(state.activeNode).toEqual { position: 's5', state: 'on' }

    describe "activeNodeIndex", ->
      it "returns the position of the activeNode in nodes list", ->
        expect(state.activeNodeIndex()).toEqual 4

    describe "hasPredecessor()/hasSuccessor()", ->
      first = second = null
      beforeEach ->
        DocumentState.reset()
        first = new DocumentState
          timelineOriginal:
            points: 's1,s2'
            active: true
          timelineRevised:
            points: 's1,s2'
          nodes: [
            { position: 's1', state: 'off' }
            { position: 's2', state: 'on' }
            { position: 's2' }
            { position: 's2' }
            { position: 's2' }
            { position: 's2' }
          ]
        second = new DocumentState
          timelineOriginal:
            points: 's1,s2,s3'
            active: true
          timelineRevised:
            points: 's1,s2,s3'
          nodes: [
            { position: 's1', state: 'off' }
            { position: 's2', state: 'off' }
            { position: 's3', state: 'on' }
            { position: 's3' }
            { position: 's3' }
            { position: 's3' }
          ]
      describe "hasPredecessor()", ->
        it "returns true when there is a predecessor", ->
          expect(first.hasPredecessor()).toEqual false
        it "returns false when there is no predecessor", ->
          expect(second.hasPredecessor()).toEqual true

      describe "hasSuccessor()", ->
        it "returns true when there is a successor", ->
          expect(second.hasSuccessor()).toEqual false
        it "returns false when there is no successor", ->
          expect(first.hasSuccessor()).toEqual true
