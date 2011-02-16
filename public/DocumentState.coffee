class DocumentState
  constructor: (config) ->
    @timelineOriginal = config.timelineOriginal.points.split(",")
    @timelineRevised = config.timelineRevised.points.split(",")

    if config.timelineRevised.active
      @activeTrack = 'timelineRevised'
    else
      @activeTrack = 'timelineOriginal'

    @nodes = []
    for node in (config.nodes || [{position: 's1'}])
      n =
        state: node.state
        position: node.position
      @nodes.push(n)
      @activeNode = n if node.state == "on"

    DocumentState.nodes.push(this)

  @nodes: []
  @position: 0
  @lastPosition: 0
  @active: -> @nodes[@position]
  @previous: -> @nodes[@lastPosition]

  @reverse: ->
    if @position > 0
      @lastPosition = @position
      @position--

  @advance: ->
    if @position < @nodes.length-1
      @lastPosition = @position
      @position++

  @reset: ->
    @position = 0
    @lastPosition = 0
    @nodes = []

window.DocumentState = DocumentState
