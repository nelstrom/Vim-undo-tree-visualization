class DocumentState
  constructor: (config) ->
    @timelineOriginal = config.timelineOriginal.points.split(",")

window.DocumentState = DocumentState
