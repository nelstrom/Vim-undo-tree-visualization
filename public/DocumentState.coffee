class DocumentState
  constructor: (config) ->
    @timelineOriginal = config.timelineOriginal.points.split(",")
    @timelineRevised = config.timelineRevised.points.split(",")

window.DocumentState = DocumentState
