describe "DocumentState", ->
  start  = new DocumentState()

  it "has foo property", ->
    expect(start.foo).toEqual "bar"
