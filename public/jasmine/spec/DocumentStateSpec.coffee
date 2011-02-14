describe "DocumentState", ->

  describe "timelineOriginal", ->
  it "returns a list", ->
    state = new DocumentState()
    expect(state.timelineOriginal).toEqual ['s1','s2','s3','s4']
