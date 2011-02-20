class Timeline
  constructor: (config) ->
    @chronologs = config.chronologs
    @coordinates = config.coordinates.split(",")
    Timeline.instances.push(this)

  @instances: []
  @currentTrackIndex: 0

  @currentTrack: ->
    @instances[@currentTrackIndex]

  @reset: ->
    @instances = []

window.Timeline = Timeline
