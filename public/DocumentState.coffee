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
        state: (if node.active then 'on' else 'off')
        position: node.position
      @nodes.push(n)
      @activeNode = n if node.active

    DocumentState.nodes.push(this)

  @position: 0
  @nodes: []
  @active: -> @nodes[@position]

  @reset: ->
    @position = 0
    @nodes = []

window.DocumentState = DocumentState
