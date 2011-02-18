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

    DocumentState.states.push(this)

  activeNodeIndex: ->
    this.nodes.indexOf(@activeNode)

  hasPredecessor: ->


  @states: []
  @position: 0
  @lastPosition: 0
  @active: -> @states[@position]
  @previous: -> @states[@lastPosition]

  @reverse: ->
    if @position > 0
      @lastPosition = @position
      @position--

  @advance: ->
    if @position < @states.length-1
      @lastPosition = @position
      @position++

  @reset: ->
    @position = 0
    @lastPosition = 0
    @states = []

window.DocumentState = DocumentState
