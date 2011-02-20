class Timeline
  constructor: (config) ->
    @chronologs = config.chronologs
    @coordinates = config.coordinates.split(",")
    Timeline.instances.push(this)

  @instances: []
  @currentTrackIndex: 0

  @currentTrack: ->
    @instances[@currentTrackIndex]

  @currentChronolog: ->
    Chronolog.active()

  @advance: (method) ->
    if method == 'chronological'
      Chronolog.advance()

  @reset: ->
    @instances = []

window.Timeline = Timeline
