class DocumentState
  constructor: (config) ->
    @timelineOriginal = config.timelineOriginal.points.split(",")
    @timelineRevised = config.timelineRevised.points.split(",")
    if config.timelineRevised.active
      @activeTrack = 'timelineRevised'

window.DocumentState = DocumentState
