class Timeline
  constructor: (config) ->
    @coordinates = config.coordinates.split(",")
    Timeline.instances.push(this)

  @instances: []
  @currentTrackIndex: 0

  @currentTrack: ->
    @instances[@currentTrackIndex]

  @reset: ->
    @instances = []

window.Timeline = Timeline

