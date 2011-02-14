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
      @nodes.push({state: (if node.active then 'on' else 'off')})


window.DocumentState = DocumentState
