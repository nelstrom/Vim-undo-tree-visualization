describe "DocumentState", ->
  state = new DocumentState
    timelineOriginal:
      points: 's1,s2,s3,s4'

  describe "timelineOriginal", ->
  it "returns a list", ->
    expect(state.timelineOriginal).toEqual ['s1','s2','s3','s4']
