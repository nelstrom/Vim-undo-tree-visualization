class DocumentState
  constructor: (config) ->
    @timelineOriginal = config.timelineOriginal.points.split(",")
    @timelineRevised = config.timelineRevised.points.split(",")
    if config.timelineRevised.active
      @activeTrack = 'timelineRevised'
    else
      @activeTrack = 'timelineOriginal'

window.DocumentState = DocumentState
